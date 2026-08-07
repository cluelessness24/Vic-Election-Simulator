/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Electorate, REGIONS, PARTIES, PartyCode } from '../data';
import { Search, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';

interface ElectorateListProps {
  electorates: (Electorate & { currentParty: PartyCode; margin: number })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

type SortOption = 'name-asc' | 'margin-asc' | 'margin-desc';

export const ElectorateList: React.FC<ElectorateListProps> = ({
  electorates,
  selectedId,
  onSelect,
  hoveredId,
  onHover,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [selectedPartyFilter, setSelectedPartyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Filter & Sort Logic
  const filteredElectorates = useMemo(() => {
    return electorates
      .filter((elec) => {
        const matchesSearch = elec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          elec.mp.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegionFilter === 'all' || elec.region === selectedRegionFilter;
        const matchesParty = selectedPartyFilter === 'all' || elec.currentParty === selectedPartyFilter;
        return matchesSearch && matchesRegion && matchesParty;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'margin-asc') {
          return a.margin - b.margin; // Marginal first
        }
        if (sortBy === 'margin-desc') {
          return b.margin - a.margin; // Safest first
        }
        return 0;
      });
  }, [electorates, searchTerm, selectedRegionFilter, selectedPartyFilter, sortBy]);

  return (
    <div className="flex flex-col h-[1000px] bg-card rounded-lg border-subtle p-6 shadow-sm">
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="serif text-white italic text-xl">Electorates Directory</h3>
        <p className="text-xs text-slate-400 font-sans">
          Search and filter through all 88 electorates.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-3.5">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <Search size={14} />
        </span>
        <input
          type="text"
          placeholder="Search by seat name or MP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs pl-9 pr-4 py-2.5 bg-white/5 hover:bg-white/10 focus:bg-[#0D1117] border border-white/10 focus:border-white/30 rounded outline-none transition-all font-sans text-white placeholder-slate-500"
        />
      </div>

      {/* FILTER & SORT CONTROLS PANEL */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Region Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="region-filter" className="text-[10px] font-semibold text-slate-400 font-sans uppercase">
            Region
          </label>
          <select
            id="region-filter"
            value={selectedRegionFilter}
            onChange={(e) => setSelectedRegionFilter(e.target.value)}
            className="w-full text-[11px] py-1.5 px-2 bg-white/5 border border-white/10 rounded outline-none font-sans text-slate-300 focus:border-white/30 cursor-pointer"
          >
            <option value="all" className="bg-[#161B22] text-white">All Regions</option>
            {Object.entries(REGIONS).map(([id, reg]) => (
              <option key={id} value={id} className="bg-[#161B22] text-white">
                {reg.shortName}
              </option>
            ))}
          </select>
        </div>

        {/* Party Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="party-filter" className="text-[10px] font-semibold text-slate-400 font-sans uppercase">
            Party
          </label>
          <select
            id="party-filter"
            value={selectedPartyFilter}
            onChange={(e) => setSelectedPartyFilter(e.target.value)}
            className="w-full text-[11px] py-1.5 px-2 bg-white/5 border border-white/10 rounded outline-none font-sans text-slate-300 focus:border-white/30 cursor-pointer"
          >
            <option value="all" className="bg-[#161B22] text-white">All Parties</option>
            {Object.entries(PARTIES).map(([code, p]) => (
              <option key={code} value={code} className="bg-[#161B22] text-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sort-select" className="text-[10px] font-semibold text-slate-400 font-sans uppercase">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full text-[11px] py-1.5 px-2 bg-white/5 border border-white/10 rounded outline-none font-sans text-slate-300 focus:border-white/30 cursor-pointer"
          >
            <option value="name-asc" className="bg-[#161B22] text-white">Alphabetical</option>
            <option value="margin-asc" className="bg-[#161B22] text-white">Marginal first</option>
            <option value="margin-desc" className="bg-[#161B22] text-white">Safest first</option>
          </select>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="flex-1 overflow-y-auto border border-white/10 rounded divide-y divide-white/5 shadow-inner pr-0.5">
        {filteredElectorates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <span className="text-xs font-sans">No matching electorates found.</span>
          </div>
        ) : (
          filteredElectorates.map((elec) => {
            const isSelected = selectedId === elec.id;
            const isHovered = hoveredId === elec.id;
            const party = PARTIES[elec.currentParty];

            return (
              <div
                key={elec.id}
                onMouseEnter={() => onHover(elec.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(elec.id)}
                className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-white/5 border-l-4 border-amber-500 font-medium'
                    : isHovered
                    ? 'bg-white/5'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Party indicator dot */}
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: party.color }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-sans truncate ${isSelected ? 'font-bold text-white' : 'text-slate-200'}`}>
                      {elec.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans truncate">
                      {REGIONS[elec.region]?.shortName} • {elec.mp}
                    </span>
                  </div>
                </div>

                {/* Right: margin display */}
                <div className="flex items-center gap-1 shrink-0 ml-3">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    elec.margin < 2
                      ? 'bg-red-950/40 text-red-400 border border-red-500/20'
                      : elec.margin < 6
                      ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}>
                    {elec.margin.toFixed(1)}%
                  </span>
                  <ChevronRight size={12} className="text-slate-500" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Directory Footer stats */}
      <div className="mt-3 text-[10px] text-slate-500 font-sans text-right">
        Showing {filteredElectorates.length} of 88 electorates
      </div>
    </div>
  );
};
