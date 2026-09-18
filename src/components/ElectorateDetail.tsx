/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Electorate, PARTIES, PartyCode, REGIONS } from '../data';
import { motion } from 'motion/react';
import { User, Users, Compass, ShieldAlert, Award, RotateCcw, GraduationCap, Home, DollarSign, Heart, Calendar, X } from 'lucide-react';
import { getABSDemographics } from '../utils/demographics';

interface ElectorateDetailProps {
  electorate: (Electorate & { currentParty: PartyCode; margin: number }) | null;
  customOverrides: Record<string, PartyCode>;
  onOverrideSeat: (seatId: string, party: PartyCode | null) => void;
  onClearSeatSelection?: () => void;
}

interface StatBarProps {
  label: string;
  value: number;
  stateAvg: number;
  colorClass: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, stateAvg, colorClass }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] text-slate-400 font-sans">
        <span>{label}</span>
        <span className="flex items-center gap-1">
          <span className="text-white font-semibold">{value}%</span>
          <span className="text-slate-500 text-[8px]">(Avg: {stateAvg}%)</span>
        </span>
      </div>
      <div className="relative w-full bg-white/10 h-2 rounded-full overflow-visible">
        {/* Progress Bar */}
        <div className={`absolute top-0 left-0 ${colorClass} h-full rounded-full transition-all duration-300`} style={{ width: `${value}%` }} />
        {/* State Average Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-amber-400 z-10 hover:scale-x-150 transition-transform cursor-help" 
          style={{ left: `${stateAvg}%` }} 
          title={`Victoria State Average: ${stateAvg}%`}
        />
      </div>
    </div>
  );
};

export const ElectorateDetail: React.FC<ElectorateDetailProps> = ({
  electorate,
  customOverrides,
  onOverrideSeat,
  onClearSeatSelection,
}) => {
  const [activeTab, setActiveTab] = React.useState<'election' | 'demographics'>('election');

  // Reset tab to election whenever electorate changes
  React.useEffect(() => {
    setActiveTab('election');
  }, [electorate?.id]);

  if (!electorate) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card rounded-lg border-subtle p-8 shadow-sm min-h-[300px] text-center">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
          <Compass className="text-slate-400 stroke-[1.5]" size={24} />
        </div>
        <h4 className="font-sans font-medium text-white text-sm">No Electorate Selected</h4>
        <p className="text-xs text-slate-400 font-sans max-w-[200px] mt-1 leading-relaxed">
          Click any seat on the cartogram map or parliament arch to inspect and toggle it.
        </p>
      </div>
    );
  }

  const regionInfo = REGIONS[electorate.region];
  const isOverridden = !!customOverrides[electorate.id];
  const originalPartyInfo = PARTIES[electorate.originalParty];
  const currentPartyInfo = PARTIES[electorate.currentParty];
  const demo = getABSDemographics(electorate);

  // Helper to format voters number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Determine margin classification
  const marginClass = (margin: number) => {
    if (margin < 2) return { text: 'Ultra-Marginal (<2%)', color: 'text-red-400 bg-red-950/40 border-red-500/20' };
    if (margin < 6) return { text: 'Marginal (2-6%)', color: 'text-amber-400 bg-amber-950/40 border-amber-500/20' };
    if (margin < 12) return { text: 'Fairly Safe (6-12%)', color: 'text-blue-400 bg-blue-950/40 border-blue-500/20' };
    return { text: 'Very Safe (>12%)', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20' };
  };

  const currentMarginTier = marginClass(electorate.margin);


  return (
    <div className="flex flex-col h-full bg-card rounded-lg border-subtle p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-sans">
              Electorate Profile
            </span>
            {onClearSeatSelection && (
              <button
                onClick={onClearSeatSelection}
                id="clear-seat-selection-btn"
                title="Deselect this electorate"
                className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <X size={10} />
                <span>Clear Selection</span>
              </button>
            )}
          </div>
          <h3 className="font-sans font-bold text-white text-xl tracking-tight">
            {electorate.name}
          </h3>
          <span className="text-[11px] text-slate-400 font-medium font-sans">
            {regionInfo?.name || electorate.region} Region
          </span>
        </div>

        {/* Marginality Tier Badge */}
        <span className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded border shrink-0 ${currentMarginTier.color}`}>
          {currentMarginTier.text}
        </span>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center gap-2.5">
          <div className="p-2 bg-[#0D1117] rounded border border-white/10 text-slate-400 shrink-0">
            <User size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-sans font-medium">Current MP</span>
            <span className="text-xs font-bold text-white font-sans truncate max-w-[120px]">
              {electorate.mp}
            </span>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center gap-2.5">
          <div className="p-2 bg-[#0D1117] rounded border border-white/10 text-slate-400 shrink-0">
            <Users size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-sans font-medium">Enrolled Voters</span>
            <span className="text-xs font-bold text-white font-sans font-mono">
              {formatNumber(electorate.voters)}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex border-b border-white/10 mb-4 text-xs font-sans shrink-0">
        <button
          onClick={() => setActiveTab('election')}
          className={`flex-1 pb-2 text-center font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === 'election'
              ? 'text-white border-blue-500'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          Electoral Outcomes
        </button>
        <button
          onClick={() => setActiveTab('demographics')}
          className={`flex-1 pb-2 text-center font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === 'demographics'
              ? 'text-white border-blue-500'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          ABS Census Demographics
        </button>
      </div>

      {activeTab === 'election' ? (
        <div className="flex flex-col flex-1 min-h-0 justify-between">
          {/* Campaign Standing Card */}
          <div className="p-4 rounded border border-white/5 mb-4 bg-white/5 flex flex-col gap-3.5 shrink-0">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 font-sans uppercase tracking-wider">
              <span>Simulation Standing</span>
              <Award size={12} className="text-slate-400" />
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Left: 2022 Actual */}
              <div className="flex flex-col items-center gap-1.5 flex-1 p-2 bg-[#0D1117] rounded border border-white/10 text-center">
                <span className="text-[9px] text-slate-400 font-sans font-medium uppercase tracking-wide">
                  2022 Election
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: originalPartyInfo.color }}
                />
                <div className="text-xs font-bold text-white font-sans">
                  {originalPartyInfo.name}
                </div>
                <div className="text-[10px] font-mono font-semibold text-slate-400">
                  +{electorate.originalMargin.toFixed(1)}%
                </div>
              </div>

              <div className="text-slate-500 font-semibold text-lg select-none">→</div>

              {/* Right: Current Simulated Outcome */}
              <div className="flex flex-col items-center gap-1.5 flex-1 p-2 bg-[#0D1117] rounded border border-white/10 text-center">
                <span className="text-[9px] text-slate-400 font-sans font-medium uppercase tracking-wide">
                  Simulated Winner
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: currentPartyInfo.color }}
                />
                <div className="text-xs font-bold text-white font-sans">
                  {currentPartyInfo.name}
                </div>
                <div className="text-[10px] font-mono font-semibold text-slate-400">
                  +{electorate.margin.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* 4. MANUAL OVERRIDE TOOL */}
          <div className="mt-auto flex flex-col gap-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider opacity-50 block font-bold text-slate-400">
                Toggle Winner Manual Override
              </span>
              {isOverridden && (
                <button
                  onClick={() => onOverrideSeat(electorate.id, null)}
                  className="flex items-center gap-1 text-[10px] font-sans font-medium text-rose-400 hover:text-rose-300 cursor-pointer transition-colors"
                >
                  <RotateCcw size={10} />
                  <span>Reset to Swing</span>
                </button>
              )}
            </div>

            {/* Buttons grid */}
            <div className="grid grid-cols-6 gap-1" id="manual-override-controls">
              {(['ALP', 'LIB', 'NAT', 'GRN', 'ON', 'IND'] as PartyCode[]).map((pCode) => {
                const party = PARTIES[pCode];
                const isSelected = electorate.currentParty === pCode;
                const isManualMatch = customOverrides[electorate.id] === pCode;

                return (
                  <button
                    key={pCode}
                    onClick={() => onOverrideSeat(electorate.id, pCode)}
                    className={`flex flex-col items-center gap-1 px-1 py-2.5 rounded border text-[10px] font-bold font-sans transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-sm ring-1 ring-offset-1 ring-offset-[#0A0C10]'
                        : 'text-slate-300 hover:bg-white/10 hover:border-white/20 border-white/10'
                    }`}
                    style={{
                      backgroundColor: isSelected ? party.color : undefined,
                      borderColor: isSelected ? party.color : undefined,
                      boxShadow: isSelected ? `0 4px 12px -2px ${party.color}40` : undefined,
                    }}
                  >
                    <span className="text-[10px] tracking-wider uppercase">{party.name.substring(0, 3)}</span>
                    {isManualMatch && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full" title="Manual choice" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Helper Note for Override Status */}
            <div className="mt-2 flex items-start gap-2 text-[10px] leading-relaxed text-slate-400 bg-white/5 p-2.5 rounded border border-white/5">
              <ShieldAlert size={12} className="shrink-0 text-slate-400 mt-0.5" />
              <span>
                {isOverridden
                  ? "Manual override active. This seat is locked to your choice and is exempt from the uniform swing sliders."
                  : "No override active. This seat responds dynamically to the statewide partisan swing sliders."}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 font-sans text-xs text-slate-300 scrollbar-thin">
          
          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Calendar size={12} className="text-blue-400" />
                <span>Age Distribution</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Median Age</span>
                  <span className="font-bold text-white">{demo.age.median} yrs (State Avg: 38)</span>
                </div>
                <StatBar label="Under 20" value={demo.age.under20} stateAvg={24.0} colorClass="bg-blue-500" />
                <StatBar label="20 – 34" value={demo.age.twentyTo34} stateAvg={21.5} colorClass="bg-cyan-500" />
                <StatBar label="35 – 54" value={demo.age.thirtyFiveTo54} stateAvg={26.5} colorClass="bg-emerald-500" />
                <StatBar label="55+" value={demo.age.fiftyFivePlus} stateAvg={28.0} colorClass="bg-amber-500" />
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Users size={12} className="text-pink-400" />
                  <span>Gender</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]">Female</span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <span className="font-bold text-white">{demo.gender.female}%</span>
                      <span className="text-slate-500 text-[8px]">(Avg: 50.7%)</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]">Male</span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <span className="font-bold text-white">{demo.gender.male}%</span>
                      <span className="text-slate-500 text-[8px]">(Avg: 49.3%)</span>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative mt-4">
                  <div className="h-2.5 w-full bg-sky-500 rounded-full overflow-hidden flex">
                    <div className="bg-pink-500 h-full transition-all duration-300" style={{ width: `${demo.gender.female}%` }} />
                  </div>
                  {/* State average line for female (50.7%) */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-amber-400 z-10 cursor-help"
                    style={{ left: "50.7%" }}
                    title="Victoria State Average (Female: 50.7%, Male: 49.3%)"
                  />
                </div>
                <div className="text-[8px] text-slate-500 mt-1.5 text-center font-sans">ABS Census Proportions (Pink: Female, Blue: Male)</div>
              </div>
            </div>
          </div>

          {/* Household Income & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <DollarSign size={12} className="text-emerald-400" />
                <span>Household Income</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span>Median Weekly</span>
                  <span className="font-bold text-white">${demo.income.medianWeekly.toLocaleString()} (State Avg: $1,800)</span>
                </div>
                <StatBar label="Low (<$1k/wk)" value={demo.income.ranges.low} stateAvg={22.0} colorClass="bg-rose-500/80" />
                <StatBar label="Mid ($1k–$3k/wk)" value={demo.income.ranges.mid} stateAvg={58.0} colorClass="bg-blue-500/80" />
                <StatBar label="High (>$3k/wk)" value={demo.income.ranges.high} stateAvg={20.0} colorClass="bg-emerald-500/80" />
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <GraduationCap size={12} className="text-indigo-400" />
                <span>Education Level</span>
              </div>
              <div className="space-y-3">
                <StatBar label="Bachelor+ Degree" value={demo.education.bachelorDegreeOrHigher} stateAvg={32.0} colorClass="bg-indigo-500" />
                <StatBar label="Diploma/Cert" value={demo.education.diplomaCertificate} stateAvg={29.0} colorClass="bg-purple-500" />
                <StatBar label="High School or Below" value={demo.education.highSchoolOrBelow} stateAvg={39.0} colorClass="bg-slate-400" />
              </div>
            </div>
          </div>

          {/* Home Ownership & Religion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Home size={12} className="text-amber-400" />
                <span>Home Ownership</span>
              </div>
              <div className="space-y-3">
                <StatBar label="Owned Outright" value={demo.homeOwnership.ownedOutright} stateAvg={29.0} colorClass="bg-amber-500/80" />
                <StatBar label="Mortgage" value={demo.homeOwnership.mortgage} stateAvg={35.0} colorClass="bg-blue-500/80" />
                <StatBar label="Rented" value={demo.homeOwnership.rented} stateAvg={31.0} colorClass="bg-orange-500/80" />
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Heart size={12} className="text-red-400" />
                <span>Religion</span>
              </div>
              <div className="space-y-3">
                <StatBar label="No Religion" value={demo.religion.noReligion} stateAvg={44.0} colorClass="bg-slate-400" />
                <StatBar label="Christianity" value={demo.religion.christianity} stateAvg={41.0} colorClass="bg-blue-500" />
                <StatBar label="Islam" value={demo.religion.islam} stateAvg={4.2} colorClass="bg-emerald-500" />
                <StatBar label="Hinduism" value={demo.religion.hinduism} stateAvg={3.8} colorClass="bg-orange-500" />
                <StatBar label="Buddhism" value={demo.religion.buddhism} stateAvg={3.2} colorClass="bg-purple-500" />
                <StatBar label="Other / Secular" value={demo.religion.other} stateAvg={3.8} colorClass="bg-pink-500" />
              </div>
            </div>
          </div>

          {/* Comparison Guide Legend */}
          <div className="flex items-center justify-center gap-4 bg-white/5 p-2 rounded border border-white/5 text-[9px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1.5 bg-white/10 rounded-sm inline-block" />
              <span>Seat Proportion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-amber-400 inline-block" />
              <span>Victoria State Average</span>
            </div>
          </div>

          <div className="text-[9px] text-slate-500 text-center italic mt-2 shrink-0">
            Source: ABS Census 2021 Electorate Profiling. Comparison markers represent the official Victoria-wide averages.
          </div>
        </div>
      )}
    </div>
  );
};
