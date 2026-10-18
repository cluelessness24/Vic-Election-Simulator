const fs = require("fs");

const scraped = JSON.parse(fs.readFileSync("scraped_vec_data.json", "utf8"));
const dataContent = fs.readFileSync("src/data.ts", "utf8");

const regex = /{\s*id:\s*[\x27"]([^\x27"]+)[\x27"],\s*name:\s*[\x27"]([^\x27"]+)[\x27"],\s*region:\s*[\x27"]([^\x27"]+)[\x27"]/g;
const appSeats = [...dataContent.matchAll(regex)].map(m => ({ id: m[1], name: m[2], region: m[3] }));

const aliasMap = {
  "ballarat_east": "eureka",
  "ballarat_west": "wendouree",
  "sw_coast": "south-west-coast",
  "narre_warren_n": "narre-warren-north",
  "narre_warren_s": "narre-warren-south",
  "benalla": "benambra",
  "swan_hill": "eildon",
  "ferntree_gully": "essendon",
  "keysborough": "kalkallo",
  "portland": "sunbury",
};

// Calculate state baseline transfers
const stateTransfers = {
  ALP: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
  COALITION: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
  GRN: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
  ON: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
  OTH: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0, total: 0 },
};

for (const d of Object.values(scraped)) {
  if (!d.hasOfficialDistribution) continue;
  for (const grp of ["ALP", "COALITION", "GRN", "ON", "OTH"]) {
    const flow = d.transferFlows[grp];
    const weight = d.primaryVotes[grp] || 0;
    if (weight > 0 && flow) {
      stateTransfers[grp].toALP += (flow.toALP / 100) * weight;
      stateTransfers[grp].toCoalition += (flow.toCoalition / 100) * weight;
      stateTransfers[grp].toGreens += (flow.toGreens / 100) * weight;
      stateTransfers[grp].toOneNation += (flow.toOneNation / 100) * weight;
      stateTransfers[grp].toOther += (flow.toOther / 100) * weight;
      stateTransfers[grp].total += weight;
    }
  }
}

const finalBaseline = {};
for (const grp of ["ALP", "COALITION", "GRN", "ON", "OTH"]) {
  const t = stateTransfers[grp];
  if (t.total > 0) {
    finalBaseline[grp] = {
      toALP: Number(((t.toALP / t.total) * 100).toFixed(1)),
      toCoalition: Number(((t.toCoalition / t.total) * 100).toFixed(1)),
      toGreens: Number(((t.toGreens / t.total) * 100).toFixed(1)),
      toOneNation: Number(((t.toOneNation / t.total) * 100).toFixed(1)),
      toOther: Number(((t.toOther / t.total) * 100).toFixed(1)),
    };
  }
}

let fileContent = `// Generated 2022 Victorian Election Full Preference & Primary Vote Dataset
// Sources: Victorian Electoral Commission (VEC) official distribution & results tables

export type PartyGroup = 'ALP' | 'COALITION' | 'GRN' | 'ON' | 'OTH';

export interface PartyTransferFlow {
  toALP: number;
  toCoalition: number;
  toGreens: number;
  toOneNation: number;
  toOther: number;
}

export interface ElectoratePreferenceData {
  electorateId: string;
  name: string;
  region: string;
  hasOfficialDistribution: boolean;
  totalFormalVotes: number;
  primaryVotes: Record<PartyGroup, number>;
  primaryPercentages: Record<PartyGroup, number>;
  transferFlows: Record<PartyGroup, PartyTransferFlow>;
  twoPartyPreferred: {
    alp: number;
    coalition: number;
    alpPercent: number;
    coalitionPercent: number;
  };
}

export const STATE_DEFAULT_TRANSFERS: Record<PartyGroup, PartyTransferFlow> = ${JSON.stringify(finalBaseline, null, 2)};

export const PREFERENCE_DATA: Record<string, ElectoratePreferenceData> = {
`;

// Add each app seat
for (const seat of appSeats) {
  const slug = aliasMap[seat.id] || seat.id.replace(/_/g, "-");
  const d = scraped[slug];
  if (!d) {
    console.error("Missing data for seat:", seat.id, slug);
    continue;
  }

  const record = {
    electorateId: seat.id,
    name: seat.name,
    region: seat.region,
    hasOfficialDistribution: d.hasOfficialDistribution,
    totalFormalVotes: d.totalFormalVotes,
    primaryVotes: d.primaryVotes,
    primaryPercentages: d.primaryPercentages,
    transferFlows: d.transferFlows,
    twoPartyPreferred: d.twoPartyPreferred,
  };

  fileContent += `  "${seat.id}": ${JSON.stringify(record, null, 4)},\n`;
}

// Also add official VEC slug keys if different
for (const [appId, vecSlug] of Object.entries(aliasMap)) {
  const normKey = vecSlug.replace(/-/g, "_");
  if (!appSeats.find(s => s.id === normKey)) {
    const d = scraped[vecSlug];
    if (d) {
      const record = {
        electorateId: normKey,
        name: d.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        region: (appSeats.find(s => s.id === appId) || {}).region || "other",
        hasOfficialDistribution: d.hasOfficialDistribution,
        totalFormalVotes: d.totalFormalVotes,
        primaryVotes: d.primaryVotes,
        primaryPercentages: d.primaryPercentages,
        transferFlows: d.transferFlows,
        twoPartyPreferred: d.twoPartyPreferred,
      };
      fileContent += `  "${normKey}": ${JSON.stringify(record, null, 4)},\n`;
    }
  }
}

fileContent += `};\n`;

fs.writeFileSync("src/preferenceData.ts", fileContent);
console.log("Successfully wrote src/preferenceData.ts!");
