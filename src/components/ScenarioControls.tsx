/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { SCENARIO_PRESETS, PartyCode, Electorate, REGIONS } from '../data';
import { Sliders, GitFork, RotateCcw, BarChart3, SlidersHorizontal, Check } from 'lucide-react';
import { PreferenceSankey } from './PreferenceSankey';
import { PartySwingBar, PartySwings } from './PartySwingBar';
import { PartyGroup, PreferenceModelDeltas } from '../utils/preferenceEngine';
import { SerializedPartySwingsState } from '../utils/partySwingsString';
import { SectionHeaderActions } from './SectionHeaderActions';
import { GuideTab } from './UserGuideModal';

export type SimulatorTab = 'preference_flow' | 'party_swing' | 'swing_pad';

interface ScenarioControlsProps {
  // Simulator mode tab
  activeSimulatorTab: SimulatorTab;
  onChangeSimulatorTab: (tab: SimulatorTab) => void;
  onOpenGuide?: (tab: GuideTab) => void;

  // Swing pad props
  coalitionSwing: number;
  setCoalitionSwing: (swing: number) => void;
  greensSwing: number;
  setGreensSwing: (swing: number) => void;
  oneNationSwing: number;
  setOneNationSwing: (swing: number) => void;
  activePresetId: string;
  onApplyPreset: (presetId: string) => void;
  customOverridesCount: number;
  onClearOverrides: () => void;
  electorates: (Electorate & { currentParty: PartyCode; margin: number })[];
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string | null) => void;

  // Preference flow props
  preferenceDeltas: PreferenceModelDeltas;
  onUpdatePrimaryDelta: (party: PartyGroup, deltaPct: number) => void;
  onBatchUpdatePrimaryDeltas?: (deltas: Partial<Record<PartyGroup, number>>) => void;
  onUpdateTransferFlow: (fromParty: PartyGroup, toParty: PartyGroup, newPct: number) => void;
  onResetPreferenceDeltas: () => void;
  selectedSeatId: string | null;
  onClearSeatSelection?: () => void;

  // Party Swing Slider props (replaces demographics)
  partySwings: PartySwings;
  onUpdatePartySwings: (swings: PartySwings) => void;
  onResetPartySwings: () => void;
  onApplyPartySwingsPresetState?: (state: SerializedPartySwingsState) => void;
  onLoadPartySwingsIntoPreferenceFlow?: () => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({
  activeSimulatorTab,
  onChangeSimulatorTab,
  coalitionSwing,
  setCoalitionSwing,
  greensSwing,
  setGreensSwing,
  oneNationSwing,
  setOneNationSwing,
  activePresetId,
  onApplyPreset,
  customOverridesCount,
  onClearOverrides,
  electorates,
  selectedRegionId,
  onSelectRegion,
  preferenceDeltas,
  onUpdatePrimaryDelta,
  onBatchUpdatePrimaryDeltas,
  onUpdateTransferFlow,
  onResetPreferenceDeltas,
  selectedSeatId,
  onClearSeatSelection,
  partySwings,
  onUpdatePartySwings,
  onResetPartySwings,
  onApplyPartySwingsPresetState,
  onLoadPartySwingsIntoPreferenceFlow,
  onOpenGuide,
}) => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // Vertices of the triangle in SVG viewport space
  const xL = 25, yL = 135;  // ALP (Labor)
  const xR = 215, yR = 135; // LIB/NAT (Coalition)
  const xT = 120, yT = 20;  // ON (One Nation)

  // Calculate coordinates (x, y) of current point in triangle
  const currentCoords = useMemo(() => {
    const wT = Math.max(0, Math.min(1, oneNationSwing / 20));
    const C = coalitionSwing / 20;
    let wR = (1 - wT + C) / 2;
    let wL = (1 - wT - C) / 2;
    
    wL = Math.max(0, Math.min(1, wL));
    wR = Math.max(0, Math.min(1, wR));
    const sum = wL + wR + wT;
    const normL = sum > 0 ? wL / sum : 0.5;
    const normR = sum > 0 ? wR / sum : 0.5;
    const normT = sum > 0 ? wT / sum : 0;

    const x = normL * xL + normR * xR + normT * xT;
    const y = normL * yL + normR * yR + normT * yT;

    return { x, y };
  }, [coalitionSwing, oneNationSwing]);

  // Handler to compute and update swings from interactive SVG coordinates
  const updateSwingsFromCoords = (clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * 240;
    const py = ((clientY - rect.top) / rect.height) * 160;

    const det = (yR - yT) * (xL - xT) + (xT - xR) * (yL - yT);
    let wL = ((yR - yT) * (px - xT) + (xT - xR) * (py - yT)) / det;
    let wR = ((yT - yL) * (px - xT) + (xL - xT) * (py - yT)) / det;
    
    wL = Math.max(0, Math.min(1, wL));
    wR = Math.max(0, Math.min(1, wR));
    let wT = 1 - wL - wR;
    if (wT < 0) {
      wT = 0;
      const sum = wL + wR;
      if (sum > 0) {
        wL /= sum;
        wR /= sum;
      } else {
        wL = 0.5;
        wR = 0.5;
      }
    }

    const calculatedCoalitionSwing = (wR - wL) * 20;
    const calculatedOneNationSwing = wT * 20;

    setCoalitionSwing(Number(calculatedCoalitionSwing.toFixed(1)));
    setOneNationSwing(Number(calculatedOneNationSwing.toFixed(1)));
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    updateSwingsFromCoords(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    setIsDragging(true);
    if (e.touches[0]) {
      updateSwingsFromCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateSwingsFromCoords(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  React.useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateSwingsFromCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Determine scope title for preference simulator
  const scopeTitle = useMemo(() => {
    if (selectedSeatId) {
      const seat = electorates.find(e => e.id === selectedSeatId);
      if (seat) return `${seat.name} District`;
    }
    if (selectedRegionId) {
      return `${REGIONS[selectedRegionId]?.name || selectedRegionId} Region`;
    }
    return 'Victoria (Statewide - 88 Districts)';
  }, [selectedSeatId, selectedRegionId, electorates]);

  const activeScopeId = selectedSeatId || selectedRegionId || null;
  const [transferBanner, setTransferBanner] = React.useState<string | null>(null);

  const handleLoadPartySwingsIntoPreferenceFlow = () => {
    if (onLoadPartySwingsIntoPreferenceFlow) {
      onLoadPartySwingsIntoPreferenceFlow();
    } else {
      const libSwing = partySwings.LIB || 0;
      const natSwing = partySwings.NAT || 0;
      const coalSwing =
        natSwing === 0
          ? libSwing
          : libSwing === 0
          ? natSwing
          : Number(((libSwing * 29.8 + natSwing * 4.7) / 34.5).toFixed(1));

      const deltas: Partial<Record<PartyGroup, number>> = {
        ALP: partySwings.ALP || 0,
        COALITION: coalSwing,
        GRN: partySwings.GRN || 0,
        ON: partySwings.ON || 0,
        OTH: partySwings.IND || 0,
      };
      if (onBatchUpdatePrimaryDeltas) {
        onBatchUpdatePrimaryDeltas(deltas);
      }
      onChangeSimulatorTab('preference_flow');
    }

    setTransferBanner('Party swings successfully loaded into Preference Flow!');
    setTimeout(() => setTransferBanner(null), 3500);
  };

  const activeSectionInfo = useMemo(() => {
    if (activeSimulatorTab === 'preference_flow') {
      return {
        title: 'Preference Flow Simulator',
        guideTab: 'preference_flow' as GuideTab,
      };
    }
    if (activeSimulatorTab === 'party_swing') {
      return {
        title: 'Party Primary Swings',
        guideTab: 'party_swing' as GuideTab,
      };
    }
    return {
      title: 'Three-Way Regional Swing Pad',
      guideTab: 'swing_pad' as GuideTab,
    };
  }, [activeSimulatorTab]);

  return (
    <div id="section-scenario-controls" className="flex flex-col h-full bg-card rounded-lg border-subtle p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="serif text-white italic text-xl">
            {activeSimulatorTab === 'preference_flow'
              ? 'Preference Flow Simulator'
              : activeSimulatorTab === 'party_swing'
              ? 'Party Primary Swings'
              : 'Scenario & Electoral Simulator'}
          </h3>
        </div>
        {onOpenGuide && (
          <SectionHeaderActions
            elementId="section-scenario-controls"
            sectionTitle={activeSectionInfo.title}
            guideTab={activeSectionInfo.guideTab}
            onOpenGuide={onOpenGuide}
          />
        )}
      </div>

      {/* Transfer Success Banner */}
      {transferBanner && (
        <div className="flex items-center gap-2 p-2.5 mb-4 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold animate-fadeIn shadow-sm">
          <Check size={14} className="text-emerald-400 shrink-0" />
          <span>{transferBanner}</span>
        </div>
      )}

      {/* Simulator Mode Tabs: Preference Flow | Party Swings | 3-Way Swing */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg border border-white/10 mb-5">
        <button
          id="tab-preference-flow"
          onClick={() => onChangeSimulatorTab('preference_flow')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs font-semibold transition-all cursor-pointer ${
            activeSimulatorTab === 'preference_flow'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
          title="Preference Flow Simulator"
        >
          <GitFork size={13} className="shrink-0" />
          <span className="truncate">Pref Flow</span>
        </button>

        <button
          id="tab-party-swings"
          onClick={() => onChangeSimulatorTab('party_swing')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs font-semibold transition-all cursor-pointer ${
            activeSimulatorTab === 'party_swing'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
          title="Interactive Party Swing Progress Bar Slider"
        >
          <SlidersHorizontal size={13} className="shrink-0" />
          <span className="truncate">Party Swings</span>
        </button>

        <button
          id="tab-swing-pad"
          onClick={() => onChangeSimulatorTab('swing_pad')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs font-semibold transition-all cursor-pointer ${
            activeSimulatorTab === 'swing_pad'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
          title="Three-Way Swing Pad"
        >
          <Sliders size={13} className="shrink-0" />
          <span className="truncate">3-Way Swing</span>
        </button>
      </div>

      {/* REGION / SEAT EDITING INDICATOR */}
      {selectedSeatId ? (
        <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-sans">
          <div className="flex items-center gap-2 truncate mr-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shrink-0" />
            <span className="truncate">
              Targeting Seat: <strong>{electorates.find(e => e.id === selectedSeatId)?.name || selectedSeatId}</strong>
            </span>
          </div>
          {onClearSeatSelection && (
            <button
              onClick={onClearSeatSelection}
              id="clear-seat-filter-btn-controls"
              className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 font-bold px-2 py-0.5 rounded transition-all cursor-pointer shrink-0"
            >
              Clear Seat Selection
            </button>
          )}
        </div>
      ) : selectedRegionId ? (
        <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            <span>
              Targeting Region: <strong>{REGIONS[selectedRegionId]?.name}</strong>
            </span>
          </div>
          <button
            onClick={() => onSelectRegion(null)}
            className="text-[10px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-2 py-0.5 rounded transition-all cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      ) : null}

      {/* TAB 1 CONTENT: PREFERENCE FLOW SIMULATOR */}
      {activeSimulatorTab === 'preference_flow' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <PreferenceSankey
            scopeId={activeScopeId}
            scopeTitle={scopeTitle}
            preferenceDeltas={preferenceDeltas}
            onUpdatePrimaryDelta={onUpdatePrimaryDelta}
            onBatchUpdatePrimaryDeltas={onBatchUpdatePrimaryDeltas}
            onUpdateTransferFlow={onUpdateTransferFlow}
            onResetDeltas={onResetPreferenceDeltas}
            onClearScope={
              selectedSeatId && onClearSeatSelection
                ? onClearSeatSelection
                : selectedRegionId
                ? () => onSelectRegion(null)
                : undefined
            }
          />
        </div>
      )}

      {/* TAB 2 CONTENT: PARTY SWING SLIDER (Replaces Demographics) */}
      {activeSimulatorTab === 'party_swing' && (
        <PartySwingBar
          currentSwings={partySwings}
          onUpdateSwings={onUpdatePartySwings}
          onResetSwings={onResetPartySwings}
          selectedSeatId={selectedSeatId}
          selectedRegionId={selectedRegionId}
          electorates={electorates}
          onClearScope={
            selectedSeatId && onClearSeatSelection
              ? onClearSeatSelection
              : selectedRegionId
              ? () => onSelectRegion(null)
              : undefined
          }
          onApplyPresetState={onApplyPartySwingsPresetState}
          onLoadIntoPreferenceFlow={handleLoadPartySwingsIntoPreferenceFlow}
        />
      )}

      {/* TAB 3 CONTENT: THREE-WAY SWING PAD */}
      {activeSimulatorTab === 'swing_pad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
          {/* THREE-WAY PARTISAN SWING PAD */}
          <div className="flex flex-col justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold text-slate-400">
                  Three-Way Partisan Swing Pad
                </span>
                <span className="text-[10px] text-slate-400 leading-normal">
                  Drag the cursor inside the triangle to balance swings.
                </span>
              </div>
              {(coalitionSwing !== 0 || oneNationSwing !== 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setCoalitionSwing(0);
                    setOneNationSwing(0);
                  }}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
                  title="Reset swing pad to 2PP baseline"
                >
                  <RotateCcw size={10} />
                  <span>Center (0%)</span>
                </button>
              )}
            </div>

            <div className="flex justify-center my-1 select-none">
              <svg
                ref={svgRef}
                viewBox="0 0 240 160"
                className="w-full max-w-[260px] h-auto bg-black/30 border border-white/10 rounded-md cursor-crosshair touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Grid division lines from barycenter */}
                <line x1="120" y1="96.6" x2="25" y2="135" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="120" y1="96.6" x2="215" y2="135" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="120" y1="96.6" x2="120" y2="20" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="2 2" />

                {/* Main political territory triangle */}
                <polygon
                  points="25,135 215,135 120,20"
                  fill="rgba(255, 255, 255, 0.02)"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.5"
                />

                {/* Corner Hotspots */}
                <circle cx="25" cy="135" r="4" fill="#E61E2B" className="animate-pulse" />
                <text x="12" y="151" fill="#E61E2B" fontSize="8" fontWeight="bold" textAnchor="start" className="font-sans">
                  Labor (+20%)
                </text>

                <circle cx="215" cy="135" r="4" fill="#0047AB" className="animate-pulse" />
                <text x="228" y="151" fill="#60A5FA" fontSize="8" fontWeight="bold" textAnchor="end" className="font-sans">
                  Coalition (+20%)
                </text>

                <circle cx="120" cy="20" r="4" fill="#FF6600" className="animate-pulse" />
                <text x="120" y="12" fill="#FF6600" fontSize="8" fontWeight="bold" textAnchor="middle" className="font-sans">
                  One Nation (+20%)
                </text>

                {/* Interactive Draggable Handle cursor */}
                <g>
                  <circle
                    cx={currentCoords.x}
                    cy={currentCoords.y}
                    r="8"
                    fill="none"
                    stroke={oneNationSwing > 5 ? '#FF6600' : coalitionSwing > 2 ? '#0047AB' : coalitionSwing < -2 ? '#E61E2B' : '#ffffff'}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  <circle
                    cx={currentCoords.x}
                    cy={currentCoords.y}
                    r="4.5"
                    fill={oneNationSwing > 5 ? '#FF6600' : coalitionSwing > 2 ? '#0047AB' : coalitionSwing < -2 ? '#E61E2B' : '#ffffff'}
                  />
                </g>
              </svg>
            </div>

            {/* Swing readout details */}
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center bg-white/5 p-2 rounded border border-white/5">
              <div className="flex flex-col">
                <span className="text-red-400 font-bold">Labor</span>
                <span className="text-white mt-0.5">
                  {coalitionSwing < 0 ? `+${Math.abs(coalitionSwing).toFixed(1)}%` : '0.0%'}
                </span>
              </div>
              <div className="flex flex-col border-x border-white/10">
                <span className="text-blue-400 font-bold">Coalition</span>
                <span className="text-white mt-0.5">
                  {coalitionSwing > 0 ? `+${coalitionSwing.toFixed(1)}%` : '0.0%'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-orange-400 font-bold">One Nation</span>
                <span className="text-white mt-0.5">
                  {oneNationSwing > 0 ? `+${oneNationSwing.toFixed(1)}%` : '0.0%'}
                </span>
              </div>
            </div>
          </div>

          {/* SCENARIO PRESETS */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider opacity-50 block font-bold text-slate-400">
              Quick Scenarios
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SCENARIO_PRESETS.map(preset => {
                const isActive = activePresetId === preset.id;
                const overridesCount = preset.codeString ? preset.codeString.replace(/\./g, '').length : 0;
                return (
                  <button
                    key={preset.id}
                    id={`preset-btn-${preset.id}`}
                    onClick={() => onApplyPreset(preset.id)}
                    title={preset.description}
                    className={`text-left p-2.5 rounded border text-xs font-sans transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-white/5 border-amber-500/40 text-amber-400 ring-1 ring-amber-500/20'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold truncate">{preset.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center justify-between">
                      <span>
                        {preset.coalitionSwing ? `Coal: ${preset.coalitionSwing > 0 ? '+' : ''}${preset.coalitionSwing}%` : ''}
                        {preset.greensSwing ? ` Grn: +${preset.greensSwing}%` : ''}
                        {!preset.coalitionSwing && !preset.greensSwing ? '2PP Baseline' : ''}
                      </span>
                      {overridesCount > 0 && (
                        <span className="text-[9px] bg-amber-500/10 text-amber-400/90 px-1 rounded font-bold">
                          {overridesCount} seat{overridesCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
