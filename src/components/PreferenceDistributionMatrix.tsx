import React, { useState } from 'react';
import {
  PartyGroup,
  PartyTransferFlow,
  getPartyColor,
  getPartyLabel,
  getPartyCode,
} from '../utils/preferenceEngine';
import { PREFERENCE_DATA } from '../preferenceData';
import {
  ChevronDown,
  ChevronUp,
  Table,
  CheckCircle2,
  Info,
  Sliders,
  Database,
} from 'lucide-react';

export type PreferenceSourceType = 'USER_OVERRIDE' | 'VEC_OFFICIAL' | 'AEC_BENCHMARK' | 'MODEL_AVERAGE';

export const PARTY_TO_FLOW_KEY: Record<PartyGroup, keyof PartyTransferFlow> = {
  ALP: 'toALP',
  COALITION: 'toCoalition',
  GRN: 'toGreens',
  ON: 'toOneNation',
  OTH: 'toOther',
};

export const PARTIES_LIST: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];

interface PreferenceDistributionMatrixProps {
  scopeId: string | null;
  scopeTitle: string;
  currentTransferFlows: Record<PartyGroup, PartyTransferFlow>;
  baselineTransferFlows: Record<PartyGroup, PartyTransferFlow>;
  transferOverrides: Partial<Record<PartyGroup, Partial<PartyTransferFlow>>>;
  activeFlows: Set<string>;
  isOneNationActive: boolean;
  onResetTransferFlow?: (fromParty: PartyGroup, toParty: PartyGroup) => void;
}

export const PreferenceDistributionMatrix: React.FC<PreferenceDistributionMatrixProps> = ({
  scopeId,
  scopeTitle,
  currentTransferFlows,
  baselineTransferFlows,
  transferOverrides,
  activeFlows,
  isOneNationActive,
  onResetTransferFlow,
}) => {
  // Defaulted to showing: isOpen: true
  const [isOpen, setIsOpen] = useState(true);

  // Helper to determine the provenance data source of each cell
  const getCellProvenance = (fromParty: PartyGroup, toParty: PartyGroup): {
    source: PreferenceSourceType;
    sourceLabel: string;
    isOverridden: boolean;
    baselineVal: number;
    currentVal: number;
    isActiveInSankey: boolean;
  } => {
    const flowKey = PARTY_TO_FLOW_KEY[toParty];
    const isExplicitOverride = Boolean(
      transferOverrides &&
      transferOverrides[fromParty] &&
      transferOverrides[fromParty]![flowKey] !== undefined
    );
    const baselineVal = baselineTransferFlows[fromParty]?.[flowKey] ?? 0;
    const currentVal = currentTransferFlows[fromParty]?.[flowKey] ?? baselineVal;
    const isValueDifferent = Math.abs(currentVal - baselineVal) > 0.05;
    const isOverridden = isExplicitOverride || isValueDifferent;
    const isActiveInSankey = activeFlows.has(`${fromParty}->${toParty}`);

    if (isOverridden) {
      return {
        source: 'USER_OVERRIDE',
        sourceLabel: 'User Override',
        isOverridden: true,
        baselineVal,
        currentVal,
        isActiveInSankey,
      };
    }

    // Single Electorate Scope
    if (scopeId && PREFERENCE_DATA[scopeId]) {
      const seat = PREFERENCE_DATA[scopeId];
      if (seat.hasOfficialDistribution) {
        // One Nation was not present on the ballot in many 2022 seats;
        // In these seats without 2022 ON candidates, One Nation flows are derived from AEC Victorian Senate benchmarks
        if (fromParty === 'ON' || toParty === 'ON') {
          const seatHadON = (seat.primaryVotes.ON || 0) > 0;
          const seatHadONTransfers =
            (seat.transferFlows[fromParty]?.toOneNation || 0) > 0.5 ||
            (fromParty === 'ON' &&
              ((seat.transferFlows.ON?.toALP || 0) > 0 || (seat.transferFlows.ON?.toCoalition || 0) > 0));

          if (seatHadON && seatHadONTransfers) {
            return {
              source: 'VEC_OFFICIAL',
              sourceLabel: 'VEC 2022 Count',
              isOverridden: false,
              baselineVal,
              currentVal,
              isActiveInSankey,
            };
          } else {
            return {
              source: 'AEC_BENCHMARK',
              sourceLabel: 'AEC Senate Benchmark',
              isOverridden: false,
              baselineVal,
              currentVal,
              isActiveInSankey,
            };
          }
        }

        return {
          source: 'VEC_OFFICIAL',
          sourceLabel: 'VEC 2022 Count',
          isOverridden: false,
          baselineVal,
          currentVal,
          isActiveInSankey,
        };
      }
    }

    // If One Nation is active in regional/statewide model and AEC benchmark is applied
    if (fromParty === 'ON' || toParty === 'ON') {
      return {
        source: 'AEC_BENCHMARK',
        sourceLabel: 'AEC Senate Benchmark',
        isOverridden: false,
        baselineVal,
        currentVal,
        isActiveInSankey,
      };
    }

    return {
      source: 'MODEL_AVERAGE',
      sourceLabel: 'Regional / State Average',
      isOverridden: false,
      baselineVal,
      currentVal,
      isActiveInSankey,
    };
  };

  // Compute counts for the legend summary
  let vecCount = 0;
  let aecCount = 0;
  let modelCount = 0;
  let overrideCount = 0;

  PARTIES_LIST.forEach(from => {
    PARTIES_LIST.forEach(to => {
      if (from !== to) {
        const info = getCellProvenance(from, to);
        if (info.isOverridden) overrideCount++;
        else if (info.source === 'VEC_OFFICIAL') vecCount++;
        else if (info.source === 'AEC_BENCHMARK') aecCount++;
        else modelCount++;
      }
    });
  });

  const isSingleSeat = Boolean(scopeId && PREFERENCE_DATA[scopeId]);
  const seatData = isSingleSeat ? PREFERENCE_DATA[scopeId!] : null;

  return (
    <div className="rounded-lg bg-black/40 border border-white/10 overflow-hidden text-xs font-sans">
      {/* Collapsible Header Accordion Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer border-b border-transparent data-[open=true]:border-white/10 select-none"
        data-open={isOpen}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="p-1 rounded bg-amber-500/20 text-amber-400">
            <Table size={15} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-xs tracking-wide">
                Preference Distribution Matrix
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-white/10 text-slate-300 border border-white/10">
                {scopeTitle}
              </span>
              {isSingleSeat && seatData?.hasOfficialDistribution && (
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#800020]/40 text-rose-200 border border-[#be123c]/50 flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  Official 2022 VEC Distribution
                </span>
              )}
              {overrideCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-500/25 text-amber-300 border border-amber-400/60 flex items-center gap-1">
                  <Sliders size={10} />
                  {overrideCount} Overridden {overrideCount === 1 ? 'Flow' : 'Flows'}
                </span>
              )}
            </div>
            <span className="text-[10.5px] text-slate-400 mt-0.5">
              Full cross-party preference flow matrix &bull; Click any box to reset that flow to its baseline
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <span className="text-[11px] font-medium hidden sm:inline">
            {isOpen ? 'Collapse Matrix' : 'Expand Matrix'}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Accordion Content Panel */}
      {isOpen && (
        <div className="p-3 sm:p-4 flex flex-col gap-4 bg-slate-950/30 animate-fadeIn">
          {/* Data Sources Legend Bar */}
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database size={11} className="text-slate-400" />
                Data Source Legend & Provenance
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeFlows.size} active {activeFlows.size === 1 ? 'flow' : 'flows'} in current elimination
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              {/* VEC Official -> Maroon */}
              <div className="flex items-center gap-2 p-1.5 rounded bg-[#4a0e17]/80 border border-[#9e2a3b]/70">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e11d48] shrink-0 shadow-sm" />
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="font-bold text-rose-100 truncate">VEC Official (Maroon)</span>
                  <span className="text-[9.5px] text-rose-300/80 truncate">2022 Election Count ({vecCount})</span>
                </div>
              </div>

              {/* AEC Benchmark -> Purple */}
              <div className="flex items-center gap-2 p-1.5 rounded bg-[#3b0764]/80 border border-[#9333ea]/70">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c084fc] shrink-0 shadow-sm" />
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="font-bold text-purple-100 truncate">AEC Data (Purple)</span>
                  <span className="text-[9.5px] text-purple-300/80 truncate">Vic Senate Benchmark ({aecCount})</span>
                </div>
              </div>

              {/* Model Average -> Slate */}
              <div className="flex items-center gap-2 p-1.5 rounded bg-slate-800/50 border border-slate-700/60">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0 shadow-sm" />
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="font-bold text-slate-300 truncate">Model Baseline</span>
                  <span className="text-[9.5px] text-slate-400 truncate">Regional / State Avg ({modelCount})</span>
                </div>
              </div>

              {/* Manual Override -> Amber */}
              <div className="flex items-center gap-2 p-1.5 rounded bg-amber-500/20 border border-amber-400/80">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-sm" />
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="font-bold text-amber-200 truncate">User Override (Amber)</span>
                  <span className="text-[9.5px] text-amber-300/80 truncate">Manual Custom Edit ({overrideCount})</span>
                </div>
              </div>
            </div>

            {/* Active Flow Indicator explanation (Without pulsing dot, with bold white ring border) */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/5 text-[10.5px] text-slate-300">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-slate-800 border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                White Border
              </span>
              <span>Indicates flow is actively distributing votes in the current Sankey elimination rounds.</span>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-white/10">
                  <th className="p-2.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 min-w-[120px]">
                    Excluded Party \ Recipient
                  </th>
                  {PARTIES_LIST.map(toParty => (
                    <th key={toParty} className="p-2 text-center min-w-[85px] border-l border-white/10">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getPartyColor(toParty) }}
                          />
                          <span className="font-bold text-white text-[11px]">
                            {getPartyCode(toParty)}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-normal truncate max-w-[80px]">
                          {getPartyLabel(toParty)}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PARTIES_LIST.map(fromParty => (
                  <tr key={fromParty} className="hover:bg-white/[0.02] transition-colors">
                    {/* Row Header (Excluded Party) */}
                    <td className="p-2.5 bg-slate-900/70 font-medium border-r border-white/10">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: getPartyColor(fromParty) }}
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-[11px] flex items-center gap-1">
                            {getPartyLabel(fromParty)}
                            <span className="text-[9px] font-normal text-slate-400 font-mono">
                              ({getPartyCode(fromParty)})
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Matrix Cells */}
                    {PARTIES_LIST.map(toParty => {
                      if (fromParty === toParty) {
                        return (
                          <td
                            key={toParty}
                            className="p-2 text-center border-l border-white/5 bg-black/30 text-slate-600 font-mono select-none"
                            title="Same party: votes do not transfer to oneself"
                          >
                            —
                          </td>
                        );
                      }

                      const cellInfo = getCellProvenance(fromParty, toParty);

                      // Style determination based on provenance
                      let cellBg = '';
                      let cellTextColor = '';
                      let cellBorderColor = '';

                      if (cellInfo.isOverridden) {
                        // Amber override
                        cellBg = 'bg-amber-600/30';
                        cellBorderColor = 'border-amber-400/80';
                        cellTextColor = 'text-amber-200';
                      } else if (cellInfo.source === 'VEC_OFFICIAL') {
                        // Maroon for VEC Official
                        cellBg = 'bg-[#5B0E1E]/80';
                        cellBorderColor = 'border-[#9E2A3B]/80';
                        cellTextColor = 'text-rose-100';
                      } else if (cellInfo.source === 'AEC_BENCHMARK') {
                        // Purple for AEC Data
                        cellBg = 'bg-[#3B0764]/80';
                        cellBorderColor = 'border-[#9333EA]/70';
                        cellTextColor = 'text-purple-100';
                      } else {
                        // Model average (Slate)
                        cellBg = 'bg-slate-800/40';
                        cellBorderColor = 'border-slate-700/50';
                        cellTextColor = 'text-slate-300';
                      }

                      // High-visibility box shadow that handles both active flow border and user override border cleanly
                      let cellBoxShadow: string | undefined = undefined;
                      if (cellInfo.isActiveInSankey && cellInfo.isOverridden) {
                        // Bold white border on the outer edge + amber indicator inside
                        cellBoxShadow = 'inset 0 0 0 2.5px #FFFFFF, inset 0 0 0 4.5px #F59E0B, 0 0 12px rgba(255, 255, 255, 0.45)';
                      } else if (cellInfo.isActiveInSankey) {
                        // Bold crisp white border for active flows in Sankey
                        cellBoxShadow = 'inset 0 0 0 2.5px #FFFFFF, 0 0 12px rgba(255, 255, 255, 0.45)';
                      } else if (cellInfo.isOverridden) {
                        // Crisp amber border for user overrides
                        cellBoxShadow = 'inset 0 0 0 2px #F59E0B, 0 0 8px rgba(245, 158, 11, 0.3)';
                      }

                      const tooltipText = cellInfo.isOverridden
                        ? `Overridden at ${cellInfo.currentVal.toFixed(1)}%. Click to reset ${getPartyLabel(fromParty)} → ${getPartyLabel(toParty)} to baseline (${cellInfo.baselineVal.toFixed(1)}%).`
                        : `${getPartyLabel(fromParty)} → ${getPartyLabel(toParty)}: ${cellInfo.currentVal.toFixed(1)}% (${cellInfo.sourceLabel}). Click to reset/ensure default flow.`;

                      return (
                        <td
                          key={toParty}
                          onClick={() => onResetTransferFlow?.(fromParty, toParty)}
                          title={tooltipText}
                          className={`p-2 text-center border-l border-white/5 transition-all relative cursor-pointer select-none group ${cellBg} ${cellBorderColor} ${cellTextColor} ${
                            cellInfo.isActiveInSankey ? 'z-10' : ''
                          } hover:brightness-125 active:scale-95`}
                          style={{
                            boxShadow: cellBoxShadow,
                          }}
                        >
                          <div className="flex flex-col items-center justify-center gap-0.5">
                            {/* Transfer Percentage */}
                            <div className="font-mono tabular-nums font-bold text-xs flex items-center justify-center gap-0.5">
                              <span>{cellInfo.currentVal.toFixed(1)}%</span>
                              {cellInfo.isOverridden && (
                                <span
                                  className="text-[9px] text-amber-300 opacity-75 group-hover:opacity-100 transition-opacity"
                                  title="Click to reset"
                                >
                                  ↺
                                </span>
                              )}
                            </div>

                            {/* Baseline footnote or source badge */}
                            {cellInfo.isOverridden ? (
                              <span className="text-[9px] font-mono text-amber-300 font-semibold tracking-tight group-hover:underline">
                                Base: {cellInfo.baselineVal.toFixed(1)}%
                              </span>
                            ) : (
                              <span className="text-[8.5px] uppercase tracking-wider opacity-80 font-mono group-hover:opacity-100">
                                {cellInfo.source === 'VEC_OFFICIAL'
                                  ? 'VEC'
                                  : cellInfo.source === 'AEC_BENCHMARK'
                                  ? 'AEC'
                                  : 'AVG'}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Educational Note */}
          <div className="flex items-start gap-2 p-2.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10.5px] leading-relaxed">
            <Info size={13} className="shrink-0 mt-0.5 text-slate-400" />
            <span>
              <strong>Note on Preferential Re-allocation:</strong> Each row sums to 100% of the excluded party&apos;s baseline transfer distribution. In Victorian preferential counts, when an excluded candidate&apos;s votes flow to a party that has already been eliminated in an earlier round, those preferences are automatically re-apportioned to continuing candidates in accordance with the full preferential voting rules.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
