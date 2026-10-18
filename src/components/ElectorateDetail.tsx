/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Electorate, PARTIES, PartyCode, REGIONS } from '../data';
import { 
  User, 
  Users, 
  Compass, 
  ShieldAlert, 
  Award, 
  RotateCcw, 
  GraduationCap, 
  Home, 
  DollarSign, 
  Heart, 
  Calendar, 
  X,
  Layers,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { getABSDemographics, DemographicData } from '../utils/demographics';

interface ElectorateDetailProps {
  electorate: (Electorate & { currentParty: PartyCode; margin: number }) | null;
  customOverrides: Record<string, PartyCode>;
  onOverrideSeat: (seatId: string, party: PartyCode | null) => void;
  onClearSeatSelection?: () => void;
  selectedRegionId?: string | null;
  onClearRegionSelection?: () => void;
  electorates?: (Electorate & { currentParty: PartyCode; margin: number })[];
  onSelectSeat?: (seatId: string) => void;
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
        <div className={`absolute top-0 left-0 ${colorClass} h-full rounded-full transition-all duration-300`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
        {/* State Average Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-amber-400 z-10 hover:scale-x-150 transition-transform cursor-help" 
          style={{ left: `${Math.min(100, Math.max(0, stateAvg))}%` }} 
          title={`Victoria State Average: ${stateAvg}%`}
        />
      </div>
    </div>
  );
};

// Helper to format numbers with commas
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Margin classification helper
const getMarginClass = (margin: number) => {
  if (margin < 2) return { text: 'Ultra-Marginal (<2%)', color: 'text-red-400 bg-red-950/40 border-red-500/20' };
  if (margin < 6) return { text: 'Marginal (2-6%)', color: 'text-amber-400 bg-amber-950/40 border-amber-500/20' };
  if (margin < 12) return { text: 'Fairly Safe (6-12%)', color: 'text-blue-400 bg-blue-950/40 border-blue-500/20' };
  return { text: 'Very Safe (>12%)', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20' };
};

// Aggregates census demographics across all seats in a region
function aggregateRegionDemographics(seats: (Electorate & { currentParty: PartyCode; margin: number })[]): DemographicData {
  if (seats.length === 0) {
    return getABSDemographics({ id: 'dummy', name: '', region: '', voters: 0, mp: '', originalParty: 'ALP', originalMargin: 0 });
  }

  const demos = seats.map(s => ({
    demo: getABSDemographics(s),
    voters: s.voters || 1,
  }));

  const totalVoters = demos.reduce((sum, d) => sum + d.voters, 0) || 1;

  // Weighted average based on enrolled voter population
  const wAvg = (getter: (d: DemographicData) => number) => {
    const sum = demos.reduce((acc, d) => acc + getter(d.demo) * d.voters, 0);
    return Number((sum / totalVoters).toFixed(1));
  };

  return {
    age: {
      median: Math.round(wAvg(d => d.age.median)),
      under20: wAvg(d => d.age.under20),
      twentyTo34: wAvg(d => d.age.twentyTo34),
      thirtyFiveTo54: wAvg(d => d.age.thirtyFiveTo54),
      fiftyFivePlus: wAvg(d => d.age.fiftyFivePlus),
    },
    gender: {
      male: wAvg(d => d.gender.male),
      female: wAvg(d => d.gender.female),
    },
    income: {
      medianWeekly: Math.round(wAvg(d => d.income.medianWeekly)),
      ranges: {
        low: wAvg(d => d.income.ranges.low),
        mid: wAvg(d => d.income.ranges.mid),
        high: wAvg(d => d.income.ranges.high),
      },
    },
    education: {
      bachelorDegreeOrHigher: wAvg(d => d.education.bachelorDegreeOrHigher),
      diplomaCertificate: wAvg(d => d.education.diplomaCertificate),
      highSchoolOrBelow: wAvg(d => d.education.highSchoolOrBelow),
    },
    homeOwnership: {
      ownedOutright: wAvg(d => d.homeOwnership.ownedOutright),
      mortgage: wAvg(d => d.homeOwnership.mortgage),
      rented: wAvg(d => d.homeOwnership.rented),
      other: wAvg(d => d.homeOwnership.other),
    },
    religion: {
      noReligion: wAvg(d => d.religion.noReligion),
      christianity: wAvg(d => d.religion.christianity),
      islam: wAvg(d => d.religion.islam),
      hinduism: wAvg(d => d.religion.hinduism),
      buddhism: wAvg(d => d.religion.buddhism),
      other: wAvg(d => d.religion.other),
    },
  };
}

export const ElectorateDetail: React.FC<ElectorateDetailProps> = ({
  electorate,
  customOverrides,
  onOverrideSeat,
  onClearSeatSelection,
  selectedRegionId,
  onClearRegionSelection,
  electorates = [],
  onSelectSeat,
}) => {
  // Default tab is ABS Census data per user specification
  const [activeTab, setActiveTab] = React.useState<'election' | 'demographics'>('demographics');

  // Reset tab to demographics whenever electorate or region changes
  React.useEffect(() => {
    setActiveTab('demographics');
  }, [electorate?.id, selectedRegionId]);

  // SCENARIO 1: A specific seat is selected
  if (electorate) {
    const regionInfo = REGIONS[electorate.region];
    const isOverridden = !!customOverrides[electorate.id];
    const originalPartyInfo = PARTIES[electorate.originalParty];
    const currentPartyInfo = PARTIES[electorate.currentParty];
    const demo = getABSDemographics(electorate);
    const currentMarginTier = getMarginClass(electorate.margin);

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
                  <span>Clear Seat</span>
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

        {/* Profile Navigation Tabs (Default: Demographics) */}
        <div className="flex border-b border-white/10 mb-4 text-xs font-sans shrink-0">
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

            {/* MANUAL OVERRIDE TOOL */}
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
          /* ABS Census Demographics Tab */
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
  }

  // SCENARIO 2: No specific seat selected, but a Region IS selected
  if (selectedRegionId && REGIONS[selectedRegionId]) {
    const regionInfo = REGIONS[selectedRegionId];
    const regionSeats = electorates.filter(e => e.region === selectedRegionId);
    const totalRegionVoters = regionSeats.reduce((sum, s) => sum + s.voters, 0);
    const aggregatedDemo = aggregateRegionDemographics(regionSeats);

    // Regional seats tally by simulated winning party
    const partySeatCounts: Record<PartyCode, number> = {
      ALP: 0,
      LIB: 0,
      NAT: 0,
      GRN: 0,
      ON: 0,
      IND: 0,
    };
    regionSeats.forEach(s => {
      partySeatCounts[s.currentParty] = (partySeatCounts[s.currentParty] || 0) + 1;
    });

    return (
      <div className="flex flex-col h-full bg-card rounded-lg border-subtle p-6 shadow-sm">
        {/* Region Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-sans flex items-center gap-1">
                <MapPin size={11} />
                <span>Region Profile ({regionSeats.length} Seats)</span>
              </span>
              {onClearRegionSelection && (
                <button
                  onClick={onClearRegionSelection}
                  id="clear-region-filter-btn"
                  title="Clear region selection"
                  className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <X size={10} />
                  <span>Clear Region</span>
                </button>
              )}
            </div>
            <h3 className="font-sans font-bold text-white text-xl tracking-tight">
              {regionInfo.name} Region
            </h3>
            <span className="text-[11px] text-slate-400 font-medium font-sans">
              Victorian Legislative Council Electoral Region
            </span>
          </div>

          {/* Seats Tally Pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
            {(['ALP', 'LIB', 'NAT', 'GRN', 'ON', 'IND'] as PartyCode[]).map(pCode => {
              const count = partySeatCounts[pCode];
              if (!count) return null;
              const party = PARTIES[pCode];
              return (
                <span
                  key={pCode}
                  className="text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1"
                  style={{
                    backgroundColor: `${party.color}20`,
                    borderColor: `${party.color}50`,
                    color: party.color,
                  }}
                >
                  <span>{party.name}</span>
                  <span className="text-white font-mono bg-black/40 px-1 rounded">{count}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Region Meta Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center gap-2.5">
            <div className="p-2 bg-[#0D1117] rounded border border-white/10 text-slate-400 shrink-0">
              <Layers size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-sans font-medium">Assembly Seats</span>
              <span className="text-xs font-bold text-white font-sans">
                {regionSeats.length} Districts Total
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center gap-2.5">
            <div className="p-2 bg-[#0D1117] rounded border border-white/10 text-slate-400 shrink-0">
              <Users size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-sans font-medium">Regional Enrolment</span>
              <span className="text-xs font-bold text-white font-sans font-mono">
                {formatNumber(totalRegionVoters)} Voters
              </span>
            </div>
          </div>
        </div>

        {/* Profile Navigation Tabs (Default: Demographics) */}
        <div className="flex border-b border-white/10 mb-4 text-xs font-sans shrink-0">
          <button
            onClick={() => setActiveTab('demographics')}
            id="tab-region-demographics"
            className={`flex-1 pb-2 text-center font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
              activeTab === 'demographics'
                ? 'text-white border-blue-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Aggregated ABS Demographics
          </button>
          <button
            onClick={() => setActiveTab('election')}
            id="tab-region-electoral-outcomes"
            className={`flex-1 pb-2 text-center font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
              activeTab === 'election'
                ? 'text-white border-blue-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Electoral Outcomes ({regionSeats.length} Seats)
          </button>
        </div>

        {/* TAB 1: REGIONAL ELECTORAL OUTCOMES (LIST ALL SEATS) */}
        {activeTab === 'election' ? (
          <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 font-sans text-xs scrollbar-thin">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
              <span>All {regionSeats.length} Seats in {regionInfo.name}</span>
              <span className="text-slate-500 font-normal">Click any seat to inspect individual profile</span>
            </div>

            {regionSeats.map(seat => {
              const originalParty = PARTIES[seat.originalParty];
              const currentParty = PARTIES[seat.currentParty];
              const isOverridden = !!customOverrides[seat.id];
              const marginTier = getMarginClass(seat.margin);

              return (
                <div
                  key={seat.id}
                  onClick={() => onSelectSeat && onSelectSeat(seat.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isOverridden
                      ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                  title={`Inspect ${seat.name}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Simulated Winner Party Indicator */}
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: currentParty.color }}
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs truncate">{seat.name}</span>
                        {isOverridden && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">
                            Override
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">
                        MP: {seat.mp} • 2022: {originalParty.name} (+{seat.originalMargin.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-xs" style={{ color: currentParty.color }}>
                        {currentParty.name} +{seat.margin.toFixed(1)}%
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${marginTier.color}`}>
                        {marginTier.text.split(' ')[0]}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TAB 2: AGGREGATED ABS CENSUS DEMOGRAPHICS FOR REGION */
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 font-sans text-xs text-slate-300 scrollbar-thin">
            <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10.5px] leading-relaxed">
              Demographic figures represent population-weighted averages across all <strong>{regionSeats.length} Legislative Assembly electorates</strong> in {regionInfo.name}.
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Calendar size={12} className="text-blue-400" />
                  <span>Age Distribution</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span>Regional Median Age</span>
                    <span className="font-bold text-white">{aggregatedDemo.age.median} yrs (State Avg: 38)</span>
                  </div>
                  <StatBar label="Under 20" value={aggregatedDemo.age.under20} stateAvg={24.0} colorClass="bg-blue-500" />
                  <StatBar label="20 – 34" value={aggregatedDemo.age.twentyTo34} stateAvg={21.5} colorClass="bg-cyan-500" />
                  <StatBar label="35 – 54" value={aggregatedDemo.age.thirtyFiveTo54} stateAvg={26.5} colorClass="bg-emerald-500" />
                  <StatBar label="55+" value={aggregatedDemo.age.fiftyFivePlus} stateAvg={28.0} colorClass="bg-amber-500" />
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                    <Users size={12} className="text-pink-400" />
                    <span>Regional Gender Balance</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px]">Female</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <span className="font-bold text-white">{aggregatedDemo.gender.female}%</span>
                        <span className="text-slate-500 text-[8px]">(Avg: 50.7%)</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px]">Male</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <span className="font-bold text-white">{aggregatedDemo.gender.male}%</span>
                        <span className="text-slate-500 text-[8px]">(Avg: 49.3%)</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative mt-4">
                    <div className="h-2.5 w-full bg-sky-500 rounded-full overflow-hidden flex">
                      <div className="bg-pink-500 h-full transition-all duration-300" style={{ width: `${aggregatedDemo.gender.female}%` }} />
                    </div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-amber-400 z-10 cursor-help"
                      style={{ left: "50.7%" }}
                      title="Victoria State Average (Female: 50.7%, Male: 49.3%)"
                    />
                  </div>
                  <div className="text-[8px] text-slate-500 mt-1.5 text-center font-sans">ABS Census Regional Balance</div>
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
                    <span className="font-bold text-white">${aggregatedDemo.income.medianWeekly.toLocaleString()} (State Avg: $1,800)</span>
                  </div>
                  <StatBar label="Low (<$1k/wk)" value={aggregatedDemo.income.ranges.low} stateAvg={22.0} colorClass="bg-rose-500/80" />
                  <StatBar label="Mid ($1k–$3k/wk)" value={aggregatedDemo.income.ranges.mid} stateAvg={58.0} colorClass="bg-blue-500/80" />
                  <StatBar label="High (>$3k/wk)" value={aggregatedDemo.income.ranges.high} stateAvg={20.0} colorClass="bg-emerald-500/80" />
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <GraduationCap size={12} className="text-indigo-400" />
                  <span>Education Level</span>
                </div>
                <div className="space-y-3">
                  <StatBar label="Bachelor+ Degree" value={aggregatedDemo.education.bachelorDegreeOrHigher} stateAvg={32.0} colorClass="bg-indigo-500" />
                  <StatBar label="Diploma/Cert" value={aggregatedDemo.education.diplomaCertificate} stateAvg={29.0} colorClass="bg-purple-500" />
                  <StatBar label="High School or Below" value={aggregatedDemo.education.highSchoolOrBelow} stateAvg={39.0} colorClass="bg-slate-400" />
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
                  <StatBar label="Owned Outright" value={aggregatedDemo.homeOwnership.ownedOutright} stateAvg={29.0} colorClass="bg-amber-500/80" />
                  <StatBar label="Mortgage" value={aggregatedDemo.homeOwnership.mortgage} stateAvg={35.0} colorClass="bg-blue-500/80" />
                  <StatBar label="Rented" value={aggregatedDemo.homeOwnership.rented} stateAvg={31.0} colorClass="bg-orange-500/80" />
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Heart size={12} className="text-red-400" />
                  <span>Religion</span>
                </div>
                <div className="space-y-3">
                  <StatBar label="No Religion" value={aggregatedDemo.religion.noReligion} stateAvg={44.0} colorClass="bg-slate-400" />
                  <StatBar label="Christianity" value={aggregatedDemo.religion.christianity} stateAvg={41.0} colorClass="bg-blue-500" />
                  <StatBar label="Islam" value={aggregatedDemo.religion.islam} stateAvg={4.2} colorClass="bg-emerald-500" />
                  <StatBar label="Hinduism" value={aggregatedDemo.religion.hinduism} stateAvg={3.8} colorClass="bg-orange-500" />
                  <StatBar label="Buddhism" value={aggregatedDemo.religion.buddhism} stateAvg={3.2} colorClass="bg-purple-500" />
                  <StatBar label="Other / Secular" value={aggregatedDemo.religion.other} stateAvg={3.8} colorClass="bg-pink-500" />
                </div>
              </div>
            </div>

            {/* Comparison Guide Legend */}
            <div className="flex items-center justify-center gap-4 bg-white/5 p-2 rounded border border-white/5 text-[9px] text-slate-400 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 bg-white/10 rounded-sm inline-block" />
                <span>Regional Proportion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-0.5 h-3 bg-amber-400 inline-block" />
                <span>Victoria State Average</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // SCENARIO 3: Neither seat nor region selected
  return (
    <div className="flex flex-col items-center justify-center h-full bg-card rounded-lg border-subtle p-8 shadow-sm min-h-[300px] text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
        <Compass className="text-slate-400 stroke-[1.5]" size={24} />
      </div>
      <h4 className="font-sans font-medium text-white text-sm">No Electorate or Region Selected</h4>
      <p className="text-xs text-slate-400 font-sans max-w-[220px] mt-1 leading-relaxed">
        Click any seat or region on the cartogram map or parliament arch to inspect census demographics and electoral outcomes.
      </p>
    </div>
  );
};
