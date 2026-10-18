const https = require("https");
const fs = require("fs");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith("/")) loc = "https://www.vec.vic.gov.au" + loc;
        return fetchUrl(loc).then(resolve, reject);
      }
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

function mapPartyGroup(partyStr) {
  if (!partyStr) return "OTH";
  const s = partyStr.toLowerCase().trim();
  // Check Liberal Democrats first so it is NOT categorized as Coalition
  if (s.includes("liberal democratic") || s.includes("liberal democrat")) return "OTH";
  if (s.includes("labor") || s.includes("alp") || s === "australian labor party - victorian branch") return "ALP";
  if (s.includes("liberal") || s.includes("national") || s.includes("the nationals") || s.includes("country party")) return "COALITION";
  if (s.includes("green") || s.includes("greens")) return "GRN";
  if (s.includes("one nation") || s.includes("pauline hanson")) return "ON";
  return "OTH";
}

async function scrapeAll() {
  console.log("Fetching list of 2022 districts from VEC...");
  const main = await fetchUrl("https://www.vec.vic.gov.au/results/state-election-results/2022-state-election-results");
  const districtSlugs = [...main.data.matchAll(/href="\/results\/state-election-results\/2022-state-election-results\/results-by-district\/([^\/"]+)-district-results"/g)].map(m => m[1]);
  
  // Add narracan supplementary election
  if (!districtSlugs.includes("narracan")) {
    districtSlugs.push("narracan");
  }

  console.log(`Found ${districtSlugs.length} districts to scrape.`);

  const scrapedData = {};
  const queue = [...districtSlugs];
  let completed = 0;

  async function worker() {
    while (queue.length > 0) {
      const slug = queue.shift();
      try {
        const resultsUrl = slug === "narracan"
          ? "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/narracan-district-supplementary-election-results"
          : `https://www.vec.vic.gov.au/results/state-election-results/2022-state-election-results/results-by-district/${slug}-district-results`;

        const distUrl = slug === "narracan"
          ? "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/narracan-district-supplementary-election-results/narracan-results-distribution"
          : `https://www.vec.vic.gov.au/results/state-election-results/2022-state-election-results/results-by-district/${slug}-district-results/${slug}-results-distribution`;

        const [resultsPage, distPage] = await Promise.all([
          fetchUrl(resultsUrl),
          fetchUrl(distUrl),
        ]);

        if (resultsPage.status !== 200) {
          console.error(`Failed to fetch results page for ${slug}: ${resultsPage.status}`);
          continue;
        }

        const html = resultsPage.data;

        // Parse candidate table (Table 1)
        const allTables = html.split("<table");
        if (allTables.length < 2) continue;

        const table1Html = allTables[1].split("</table>")[0];
        const rows = table1Html.split("<tr>").slice(2);
        const candidates = [];

        for (const r of rows) {
          const cells = r.split(/<\/td>|<\/th>/)
            .map(c => c.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "\x27").trim())
            .filter(Boolean);

          if (cells.length >= 3) {
            const name = cells[0];
            const party = cells.length >= 4 ? cells[1] : "";
            const votes = parseInt(cells.length >= 4 ? cells[2] : cells[1], 10);
            const pct = parseFloat(cells.length >= 4 ? cells[3] : cells[2]);
            if (!isNaN(votes)) {
              candidates.push({
                name,
                party,
                group: mapPartyGroup(party),
                votes,
                pct,
              });
            }
          }
        }

        const totalFormalVotes = candidates.reduce((s, c) => s + c.votes, 0);

        const primaryVotes = { ALP: 0, COALITION: 0, GRN: 0, ON: 0, OTH: 0 };
        for (const c of candidates) {
          primaryVotes[c.group] += c.votes;
        }

        const primaryPercentages = {
          ALP: Number(((primaryVotes.ALP / (totalFormalVotes || 1)) * 100).toFixed(1)),
          COALITION: Number(((primaryVotes.COALITION / (totalFormalVotes || 1)) * 100).toFixed(1)),
          GRN: Number(((primaryVotes.GRN / (totalFormalVotes || 1)) * 100).toFixed(1)),
          ON: Number(((primaryVotes.ON / (totalFormalVotes || 1)) * 100).toFixed(1)),
          OTH: Number(((primaryVotes.OTH / (totalFormalVotes || 1)) * 100).toFixed(1)),
        };

        // Table 2 (2CP / votes after distribution)
        let twoPP = {
          alp: 0,
          coalition: 0,
          alpPercent: 50,
          coalitionPercent: 50,
        };

        if (allTables.length >= 3) {
          const table2Html = allTables[2].split("</table>")[0];
          const t2Rows = table2Html.split("<tr>").slice(2);
          for (const r of t2Rows) {
            const cells = r.split(/<\/td>|<\/th>/)
              .map(c => c.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "\x27").trim())
              .filter(Boolean);

            if (cells.length >= 3) {
              const party = cells.length >= 4 ? cells[1] : "";
              const group = mapPartyGroup(party);
              const votes = parseInt(cells.length >= 4 ? cells[2] : cells[1], 10);
              const pct = parseFloat(cells.length >= 4 ? cells[3] : cells[2]);
              if (group === "ALP") {
                twoPP.alp = votes;
                twoPP.alpPercent = pct;
              } else if (group === "COALITION") {
                twoPP.coalition = votes;
                twoPP.coalitionPercent = pct;
              }
            }
          }
        }

        // If 2PP not found or non-classic contest (e.g. GRN vs ALP or IND vs LIB), estimate/normalize
        if (twoPP.alp === 0 && twoPP.coalition === 0) {
          twoPP = {
            alp: primaryVotes.ALP,
            coalition: primaryVotes.COALITION,
            alpPercent: Number(((primaryVotes.ALP / ((primaryVotes.ALP + primaryVotes.COALITION) || 1)) * 100).toFixed(1)),
            coalitionPercent: Number(((primaryVotes.COALITION / ((primaryVotes.ALP + primaryVotes.COALITION) || 1)) * 100).toFixed(1)),
          };
        } else if (twoPP.alp > 0 && twoPP.coalition === 0) {
          // E.g. Melbourne (GRN vs ALP)
          twoPP.coalition = totalFormalVotes - twoPP.alp;
          twoPP.coalitionPercent = Number(((twoPP.coalition / totalFormalVotes) * 100).toFixed(1));
        } else if (twoPP.coalition > 0 && twoPP.alp === 0) {
          // E.g. Narracan or Mildura
          twoPP.alp = totalFormalVotes - twoPP.coalition;
          twoPP.alpPercent = Number(((twoPP.alp / totalFormalVotes) * 100).toFixed(1));
        }

        // Preference distribution table
        const hasOfficialDistribution = distPage.status === 200 && distPage.data.includes("<table");
        const transferFlows = {
          ALP: { toALP: 0, toCoalition: 29.5, toGreens: 20.7, toOneNation: 0, toOther: 49.8 },
          COALITION: { toALP: 39.1, toCoalition: 0, toGreens: 25, toOneNation: 0, toOther: 35.9 },
          GRN: { toALP: 67.2, toCoalition: 18.6, toGreens: 0, toOneNation: 0.1, toOther: 14.1 },
          ON: { toALP: 19.3, toCoalition: 72.5, toGreens: 8.2, toOneNation: 0, toOther: 0 },
          OTH: { toALP: 26.9, toCoalition: 40.4, toGreens: 31.3, toOneNation: 1.4, toOther: 0 },
        };

        if (hasOfficialDistribution) {
          try {
            const distHtml = distPage.data;
            const distTable = distHtml.split("<table")[1].split("</table>")[0];
            const thead = distTable.split("<thead>")[1].split("</thead>")[0];
            const candidateHeaders = thead.split("<th")
              .slice(2)
              .map(th => th.split(">")[1].split("<")[0].replace(/&amp;/g, "&").trim())
              .filter(h => h && h !== "TOTAL");

            // Build map of candidate name in header -> PartyGroup
            const headerPartyMap = candidateHeaders.map(ch => {
              const matched = candidates.find(c => {
                const parts = ch.split(",").map(p => p.trim());
                return parts.length > 0 && c.name.includes(parts[0]);
              });
              return matched ? matched.group : "OTH";
            });

            // Parse transfer rows
            const tbody = distTable.split("<tbody>")[1].split("</tbody>")[0];
            const trs = tbody.split("<tr>").slice(1);

            const groupTransfers = {
              ALP: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
              COALITION: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
              GRN: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
              ON: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
              OTH: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
            };

            for (const r of trs) {
              const thMatch = r.match(/<th[^>]*>([\s\S]*?)<\/th>/);
              if (!thMatch) continue;
              const headerText = thMatch[1].replace(/<[^>]+>/g, "").trim();
              if (!headerText.startsWith("Transfer")) continue;

              // Find which candidate was excluded
              const candidateMatch = candidates.find(c => {
                const parts = c.name.split(",").map(p => p.trim());
                return parts.length > 0 && headerText.includes(parts[0]);
              });
              const fromGroup = candidateMatch ? candidateMatch.group : "OTH";

              const cells = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
                .map(m => m[1].replace(/<[^>]+>/g, "").trim());

              cells.slice(0, candidateHeaders.length).forEach((val, colIdx) => {
                const num = parseInt(val, 10);
                if (!isNaN(num) && num > 0) {
                  const toGroup = headerPartyMap[colIdx] || "OTH";
                  if (toGroup === "ALP") groupTransfers[fromGroup].toALP += num;
                  else if (toGroup === "COALITION") groupTransfers[fromGroup].toCoalition += num;
                  else if (toGroup === "GRN") groupTransfers[fromGroup].toGreens += num;
                  else if (toGroup === "ON") groupTransfers[fromGroup].toOneNation += num;
                  else groupTransfers[fromGroup].toOther += num;
                  groupTransfers[fromGroup].total += num;
                }
              });
            }

            // Convert to percentages if votes were recorded
            for (const grp of ["ALP", "COALITION", "GRN", "ON", "OTH"]) {
              const gt = groupTransfers[grp];
              if (gt.total > 0) {
                transferFlows[grp] = {
                  toALP: Number(((gt.toALP / gt.total) * 100).toFixed(1)),
                  toCoalition: Number(((gt.toCoalition / gt.total) * 100).toFixed(1)),
                  toGreens: Number(((gt.toGreens / gt.total) * 100).toFixed(1)),
                  toOneNation: Number(((gt.toOneNation / gt.total) * 100).toFixed(1)),
                  toOther: Number(((gt.toOther / gt.total) * 100).toFixed(1)),
                };
              }
            }
          } catch (err) {
            console.error(`Error parsing distribution for ${slug}:`, err.message);
          }
        }

        scrapedData[slug] = {
          slug,
          totalFormalVotes,
          candidates,
          primaryVotes,
          primaryPercentages,
          twoPartyPreferred: twoPP,
          hasOfficialDistribution,
          transferFlows,
        };

        completed++;
        if (completed % 10 === 0 || completed === districtSlugs.length) {
          console.log(`Progress: ${completed}/${districtSlugs.length} districts processed.`);
        }
      } catch (e) {
        console.error(`Error scraping ${slug}:`, e.message);
      }
    }
  }

  await Promise.all(Array.from({ length: 10 }, () => worker()));

  fs.writeFileSync("scraped_vec_data.json", JSON.stringify(scrapedData, null, 2));
  console.log(`Done! Scraped ${Object.keys(scrapedData).length} districts saved to scraped_vec_data.json`);
}

scrapeAll();
