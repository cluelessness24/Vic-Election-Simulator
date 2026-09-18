/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Electorate, REGIONS, PARTIES, PartyCode } from '../data';
import { motion } from 'motion/react';

interface ElectorateMapProps {
  electorates: (Electorate & { currentParty: PartyCode; margin: number })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  paintBrushParty: PartyCode | null;
  onPaintBrushPartyChange: (party: PartyCode | null) => void;
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string | null) => void;
}

export const ElectorateMap: React.FC<ElectorateMapProps> = ({
  electorates,
  selectedId,
  onSelect,
  hoveredId,
  onHover,
  paintBrushParty,
  onPaintBrushPartyChange,
  selectedRegionId,
  onSelectRegion,
}) => {
  // Group electorates by region
  const electoratesByRegion = useMemo(() => {
    const groups: Record<string, (Electorate & { currentParty: PartyCode; margin: number })[]> = {};
    Object.keys(REGIONS).forEach((regId) => {
      groups[regId] = electorates.filter((e) => e.region === regId);
    });
    return groups;
  }, [electorates]);

  // Simplified SVG path for Victorian state outline converted from Wikipedia Commons SVG-Koort_Viktoria.svg
  const victoriaOutlinePath = "M 21.1 12.2 L 15 13.3 L 23.3 388.1 L 47.3 401.8 L 53.7 416 L 69.6 419.6 L 84.6 404.3 L 103.9 406.7 L 117.1 416.9 L 135.7 413 L 172 437.3 L 234.9 463.9 L 257.2 448.3 L 273.6 427.8 L 305.9 410.6 L 327 407.1 L 328.6 393.2 L 305.2 397.2 L 302.4 391.7 L 349.3 369.9 L 362.5 384.9 L 361.9 396.4 L 347.8 414.8 L 327.3 414.6 L 343.7 428.8 L 356.2 428.6 L 360.3 421.5 L 371.6 420.3 L 374.2 405.7 L 388.9 403.5 L 396 416.7 L 388.2 419.7 L 383.9 431.7 L 403.1 445.8 L 416.1 441.4 L 430.2 449.1 L 414.2 445.8 L 426.9 467.7 L 438.6 460.8 L 444.9 463.3 L 444.7 457.6 L 459.8 486.1 L 468.2 489.6 L 472.1 456.2 L 469.5 453.3 L 461.3 465.7 L 448.5 451.5 L 462 445.2 L 478 448.9 L 502.6 438.9 L 504.8 442.2 L 577 381.4 L 613.1 367.4 L 663.2 358.1 L 724 360.6 L 742.6 349.4 L 746.5 339.9 L 741.3 334.4 L 750.6 335 L 750.4 341.5 L 764.9 337.2 L 619.5 264.8 L 618.3 241.3 L 605.6 221.6 L 604.4 196.6 L 591.8 188.8 L 535.7 189.6 L 529 200.9 L 482.9 186.3 L 468.4 194.5 L 436.5 192.2 L 434.9 187.8 L 424.1 191.7 L 396.3 174.3 L 386.5 180.2 L 353 181.1 L 354 202.2 L 333.6 202.9 L 309.4 187.4 L 303.5 172.6 L 282.1 162.6 L 276 152.2 L 246.2 137.3 L 241.7 140.6 L 232.9 123.1 L 219.9 117.6 L 215.3 109.2 L 215.4 79.6 L 195.2 72.1 L 176.3 73.6 L 168.2 58 L 159.9 63.6 L 157.9 78.4 L 146.3 80 L 139.4 59.7 L 130.7 58.4 L 132.6 37.9 L 120.3 34.1 L 116.1 21.7 L 76.3 16 L 58 27.1 L 56.7 22.4 L 21.1 12.2 Z M 376.9 408.1 L 375.9 417.2 L 374.2 420.8 L 382.2 421.6 L 385.3 419.2 L 386.7 415.4 L 393.6 413.6 L 388.3 410 L 386.3 411.1 L 376.9 408.1 Z M 371.3 424 L 368.2 424.2 L 360.3 430.1 L 366.4 430.8 L 370.1 432.9 L 370.2 431.3 L 375.2 431.3 L 379.7 434.4 L 379.5 436.3 L 382.6 437 L 380.7 434.4 L 380.5 432.4 L 381.7 431.5 L 375.8 429.3 L 376.5 425.4 L 371.3 424 Z";

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border-subtle p-6 shadow-sm overflow-hidden select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h3 className="serif text-white italic text-xl">Interactive Cartogram Map</h3>
          <p className="text-xs text-slate-400 font-sans mt-1">
            {paintBrushParty ? (
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                Paint Mode Active: Clicking a seat overrides it to {PARTIES[paintBrushParty].name}. Click the party button again to exit.
              </span>
            ) : selectedRegionId ? (
              <span className="text-amber-400 font-semibold flex items-center gap-2 flex-wrap">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                Editing Swings For: <span className="text-white underline">{REGIONS[selectedRegionId]?.name}</span>.
                <button
                  onClick={() => onSelectRegion(null)}
                  className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 cursor-pointer"
                >
                  Clear Region Filter
                </button>
                {selectedId && (
                  <button
                    onClick={() => onSelect('')}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold border border-white/20 cursor-pointer"
                  >
                    Clear Seat Selection
                  </button>
                )}
              </span>
            ) : selectedId ? (
              <span className="text-slate-300 font-medium flex items-center gap-2 flex-wrap">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                Selected Seat: <span className="text-white underline font-semibold">{electorates.find(e => e.id === selectedId)?.name || selectedId}</span>.
                <button
                  onClick={() => onSelect('')}
                  className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 cursor-pointer"
                >
                  Clear Seat Selection
                </button>
              </span>
            ) : (
              "Click a seat to edit, or click a Region card to filter sliders and the 3-Way Swing Pad to that region."
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 text-[10px] font-sans font-medium">
          {(Object.keys(PARTIES) as PartyCode[]).map((pCode) => {
            const party = PARTIES[pCode];
            const isSelected = paintBrushParty === pCode;
            return (
              <button
                key={pCode}
                onClick={() => onPaintBrushPartyChange(isSelected ? null : pCode)}
                title={`Click to toggle Paint Mode for ${party.name}`}
                className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/15 text-white border-white/40 ring-1 ring-white/20 font-bold'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ backgroundColor: party.color }}
                />
                <span>{party.name === 'Independent' ? 'Ind / Other' : party.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive SVG Cartogram canvas */}
      <div className="relative flex-1 bg-[#0D1117] rounded-lg border border-white/10 overflow-auto flex items-center min-h-[460px] p-2">
        <svg
          viewBox="0 0 800 520"
          className="w-full min-w-[700px] h-auto drop-shadow-sm max-h-[500px] mx-auto"
        >
          {/* 1. Abstract Victoria State Background Outline */}
          <path
            d={victoriaOutlinePath}
            fill="#161B22"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="transition-colors duration-300"
          />         

          {/* 3. Render Region Boundaries & Electorate Cards */}
          {Object.entries(REGIONS).map(([regId, reg]) => {
            const seats = electoratesByRegion[regId] || [];
            // Calculate panel size
            const panelWidth = reg.cols * 26 + 18;
            const panelHeight = reg.rows * 26 + 36;
            const isRegionSelected = selectedRegionId === regId;

            return (
              <g key={regId} className="group/region">
                {/* Region boundary panel card */}
                <rect
                  x={reg.mapX}
                  y={reg.mapY}
                  width={panelWidth}
                  height={panelHeight}
                  rx="10"
                  fill={isRegionSelected ? "rgba(245, 158, 11, 0.08)" : "#161B22"}
                  stroke={isRegionSelected ? "#F59E0B" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth={isRegionSelected ? "2.5" : "1.5"}
                  className="transition-all duration-200 cursor-pointer group-hover/region:stroke-white/30"
                  onClick={() => onSelectRegion(isRegionSelected ? null : regId)}
                />

                {/* Sub-label for region inside panel */}
                <text
                  x={reg.mapX + 10}
                  y={reg.mapY + 18}
                  fill={isRegionSelected ? "#F59E0B" : "#E0E0E0"}
                  fontSize="10"
                  fontWeight="bold"
                  className="font-sans tracking-wide cursor-pointer select-none"
                  onClick={() => onSelectRegion(isRegionSelected ? null : regId)}
                >
                  {reg.shortName}
                </text>

                {/* Seat Count Tag */}
                <rect
                  x={reg.mapX + panelWidth - 28}
                  y={reg.mapY + 8}
                  width="18"
                  height="12"
                  rx="3"
                  fill={isRegionSelected ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                  className="cursor-pointer"
                  onClick={() => onSelectRegion(isRegionSelected ? null : regId)}
                />
                <text
                  x={reg.mapX + panelWidth - 19}
                  y={reg.mapY + 17}
                  fill={isRegionSelected ? "#F59E0B" : "#A0A0A0"}
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="font-mono cursor-pointer select-none"
                  onClick={() => onSelectRegion(isRegionSelected ? null : regId)}
                >
                  11
                </text>

                {/* Render the 11 Seats inside the Region Card */}
                {seats.map((seat, index) => {
                  const col = index % reg.cols;
                  const row = Math.floor(index / reg.cols);

                  // Coordinate of each seat square inside the region panel
                  const seatX = reg.mapX + 10 + col * 26;
                  const seatY = reg.mapY + 26 + row * 26;

                  const isSelected = selectedId === seat.id;
                  const isHovered = hoveredId === seat.id;
                  const partyColor = PARTIES[seat.currentParty].color;

                  // Dynamic rendering of seat
                  return (
                    <g key={seat.id}>
                      {/* Interactive block overlay for hovering/clicking */}
                      <rect
                        x={seatX - 2}
                        y={seatY - 2}
                        width="26"
                        height="26"
                        rx="7"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => onHover(seat.id)}
                        onMouseLeave={() => onHover(null)}
                        onClick={() => onSelect(seat.id)}
                      />

                      {/* Actual visual seat block */}
                      <motion.rect
                        x={seatX}
                        y={seatY}
                        width="22"
                        height="22"
                        rx="5"
                        fill={partyColor}
                        stroke={isSelected ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)'}
                        strokeWidth={isSelected ? 2 : 1}
                        animate={{
                          scale: isSelected ? 1.15 : isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.1 }}
                        className="pointer-events-none"
                      />

                      {/* Small text acronym of party or margin dot inside cell for hyper-detail */}
                      <text
                        x={seatX + 11}
                        y={seatY + 13}
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        opacity="0.8"
                        className="font-sans pointer-events-none"
                      >
                        {seat.name.substring(0, 2).toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Guide connectors from regional outskirts to the metro bay area inserts */}
          <line
            x1="215"
            y1="190"
            x2="185"
            y2="215"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.5"
          />
          <line
            x1="585"
            y1="190"
            x2="555"
            y2="215"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};
