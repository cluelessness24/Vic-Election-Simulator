/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { PARTIES, PartyCode, Electorate, REGIONS } from '../data';
import { PREFERENCE_DATA } from '../preferenceData';
import { RotateCcw, ArrowUp, ArrowDown, MoveVertical, Sparkles, Newspaper, Check, Copy, GitFork, ArrowRight } from 'lucide-react';
import { PARTY_WAVE_PRESETS, PartyWavePreset, getPresetSwings } from '../data/partyWavePresets';
import { SerializedPartySwingsState } from '../utils/partySwingsString';

export type SliderPartyCode = 'GRN' | 'ALP' | 'IND' | 'LIB' | 'NAT' | 'ON';

export const SLIDER_PARTIES: SliderPartyCode[] = ['GRN', 'ALP', 'IND', 'LIB', 'NAT', 'ON'];

export type PartySwings = Record<SliderPartyCode, number>;

export const INITIAL_PARTY_SWINGS: PartySwings = {
  GRN: 0,
  ALP: 0,
  IND: 0,
  LIB: 0,
  NAT: 0,
  ON: 0,
};

// Statewide 2022 actual primary vote baseline distribution
export const STATEWIDE_BASELINE: Record<SliderPartyCode, number> = {
  ALP: 37.0,
  LIB: 29.8,
  NAT: 4.7,
  GRN: 11.5,
  ON: 4.7,
  IND: 12.3,
};

interface PartySwingBarProps {
  currentSwings: PartySwings;
  onUpdateSwings: (newSwings: PartySwings) => void;
  onResetSwings: () => void;
  selectedSeatId: string | null;
  selectedRegionId: string | null;
  electorates: Electorate[];
  onClearScope?: () => void;
  onApplyPresetState?: (presetState: SerializedPartySwingsState) => void;
  onLoadIntoPreferenceFlow?: () => void;
}

export const PartySwingBar: React.FC<PartySwingBarProps> = ({
  currentSwings,
  onUpdateSwings,
  onResetSwings,
  selectedSeatId,
  selectedRegionId,
  electorates,
  onClearScope,
  onApplyPresetState,
  onLoadIntoPreferenceFlow,
}) => {
  const [draggingParty, setDraggingParty] = useState<SliderPartyCode | null>(null);
  const dragStartYRef = useRef<number>(0);
  const startSwingsRef = useRef<PartySwings>(INITIAL_PARTY_SWINGS);
  const [hoveredParty, setHoveredParty] = useState<SliderPartyCode | null>(null);

  // Toggle for auto-rebalancing other parties (defaults to true)
  const [autoRebalance, setAutoRebalance] = useState<boolean>(true);

  // Published polling & scenario filter: 'all' | 'poll' | 'scenario'
  const [presetFilter, setPresetFilter] = useState<'all' | 'poll' | 'scenario'>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Compute baseline primary shares for the active scope (Seat > Region > Statewide)
  const baselineShares = useMemo<Record<SliderPartyCode, number>>(() => {
    if (selectedSeatId && PREFERENCE_DATA[selectedSeatId]) {
      const pData = PREFERENCE_DATA[selectedSeatId];
      const seat = electorates.find((e) => e.id === selectedSeatId);
      const isNatSeat =
        seat?.originalParty === 'NAT' ||
        (['northern_vic', 'western_vic', 'eastern_vic'].includes(seat?.region || '') &&
          seat?.originalParty !== 'LIB');

      const alp = pData.primaryPercentages.ALP || 0;
      const grn = pData.primaryPercentages.GRN || 0;
      const on = pData.primaryPercentages.ON || 0;
      const ind = pData.primaryPercentages.OTH || 0;
      const coal = pData.primaryPercentages.COALITION || 0;

      let lib = 0;
      let nat = 0;
      if (isNatSeat) {
        nat = coal;
      } else {
        lib = coal;
      }

      // Ensure every party has at least 1% baseline so it can be swung in that seat
      return {
        GRN: Math.max(1.0, grn),
        ALP: Math.max(1.0, alp),
        IND: Math.max(1.0, ind),
        LIB: Math.max(1.0, lib),
        NAT: Math.max(1.0, nat),
        ON: Math.max(1.0, on),
      };
    }

    if (selectedRegionId) {
      const regionSeats = electorates.filter((e) => e.region === selectedRegionId);
      let totalFormal = 0;
      let alpVotes = 0;
      let grnVotes = 0;
      let onVotes = 0;
      let indVotes = 0;
      let libVotes = 0;
      let natVotes = 0;

      regionSeats.forEach((s) => {
        const pd = PREFERENCE_DATA[s.id];
        if (pd) {
          totalFormal += pd.totalFormalVotes;
          alpVotes += pd.primaryVotes.ALP || 0;
          grnVotes += pd.primaryVotes.GRN || 0;
          onVotes += pd.primaryVotes.ON || 0;
          indVotes += pd.primaryVotes.OTH || 0;
          const coalVotes = pd.primaryVotes.COALITION || 0;
          if (s.originalParty === 'NAT') {
            natVotes += coalVotes;
          } else {
            libVotes += coalVotes;
          }
        }
      });

      if (totalFormal > 0) {
        return {
          GRN: Number(((grnVotes / totalFormal) * 100).toFixed(1)),
          ALP: Number(((alpVotes / totalFormal) * 100).toFixed(1)),
          IND: Number(((indVotes / totalFormal) * 100).toFixed(1)),
          LIB: Number(((libVotes / totalFormal) * 100).toFixed(1)),
          NAT: Number(((natVotes / totalFormal) * 100).toFixed(1)),
          ON: Number(((onVotes / totalFormal) * 100).toFixed(1)),
        };
      }
    }

    return STATEWIDE_BASELINE;
  }, [selectedSeatId, selectedRegionId, electorates]);

  // Compute effective vote shares: baseline + swing (clamped >= 0)
  const effectiveShares = useMemo(() => {
    const raw: Record<SliderPartyCode, number> = {
      GRN: Math.max(0, baselineShares.GRN + (currentSwings.GRN || 0)),
      ALP: Math.max(0, baselineShares.ALP + (currentSwings.ALP || 0)),
      IND: Math.max(0, baselineShares.IND + (currentSwings.IND || 0)),
      LIB: Math.max(0, baselineShares.LIB + (currentSwings.LIB || 0)),
      NAT: Math.max(0, baselineShares.NAT + (currentSwings.NAT || 0)),
      ON: Math.max(0, baselineShares.ON + (currentSwings.ON || 0)),
    };
    return raw;
  }, [baselineShares, currentSwings]);

  // Total effective primary votes across all parties
  const totalEffectiveVote = useMemo(() => {
    const total = SLIDER_PARTIES.reduce((sum, p) => sum + effectiveShares[p], 0);
    return Number(total.toFixed(1));
  }, [effectiveShares]);

  // Remaining unassigned headroom (only applicable when autoRebalance is OFF)
  const remainingHeadroom = useMemo(() => {
    return Number(Math.max(0, 100 - totalEffectiveVote).toFixed(1));
  }, [totalEffectiveVote]);

  // 1. Proportional rebalancing function keeping total at 100%
  const calculateRebalancedSwings = useCallback(
    (targetParty: SliderPartyCode, desiredSwing: number, baseSwings: PartySwings): PartySwings => {
      // Clamp swing strictly between -30% and +30%
      let clampedSwing = Math.max(-30, Math.min(30, desiredSwing));

      // Also clamp so effective share doesn't go below 0% or above 100%
      const baseShare = baselineShares[targetParty];
      if (baseShare + clampedSwing < 0) {
        clampedSwing = -baseShare;
      } else if (baseShare + clampedSwing > 100) {
        clampedSwing = 100 - baseShare;
      }

      clampedSwing = Number(clampedSwing.toFixed(1));

      // Swing change from base
      const currentPartySwing = baseSwings[targetParty] || 0;
      const delta = clampedSwing - currentPartySwing;

      if (Math.abs(delta) < 0.01) {
        return { ...baseSwings, [targetParty]: clampedSwing };
      }

      const otherParties = SLIDER_PARTIES.filter((p) => p !== targetParty);

      let updatedSwings = { ...baseSwings, [targetParty]: clampedSwing };
      let remainingDeltaToAbsorb = -delta; // what other parties must absorb

      // 3-pass proportional absorption
      for (let pass = 0; pass < 3 && Math.abs(remainingDeltaToAbsorb) > 0.05; pass++) {
        const eligibleParties = otherParties.filter((p) => {
          const eff = baselineShares[p] + (updatedSwings[p] || 0);
          if (remainingDeltaToAbsorb < 0) {
            return eff > 0.1 && (updatedSwings[p] || 0) > -30;
          } else {
            return eff < 95 && (updatedSwings[p] || 0) < 30;
          }
        });

        if (eligibleParties.length === 0) break;

        const totalEligibleShare = eligibleParties.reduce((sum, p) => {
          const eff = Math.max(0.1, baselineShares[p] + (updatedSwings[p] || 0));
          return sum + eff;
        }, 0);

        let deltaDistributed = 0;
        eligibleParties.forEach((p) => {
          const eff = Math.max(0.1, baselineShares[p] + (updatedSwings[p] || 0));
          const proportion = eff / totalEligibleShare;
          const shareAdjustment = remainingDeltaToAbsorb * proportion;

          let newSwing = (updatedSwings[p] || 0) + shareAdjustment;
          if (baselineShares[p] + newSwing < 0) {
            newSwing = -baselineShares[p];
          } else if (baselineShares[p] + newSwing > 100) {
            newSwing = 100 - baselineShares[p];
          }
          newSwing = Math.max(-30, Math.min(30, newSwing));

          const actualAdjusted = newSwing - (updatedSwings[p] || 0);
          updatedSwings[p] = Number(newSwing.toFixed(1));
          deltaDistributed += actualAdjusted;
        });

        remainingDeltaToAbsorb -= deltaDistributed;
      }

      return updatedSwings;
    },
    [baselineShares]
  );

  // 2. Independent swing adjustment (when autoRebalance is OFF)
  // Ensures total effective votes across all parties NEVER exceeds 100%
  const calculateIndependentSwing = useCallback(
    (targetParty: SliderPartyCode, desiredSwing: number, baseSwings: PartySwings): PartySwings => {
      // Sum of other parties' current effective shares
      const otherPartiesSum = SLIDER_PARTIES.filter((p) => p !== targetParty).reduce(
        (sum, p) => sum + Math.max(0, baselineShares[p] + (baseSwings[p] || 0)),
        0
      );

      const maxEffectiveShare = Math.max(0, 100 - otherPartiesSum);
      const baseShare = baselineShares[targetParty];

      // Upper limit: cannot exceed 100% total, and cannot exceed +30% swing
      let maxAllowedSwing = maxEffectiveShare - baseShare;
      maxAllowedSwing = Math.min(30.0, maxAllowedSwing);

      // Lower limit: effective share >= 0%, and cannot drop below -30% swing
      const minAllowedSwing = Math.max(-30.0, -baseShare);

      let clamped = Math.max(minAllowedSwing, Math.min(maxAllowedSwing, desiredSwing));
      clamped = Number(clamped.toFixed(1));

      return {
        ...baseSwings,
        [targetParty]: clamped,
      };
    },
    [baselineShares]
  );

  // Unified dispatcher based on autoRebalance toggle
  const getNextSwings = useCallback(
    (party: SliderPartyCode, desiredSwing: number, baseSwings: PartySwings) => {
      if (autoRebalance) {
        return calculateRebalancedSwings(party, desiredSwing, baseSwings);
      } else {
        return calculateIndependentSwing(party, desiredSwing, baseSwings);
      }
    },
    [autoRebalance, calculateRebalancedSwings, calculateIndependentSwing]
  );

  // Stepper adjustment (+0.5% or -0.5%)
  const handleStepSwing = (party: SliderPartyCode, stepDelta: number) => {
    const current = currentSwings[party] || 0;
    const nextSwing = current + stepDelta;
    const next = getNextSwings(party, nextSwing, currentSwings);
    onUpdateSwings(next);
  };

  // Drag start
  const handleMouseDown = (e: React.MouseEvent, party: SliderPartyCode) => {
    e.preventDefault();
    setDraggingParty(party);
    dragStartYRef.current = e.clientY;
    startSwingsRef.current = { ...currentSwings };
  };

  const handleTouchStart = (e: React.TouchEvent, party: SliderPartyCode) => {
    if (e.touches[0]) {
      setDraggingParty(party);
      dragStartYRef.current = e.touches[0].clientY;
      startSwingsRef.current = { ...currentSwings };
    }
  };

  // Window drag listeners
  useEffect(() => {
    if (!draggingParty) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = dragStartYRef.current - e.clientY; // Upward is positive
      // Sensitivity: 1px = 0.15% swing
      const swingChange = deltaY * 0.15;
      const initialPartySwing = startSwingsRef.current[draggingParty] || 0;
      const desired = initialPartySwing + swingChange;
      const next = getNextSwings(draggingParty, desired, startSwingsRef.current);
      onUpdateSwings(next);
    };

    const handleMouseUp = () => {
      setDraggingParty(null);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const deltaY = dragStartYRef.current - e.touches[0].clientY;
        const swingChange = deltaY * 0.15;
        const initialPartySwing = startSwingsRef.current[draggingParty] || 0;
        const desired = initialPartySwing + swingChange;
        const next = getNextSwings(draggingParty, desired, startSwingsRef.current);
        onUpdateSwings(next);
      }
    };

    const handleTouchEnd = () => {
      setDraggingParty(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggingParty, getNextSwings, onUpdateSwings]);

  // Determine Scope Title & Description
  const scopeTitle = useMemo(() => {
    if (selectedSeatId) {
      const seat = electorates.find((e) => e.id === selectedSeatId);
      return `${seat?.name || selectedSeatId} District (Single Seat)`;
    }
    if (selectedRegionId) {
      return `${REGIONS[selectedRegionId]?.name || selectedRegionId} Region (11 Seats)`;
    }
    return 'Victoria State-Wide (All 88 Districts)';
  }, [selectedSeatId, selectedRegionId, electorates]);

  const hasActiveSwings = useMemo(() => {
    return SLIDER_PARTIES.some((p) => Math.abs(currentSwings[p] || 0) >= 0.1);
  }, [currentSwings]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* Scope Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-white/10">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Party Swing Slider: <span className="text-amber-300 font-mono">{scopeTitle}</span>
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Click and drag vertically (<span className="text-amber-400 font-bold">▲</span> up to add votes,{' '}
            <span className="text-amber-400 font-bold">▼</span> down to subtract).{' '}
            {autoRebalance
              ? 'Other parties automatically rebalance.'
              : 'Independent mode: other parties hold their values (total capped at 100%).'}
          </p>
        </div>

        {/* Action Controls: Auto-Rebalance Toggle + Reset + Back */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          {/* Auto Rebalance Toggle */}
          <div
            id="toggle-auto-rebalance"
            onClick={() => setAutoRebalance(!autoRebalance)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer select-none"
            title={
              autoRebalance
                ? 'Auto-rebalancing is ON: Dragging any party proportionally adjusts others to keep total vote at 100%.'
                : 'Auto-rebalancing is OFF: Set precise independent swings per party. The upper limit prevents total vote from exceeding 100%.'
            }
          >
            <span className="text-[11px] font-sans text-slate-300">
              Auto-rebalance:
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={autoRebalance}
              onClick={(e) => {
                e.stopPropagation();
                setAutoRebalance(!autoRebalance);
              }}
              className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autoRebalance ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  autoRebalance ? 'translate-x-3.5' : 'translate-x-0'
                }`}
              />
            </button>
            <span
              className={`text-[10px] font-mono font-bold ${
                autoRebalance ? 'text-amber-400' : 'text-slate-400'
              }`}
            >
              {autoRebalance ? 'ON' : 'OFF'}
            </span>
          </div>

          {hasActiveSwings && (
            <button
              onClick={onResetSwings}
              id="btn-reset-party-swings"
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Reset all party swings for this scope to 0.0%"
            >
              <RotateCcw size={12} />
              <span>Reset Swings (0%)</span>
            </button>
          )}

          {onLoadIntoPreferenceFlow && (
            <button
              type="button"
              onClick={onLoadIntoPreferenceFlow}
              id="btn-load-into-preference-flow"
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 hover:border-amber-500/50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
              title="Load current party swings into the Preference Flow Sankey model"
            >
              <GitFork size={13} className="text-amber-400" />
              <span>Load into Preference Flow</span>
            </button>
          )}

          {onClearScope && (selectedSeatId || selectedRegionId) && (
            <button
              onClick={onClearScope}
              className="text-xs text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Back to Statewide
            </button>
          )}
        </div>
      </div>

      {/* INTERACTIVE PARTY PROGRESS BAR (Styled like bottom floating bar) */}
      <div className="w-full bg-[#0D1117]/95 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/80 ring-1 ring-white/10">
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono mb-2 px-1 gap-2">
          <div className="flex items-center gap-1.5">
            <MoveVertical size={13} className="text-amber-400" />
            <span className="text-white font-semibold uppercase tracking-wider text-[10px]">
              Drag party segment vertically:
            </span>
          </div>

          {/* Real-time total percentage meter */}
          <div className="flex items-center gap-2 text-[10px]">
            <span
              className={`px-2 py-0.5 rounded font-mono font-bold border ${
                Math.abs(totalEffectiveVote - 100) < 0.1
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  : totalEffectiveVote < 100
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  : 'bg-red-500/10 text-red-300 border-red-500/20'
              }`}
            >
              Total Primary: {totalEffectiveVote.toFixed(1)}% / 100%
            </span>

            {!autoRebalance && remainingHeadroom > 0.05 && (
              <span className="text-slate-400 hidden sm:inline">
                ({remainingHeadroom.toFixed(1)}% headroom)
              </span>
            )}

            <span className="text-slate-500 font-sans hidden md:inline">
              • Guaranteed min-width • Range ±30.0%
            </span>
          </div>
        </div>

        {/* The Segmented Slider Track */}
        <div
          id="party-swing-progress-slider"
          className="h-20 sm:h-22 w-full bg-white/5 rounded-xl overflow-hidden flex shadow-inner border border-white/10 select-none touch-none relative"
        >
          {SLIDER_PARTIES.map((partyCode) => {
            const party = PARTIES[partyCode];
            const effShare = effectiveShares[partyCode];
            const swing = currentSwings[partyCode] || 0;
            const isDragging = draggingParty === partyCode;
            const isHovered = hoveredParty === partyCode;
            const isPositive = swing > 0.05;
            const isNegative = swing < -0.05;

            // Guaranteed minimum width: min-w-[64px]
            // Proportional flex distribution based on effective share
            const flexBasisPct = Math.max(5.0, effShare);

            return (
              <div
                key={partyCode}
                id={`party-slider-${partyCode}`}
                onMouseDown={(e) => handleMouseDown(e, partyCode)}
                onTouchStart={(e) => handleTouchStart(e, partyCode)}
                onMouseEnter={() => setHoveredParty(partyCode)}
                onMouseLeave={() => setHoveredParty(null)}
                style={{
                  flex: `${flexBasisPct} 1 0%`,
                  minWidth: '64px',
                  backgroundColor: party.color,
                }}
                className={`h-full relative flex flex-col items-center justify-between py-1.5 px-1 text-white font-sans transition-all duration-75 cursor-ns-resize group overflow-hidden border-r border-black/20 last:border-r-0 ${
                  isDragging
                    ? 'ring-2 ring-white z-20 brightness-110 shadow-lg'
                    : 'hover:brightness-105'
                }`}
                title={`${party.fullName} (${partyCode}): Baseline ${baselineShares[partyCode].toFixed(1)}%, Swing: ${
                  swing >= 0 ? '+' : ''
                }${swing.toFixed(1)}%, Current: ${effShare.toFixed(1)}%`}
              >
                {/* Top Chevrons & Step Buttons */}
                <div className="w-full flex items-center justify-between px-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold tracking-wider font-mono">
                    {partyCode}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepSwing(partyCode, 0.1);
                    }}
                    className="p-0.5 hover:bg-black/30 rounded text-white/80 hover:text-white transition-colors"
                    title={`Increase ${partyCode} swing by +0.1%`}
                    aria-label={`Increase ${partyCode} swing`}
                  >
                    <ArrowUp size={11} />
                  </button>
                </div>

                {/* Center Swing Badge */}
                <div className="flex flex-col items-center justify-center my-auto pointer-events-none">
                  <div
                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-tight shadow-sm flex items-center gap-0.5 ${
                      isPositive
                        ? 'bg-black/50 text-emerald-300 ring-1 ring-emerald-400/50'
                        : isNegative
                        ? 'bg-black/50 text-red-300 ring-1 ring-red-400/50'
                        : 'bg-black/30 text-white/90'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {swing.toFixed(1)}%
                  </div>

                  <span className="text-[10px] text-white/80 font-mono mt-0.5 drop-shadow">
                    {effShare.toFixed(1)}%
                  </span>
                </div>

                {/* Bottom Step Down Button & Drag indicator */}
                <div className="w-full flex items-center justify-between px-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-sans text-white/60 truncate pr-0.5">
                    {party.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepSwing(partyCode, -0.1);
                    }}
                    className="p-0.5 hover:bg-black/30 rounded text-white/80 hover:text-white transition-colors"
                    title={`Decrease ${partyCode} swing by -0.1%`}
                    aria-label={`Decrease ${partyCode} swing`}
                  >
                    <ArrowDown size={11} />
                  </button>
                </div>

                {/* Vertical drag indicator overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none flex items-center justify-center">
                    <MoveVertical size={20} className="text-white animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Unallocated headroom block when autoRebalance is OFF and total < 100% */}
          {!autoRebalance && remainingHeadroom > 0.1 && (
            <div
              style={{
                flex: `${remainingHeadroom} 1 0%`,
                minWidth: '50px',
              }}
              className="h-full bg-black/40 border-l border-white/10 flex flex-col items-center justify-center text-[10px] text-slate-400 font-mono select-none px-1"
              title={`Unallocated capacity: ${remainingHeadroom.toFixed(1)}% (Total vote cannot exceed 100%)`}
            >
              <span className="text-[8px] uppercase tracking-wider opacity-60">Remaining</span>
              <span className="text-[10px] text-slate-300 font-semibold">{remainingHeadroom.toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Legend and party quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-3 pt-3 border-t border-white/10 font-mono text-xs">
          {SLIDER_PARTIES.map((partyCode) => {
            const party = PARTIES[partyCode];
            const effShare = effectiveShares[partyCode];
            const swing = currentSwings[partyCode] || 0;
            const baseline = baselineShares[partyCode];

            return (
              <div
                key={partyCode}
                className="flex flex-col p-2 rounded-lg bg-white/5 border border-white/5 text-center transition-colors hover:bg-white/10"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: party.color }}
                  />
                  <span className="font-bold text-white text-[11px]">{party.name}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Vote:{' '}
                  <span className="text-white font-bold">{effShare.toFixed(1)}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                  <span>Base: {baseline.toFixed(1)}%</span>
                  <span>•</span>
                  <span
                    className={`font-semibold ${
                      swing > 0
                        ? 'text-emerald-400'
                        : swing < 0
                        ? 'text-red-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {swing >= 0 ? '+' : ''}
                    {swing.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Published Polling & Quick Party Wave Scenarios */}
      <div className="flex flex-col gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
              <Newspaper size={13} className="text-amber-400" />
              Published Polling & Quick Scenarios
            </span>
            <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
              • Scope: <strong className="text-slate-400">{scopeTitle}</strong>
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPresetFilter('all')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                presetFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({PARTY_WAVE_PRESETS.length})
            </button>
            <button
              type="button"
              onClick={() => setPresetFilter('poll')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                presetFilter === 'poll'
                  ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Published Polls
            </button>
            <button
              type="button"
              onClick={() => setPresetFilter('scenario')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                presetFilter === 'scenario'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Party Waves
            </button>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {PARTY_WAVE_PRESETS.filter(
            (p) => presetFilter === 'all' || p.category === presetFilter
          ).map((preset) => {
            const decoded = getPresetSwings(preset);
            const isActive = SLIDER_PARTIES.every(
              (p) => Math.abs((currentSwings[p] || 0) - (decoded.global[p] || 0)) < 0.15
            );
            const isCopied = copiedSnippetId === preset.id;

            return (
              <div
                key={preset.id}
                id={`preset-party-wave-${preset.id}`}
                onClick={() => {
                  if (onApplyPresetState) {
                    onApplyPresetState(decoded);
                  } else {
                    onUpdateSwings(decoded.global);
                  }
                }}
                className={`p-3 rounded-lg border text-left text-xs font-sans transition-all duration-150 cursor-pointer flex flex-col justify-between gap-2 relative group ${
                  isActive
                    ? 'bg-white/10 border-amber-500/50 ring-1 ring-amber-500/30 shadow-md'
                    : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="font-semibold text-white text-xs truncate">
                      {preset.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider font-bold ${
                        preset.category === 'poll'
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                      }`}
                    >
                      {preset.date || preset.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                {/* Swings summary breakdown tags */}
                <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-white/5">
                  {SLIDER_PARTIES.filter((p) => Math.abs(decoded.global[p] || 0) >= 0.1).map(
                    (p) => {
                      const val = decoded.global[p] || 0;
                      const party = PARTIES[p];
                      return (
                        <span
                          key={p}
                          className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/40 text-slate-300 flex items-center gap-1 border border-white/5"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: party.color }}
                          />
                          <span>
                            {p} {val > 0 ? '+' : ''}
                            {val.toFixed(1)}%
                          </span>
                        </span>
                      );
                    }
                  )}
                </div>

                {/* Footer status / Copy helper */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className={isActive ? 'text-amber-400 font-semibold' : 'group-hover:text-slate-300'}>
                    {isActive ? '✓ Active on Simulator' : 'Click to apply'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const snippet = `createPartyWavePreset({\n  id: '${preset.id}_copy',\n  name: '${preset.name}',\n  category: '${preset.category}',\n  description: '${preset.description}',\n  exportString: '${preset.exportString}',\n})`;
                      navigator.clipboard.writeText(snippet);
                      setCopiedSnippetId(preset.id);
                      setTimeout(() => setCopiedSnippetId(null), 2000);
                    }}
                    title="Copy preset template code for codebase"
                    className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-white/10 transition-colors"
                  >
                    {isCopied ? (
                      <Check size={11} className="text-green-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
