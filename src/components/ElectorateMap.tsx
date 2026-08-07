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

  // Abstract SVG path for Victorian state outline
  const victoriaOutlinePath = "M 35 150 L 35 70 L 120 65 L 180 80 L 230 65 L 280 80 L 320 60 L 360 85 L 420 75 L 480 110 L 530 145 L 610 185 L 670 210 L 750 250 L 740 265 L 710 280 L 670 315 L 630 350 L 590 380 L 555 405 L 535 440 L 520 450 L 505 440 L 485 415 L 450 415 L 435 425 L 415 410 L 380 415 L 350 415 L 340 395 L 325 390 L 315 410 L 290 415 L 265 428 L 240 435 L 220 415 L 200 400 L 170 390 L 140 385 L 110 365 L 75 350 L 55 350 L 35 320 Z";

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

        {/* Legend overlays for geographic alignment */}
        <div className="absolute bottom-3 left-4 text-[10px] font-sans text-slate-400 bg-[#161B22]/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/10 flex flex-col gap-0.5">
          <span className="font-semibold text-white">Cartogram Geography</span>
          <span>• Center: Greater Melbourne</span>
          <span>• West: Ballarat, Geelong, Otways</span>
          <span>• North: Bendigo, Macedon, Mildura</span>
          <span>• East: Gippsland, Mornington, Evelyn</span>
        </div>
      </div>
    </div>
  );
};
