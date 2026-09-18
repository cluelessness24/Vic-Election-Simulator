/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Electorate, PARTIES, PartyCode } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ParliamentHemicycleProps {
  electorates: (Electorate & { currentParty: PartyCode; margin: number })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  customOverridesCount: number;
  onClearOverrides: () => void;
}

interface DotCoordinate {
  x: number;
  y: number;
  angle: number;
  row: number;
}

export const ParliamentHemicycle: React.FC<ParliamentHemicycleProps> = ({
  electorates,
  selectedId,
  onSelect,
  hoveredId,
  onHover,
  customOverridesCount,
  onClearOverrides,
}) => {
  // Collapsible state for Seat Tally & Shift box (collapsed by default)
  const [isSeatTallyExpanded, setIsSeatTallyExpanded] = useState(false);

  // SVG size parameters
  const width = 500;
  const height = 280;
  const cx = width / 2;
  const cy = height - 40; // baseline

  // 1. Generate the 88 coordinate positions in a 4-row hemicycle
  const dotCoordinates = useMemo(() => {
    const coords: DotCoordinate[] = [];
    // 4 rows of concentric arches: total dots = 16 + 20 + 24 + 28 = 88
    const rowsConfig = [
      { count: 16, radius: 105 },
      { count: 20, radius: 135 },
      { count: 24, radius: 165 },
      { count: 28, radius: 195 },
    ];

    const sidePaddingRad = 0.08; // side padding to prevent dots sitting flat on the baseline

    rowsConfig.forEach((rowConfig, rowIndex) => {
      const { count, radius } = rowConfig;
      for (let i = 0; i < count; i++) {
        // Angle theta from PI - padding (left) to padding (right)
        const theta =
          Math.PI -
          sidePaddingRad -
          ((Math.PI - 2 * sidePaddingRad) * i) / (count - 1);

        coords.push({
          x: cx + radius * Math.cos(theta),
          y: cy - radius * Math.sin(theta),
          angle: theta,
          row: rowIndex,
        });
      }
    });

    // Sort coordinates by angle descending (so they run nicely from left to right)
    return coords.sort((a, b) => b.angle - a.angle);
  }, [cx, cy]);

  // 2. Sort the electorates by political spectrum (Left to Right)
  // Greens -> Labor -> Independent -> Liberal -> National -> One Nation
  const partySpectrumWeight: Record<PartyCode, number> = {
    GRN: 1,
    ALP: 2,
    IND: 3,
    LIB: 4,
    NAT: 5,
    ON: 6,
  };

  const sortedElectoratesWithCoords = useMemo(() => {
    const sorted = [...electorates].sort((a, b) => {
      const weightA = partySpectrumWeight[a.currentParty];
      const weightB = partySpectrumWeight[b.currentParty];
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      // If same party, sort by original margin descending for a nice visual gradient
      return b.margin - a.margin;
    });

    // Pair each sorted electorate with a sorted dot coordinate
    return sorted.map((elec, index) => {
      const coord = dotCoordinates[index] || { x: cx, y: cy, row: 0, angle: 0 };
      return {
        ...elec,
        coord,
      };
    });
  }, [electorates, dotCoordinates, cx, cy]);

  // 3. Count seats per party
  const partyCounts = useMemo(() => {
    const counts: Record<PartyCode, number> = {
      ALP: 0,
      LIB: 0,
      NAT: 0,
      GRN: 0,
      ON: 0,
      IND: 0,
    };
    electorates.forEach((e) => {
      counts[e.currentParty] = (counts[e.currentParty] || 0) + 1;
    });
    return counts;
  }, [electorates]);

  // Determine government status
  const govStatus = useMemo(() => {
    const alpSeats = partyCounts.ALP;
    const coalitionSeats = partyCounts.LIB + partyCounts.NAT;
    const grnSeats = partyCounts.GRN;
    const indSeats = partyCounts.IND;
    const onSeats = partyCounts.ON;

    if (alpSeats >= 45) {
      return {
        text: `Labor Majority Government (${alpSeats} seats)`,
        sub: `Premier Jacinta Allan holds a stable majority (45+ seats required).`,
        colorClass: 'text-[#E61E2B]',
        bgClass: 'bg-[#E61E2B]/10 border-[#E61E2B]/30',
      };
    } else if (coalitionSeats >= 45) {
      return {
        text: `Coalition Majority Government (${coalitionSeats} seats)`,
        sub: `Opposition Leader John Pesutto commands a stable Liberal-National majority.`,
        colorClass: 'text-[#60A5FA]',
        bgClass: 'bg-[#0047AB]/15 border-[#0047AB]/30',
      };
    } else if (onSeats >= 45) {
      return {
        text: `One Nation Majority Government (${onSeats} seats)`,
        sub: `One Nation holds an absolute majority of seats (45+ seats required).`,
        colorClass: 'text-[#FF6600]',
        bgClass: 'bg-[#FF6600]/10 border-[#FF6600]/30',
      };
    } else {
      // Hung Parliament (Minority Government formatted by most seats)
      const maxSeats = Math.max(alpSeats, coalitionSeats, onSeats);
      const shortCount = 45 - maxSeats;

      if (maxSeats === coalitionSeats) {
        return {
          text: `Coalition Minority (+${shortCount} seats required)`,
          sub: `The Coalition is ${shortCount} seats short of a majority. Balance of Power: Greens (${grnSeats}), Independents (${indSeats}), One Nation (${onSeats}).`,
          colorClass: 'text-[#60A5FA]',
          bgClass: 'bg-slate-500/10 border-slate-500/20',
        };
      } else if (maxSeats === alpSeats) {
        return {
          text: `Labor Minority (+${shortCount} seats required)`,
          sub: `Labor is ${shortCount} seats short of a majority. Balance of Power: Greens (${grnSeats}), Independents (${indSeats}), One Nation (${onSeats}).`,
          colorClass: 'text-[#E61E2B]',
          bgClass: 'bg-slate-500/10 border-slate-500/20',
        };
      } else {
        return {
          text: `One Nation Minority (+${shortCount} seats required)`,
          sub: `One Nation is ${shortCount} seats short of a majority. Balance of Power: Greens (${grnSeats}), Independents (${indSeats}).`,
          colorClass: 'text-[#FF6600]',
          bgClass: 'bg-slate-500/10 border-slate-500/20',
        };
      }
    }
  }, [partyCounts]);

  const activeHoveredElectorate = useMemo(() => {
    if (!hoveredId) return null;
    return electorates.find((e) => e.id === hoveredId) || null;
  }, [hoveredId, electorates]);

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border-subtle p-6 shadow-sm">
      <div className="flex flex-col mb-4">
        <h3 className="serif text-white italic text-xl">Parliament Chamber Map</h3>
        <div className="flex items-center justify-between gap-2 flex-wrap mt-1">
          <p className="text-xs text-slate-400 font-sans">
            {selectedId ? (
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                Selected: <span className="text-white font-semibold underline">{electorates.find(e => e.id === selectedId)?.name || selectedId}</span>
              </span>
            ) : (
              "Concentric seating arch of 88 Legislative Assembly seats. 45+ needed for a majority."
            )}
          </p>
          {selectedId && (
            <button
              onClick={() => onSelect('')}
              id="clear-seat-selection-hemicycle"
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 cursor-pointer transition-colors"
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {/* Hemicycle SVG Container */}
      <div className="relative flex justify-center items-center my-2 select-none" id="hemicycle-view">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[440px] md:max-w-full drop-shadow-sm"
        >
          {/* Subtle Chamber Guide Semicircles */}
          <circle
            cx={cx}
            cy={cy}
            r={105}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle
            cx={cx}
            cy={cy}
            r={195}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1.5"
          />

          {/* Speaker Desk Centerpiece Visual */}
          <g transform={`translate(${cx - 20}, ${cy - 12})`}>
            <rect width="40" height="15" rx="3" fill="rgba(255, 255, 255, 0.05)" />
            <text
              x="20"
              y="10"
              fontSize="8"
              fontWeight="600"
              fill="#A0A0A0"
              textAnchor="middle"
              className="font-sans"
            >
              SPEAKER
            </text>
          </g>

          {/* Render the 88 interactive dots */}
          {sortedElectoratesWithCoords.map((elec) => {
            const isSelected = selectedId === elec.id;
            const isHovered = hoveredId === elec.id;
            const partyInfo = PARTIES[elec.currentParty];

            return (
              <g key={elec.id}>
                {/* Glow ring around hovered/selected dot */}
                <AnimatePresence>
                  {(isSelected || isHovered) && (
                    <motion.circle
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.4 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      cx={elec.coord.x}
                      cy={elec.coord.y}
                      r={9}
                      fill={partyInfo.color}
                      pointerEvents="none"
                    />
                  )}
                </AnimatePresence>

                {/* Primary interactive seat dot */}
                <circle
                  cx={elec.coord.x}
                  cy={elec.coord.y}
                  r={isSelected ? 7 : isHovered ? 7 : 5}
                  fill={partyInfo.color}
                  stroke={isSelected ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.7)' : 'none'}
                  strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => onHover(elec.id)}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => onSelect(elec.id)}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        <AnimatePresence>
          {activeHoveredElectorate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.1 }}
              className="absolute pointer-events-none top-0 bg-[#161B22] text-white rounded-lg px-3 py-2 shadow-xl border border-white/15 flex flex-col items-center gap-0.5 text-center min-w-[150px] z-20"
            >
              <div className="text-xs font-bold font-sans tracking-wide text-white">
                {activeHoveredElectorate.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: PARTIES[activeHoveredElectorate.currentParty].color }}
                />
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-95">
                  {PARTIES[activeHoveredElectorate.currentParty].name} ({activeHoveredElectorate.margin.toFixed(1)}%)
                </span>
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5 font-mono">
                MP: {activeHoveredElectorate.mp}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Government Status Card */}
      <div className={`mt-auto p-4 rounded-lg border ${govStatus.bgClass} flex flex-col gap-3.5 transition-all duration-300`}>
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold font-sans">
            Government Projection
          </span>
          <span className={`font-sans font-bold text-sm ${govStatus.colorClass}`}>
            {govStatus.text}
          </span>
        </div>

        {/* Prominent Multi-Way Representation */}
        <div className="grid grid-cols-4 gap-2 bg-black/40 p-3 rounded border border-white/5 text-center font-sans items-stretch">
          <div className="flex flex-col items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-tight">Labor + Greens</span>
            <div className="flex items-center gap-1.5 text-xl font-black mt-1.5">
              <span style={{ color: '#E61E2B' }} title="Labor">{partyCounts.ALP}</span>
              <span className="text-xs text-slate-500 font-normal">+</span>
              <span style={{ color: '#00A651' }} title="Greens">{partyCounts.GRN}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-l border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-tight">Coalition</span>
            <span style={{ color: '#60A5FA' }} className="text-xl font-black mt-1.5">
              {partyCounts.LIB + partyCounts.NAT}
            </span>
          </div>
          <div className="flex flex-col items-center justify-between border-l border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-tight">One Nation</span>
            <span style={{ color: '#FF6600' }} className="text-xl font-black mt-1.5">
              {partyCounts.ON}
            </span>
          </div>
          <div className="flex flex-col items-center justify-between border-l border-white/5">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-tight">Independent</span>
            <span style={{ color: '#A0A0A0' }} className="text-xl font-black mt-1.5">
              {partyCounts.IND}
            </span>
          </div>
        </div>
      </div>

      {/* Parliamentary Balance Progress Bar */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 font-sans">
          <span>Labor: {partyCounts.ALP}</span>
          <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">Majority: 45 Seats</span>
          <span>Coalition: {partyCounts.LIB + partyCounts.NAT}</span>
        </div>
        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner border border-white/5">
          {/* Greens block */}
          {partyCounts.GRN > 0 && (
            <div
              style={{
                width: `${(partyCounts.GRN / 88) * 100}%`,
                backgroundColor: PARTIES.GRN.color,
              }}
              title={`Greens: ${partyCounts.GRN} seats`}
              className="transition-all duration-300"
            />
          )}
          {/* Labor block */}
          {partyCounts.ALP > 0 && (
            <div
              style={{
                width: `${(partyCounts.ALP / 88) * 100}%`,
                backgroundColor: PARTIES.ALP.color,
              }}
              title={`Labor: ${partyCounts.ALP} seats`}
              className="transition-all duration-300"
            />
          )}
          {/* Independents block */}
          {partyCounts.IND > 0 && (
            <div
              style={{
                width: `${(partyCounts.IND / 88) * 100}%`,
                backgroundColor: PARTIES.IND.color,
              }}
              title={`Independent: ${partyCounts.IND} seats`}
              className="transition-all duration-300"
            />
          )}
          {/* Liberals block */}
          {partyCounts.LIB > 0 && (
            <div
              style={{
                width: `${(partyCounts.LIB / 88) * 100}%`,
                backgroundColor: PARTIES.LIB.color,
              }}
              title={`Liberal: ${partyCounts.LIB} seats`}
              className="transition-all duration-300"
            />
          )}
          {/* Nationals block */}
          {partyCounts.NAT > 0 && (
            <div
              style={{
                width: `${(partyCounts.NAT / 88) * 100}%`,
                backgroundColor: PARTIES.NAT.color,
              }}
              title={`National: ${partyCounts.NAT} seats`}
              className="transition-all duration-300"
            />
          )}
          {/* One Nation block */}
          {partyCounts.ON > 0 && (
            <div
              style={{
                width: `${(partyCounts.ON / 88) * 100}%`,
                backgroundColor: PARTIES.ON.color,
              }}
              title={`One Nation: ${partyCounts.ON} seats`}
              className="transition-all duration-300"
            />
          )}
        </div>
      </div>

      {/* Seat Tally & Shift Table */}
      {(() => {
        const baseline: Record<PartyCode, number> = {
          ALP: 54,
          LIB: 19,
          NAT: 11,
          GRN: 4,
          ON: 0,
          IND: 0,
        };

        const gainsLosses: Record<PartyCode, number> = {
          ALP: partyCounts.ALP - baseline.ALP,
          LIB: partyCounts.LIB - baseline.LIB,
          NAT: partyCounts.NAT - baseline.NAT,
          GRN: partyCounts.GRN - baseline.GRN,
          ON: partyCounts.ON - baseline.ON,
          IND: partyCounts.IND - baseline.IND,
        };

        const formattingGainLoss = (val: number) => {
          if (val > 0) return `+${val}`;
          if (val < 0) return `${val}`;
          return '0';
        };

        return (
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <button
                id="toggle-seat-tally-btn"
                onClick={() => setIsSeatTallyExpanded((prev) => !prev)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 hover:text-white transition-colors cursor-pointer py-1 px-1.5 -ml-1.5 rounded hover:bg-white/5"
                title={isSeatTallyExpanded ? "Click to collapse Seat Tally" : "Click to expand Seat Tally"}
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Seat Tally & Shift
                </span>
                {isSeatTallyExpanded ? (
                  <ChevronUp size={13} className="text-slate-400" />
                ) : (
                  <ChevronDown size={13} className="text-slate-400" />
                )}
              </button>

              <div className="flex items-center gap-2">
                {!isSeatTallyExpanded && (
                  <span className="text-[10px] text-slate-500 font-sans">
                    ALP {partyCounts.ALP} · COAL {partyCounts.LIB + partyCounts.NAT} · GRN {partyCounts.GRN}
                  </span>
                )}
                {customOverridesCount > 0 && (
                  <button
                    id="clear-overrides-btn-hemi"
                    onClick={onClearOverrides}
                    className="flex items-center gap-1.5 text-[10px] text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded border border-amber-500/30 font-medium transition-all duration-150 cursor-pointer animate-pulse"
                  >
                    <RefreshCw size={10} className="animate-spin" />
                    <span>Clear {customOverridesCount} seat overrides</span>
                  </button>
                )}
              </div>
            </div>

            {/* Collapsible Seats Table */}
            {isSeatTallyExpanded && (
              <div className="overflow-hidden rounded border border-white/10 mt-1 animate-fadeIn">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-[10px] font-sans font-semibold text-slate-400 uppercase border-b border-white/10">
                      <th className="py-2.5 px-3">Party</th>
                      <th className="py-2.5 px-3 text-center">Seat Share</th>
                      <th className="py-2.5 px-3 text-center">Tally</th>
                      <th className="py-2.5 px-3 text-right">Swing vs '22</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                    {(['ALP', 'LIB', 'NAT', 'GRN', 'ON', 'IND'] as PartyCode[]).map((partyCode) => {
                      const party = PARTIES[partyCode];
                      const count = partyCounts[partyCode];
                      const change = gainsLosses[partyCode];
                      const isWinner =
                        (partyCode === 'ALP' && count >= 45) ||
                        ((partyCode === 'LIB' || partyCode === 'NAT') &&
                          partyCounts.LIB + partyCounts.NAT >= 45);

                      return (
                        <tr key={partyCode} className="hover:bg-white/5 transition-colors">
                          <td className="py-2 px-3 font-medium text-white flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                              style={{ backgroundColor: party.color }}
                            />
                            <span>{party.name}</span>
                            {isWinner && (
                              <CheckCircle2 size={12} className="text-green-400" />
                            )}
                          </td>
                          <td className="py-2 px-3 text-center text-[11px] text-slate-400 font-mono">
                            {((count / 88) * 100).toFixed(1)}%
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-white font-mono text-sm">
                            {count}
                          </td>
                          <td
                            className={`py-2 px-3 text-right font-mono font-bold text-[11px] ${
                              change > 0
                                ? 'text-green-400'
                                : change < 0
                                ? 'text-red-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {formattingGainLoss(change)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
