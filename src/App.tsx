/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, ChangeEvent } from 'react';
import { ELECTORATES_DATA, calculateSimulatedWinner, PartyCode, PARTIES, SCENARIO_PRESETS } from './data';
import { ElectorateMap } from './components/ElectorateMap';
import { ParliamentHemicycle } from './components/ParliamentHemicycle';
import { ScenarioControls } from './components/ScenarioControls';
import { ElectorateDetail } from './components/ElectorateDetail';
import { ElectorateList } from './components/ElectorateList';
import { Vote, RefreshCw, Layers, Vote as VoteIcon, Info, X, Copy, Check, Download, Upload, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { encodeOverrides, decodeOverrides, getAlphabeticalElectorates, PARTY_TO_CHAR } from './utils/overridesString';
import {
  PartyGroup,
  PreferenceModelDeltas,
  INITIAL_PREFERENCE_DELTAS,
  simulateElectorateWithPreferences,
} from './utils/preferenceEngine';

export default function App() {
  // 0. SIMULATION MODE (TAB CONTROL) - Defaults to preference flow simulator
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<'swing_pad' | 'preference_flow'>('preference_flow');

  // 1. STATE MANAGEMENT - SWING PAD
  const [coalitionSwing, setCoalitionSwing] = useState<number>(0);
  const [greensSwing, setGreensSwing] = useState<number>(0);
  const [oneNationSwing, setOneNationSwing] = useState<number>(0);
  const [customOverrides, setCustomOverrides] = useState<Record<string, PartyCode>>({});
  const [activePresetId, setActivePresetId] = useState<string>('actual_2022');
  
  // Region Selection states
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [regionalCoalitionSwings, setRegionalCoalitionSwings] = useState<Record<string, number>>({});
  const [regionalGreensSwings, setRegionalGreensSwings] = useState<Record<string, number>>({});
  const [regionalOneNationSwings, setRegionalOneNationSwings] = useState<Record<string, number>>({});

  // 1b. STATE MANAGEMENT - PREFERENCE FLOW SIMULATOR
  const [globalPreferenceDeltas, setGlobalPreferenceDeltas] = useState<PreferenceModelDeltas>(INITIAL_PREFERENCE_DELTAS);
  const [regionalPreferenceDeltas, setRegionalPreferenceDeltas] = useState<Record<string, PreferenceModelDeltas>>({});
  const [seatPreferenceDeltas, setSeatPreferenceDeltas] = useState<Record<string, PreferenceModelDeltas>>({});

  // Selection & Hover syncing states
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [paintBrushParty, setPaintBrushParty] = useState<PartyCode | null>(null);

  // Import/Export custom seat overrides states
  const [importStringInput, setImportStringInput] = useState<string>('');
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);
  const [copiedSnippetFeedback, setCopiedSnippetFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAlphabeticalGuide, setShowAlphabeticalGuide] = useState<boolean>(false);

  // 2. DYNAMIC COMPUTATION OF STATE
  const simulatedElectorates = useMemo(() => {
    return ELECTORATES_DATA.map((e) => {
      if (activeSimulatorTab === 'preference_flow') {
        const { party, margin } = simulateElectorateWithPreferences(
          e,
          globalPreferenceDeltas,
          regionalPreferenceDeltas,
          seatPreferenceDeltas,
          customOverrides
        );
        return {
          ...e,
          currentParty: party,
          margin,
        };
      } else {
        // Apply region-specific swing if present, otherwise fall back to global swing
        const cSwing = regionalCoalitionSwings[e.region] !== undefined ? regionalCoalitionSwings[e.region] : coalitionSwing;
        const gSwing = regionalGreensSwings[e.region] !== undefined ? regionalGreensSwings[e.region] : greensSwing;
        const oSwing = regionalOneNationSwings[e.region] !== undefined ? regionalOneNationSwings[e.region] : oneNationSwing;

        const { party, margin } = calculateSimulatedWinner(
          e,
          cSwing,
          gSwing,
          oSwing,
          customOverrides
        );
        return {
          ...e,
          currentParty: party,
          margin,
        };
      }
    });
  }, [
    activeSimulatorTab,
    coalitionSwing,
    greensSwing,
    oneNationSwing,
    customOverrides,
    regionalCoalitionSwings,
    regionalGreensSwings,
    regionalOneNationSwings,
    globalPreferenceDeltas,
    regionalPreferenceDeltas,
    seatPreferenceDeltas,
  ]);

  const selectedElectorate = useMemo(() => {
    if (!selectedId) return null;
    return simulatedElectorates.find((e) => e.id === selectedId) || null;
  }, [selectedId, simulatedElectorates]);

  // 3. HANDLERS

  // Reset function
  const handleResetAll = () => {
    setCoalitionSwing(0);
    setGreensSwing(0);
    setOneNationSwing(0);
    setCustomOverrides({});
    setRegionalCoalitionSwings({});
    setRegionalGreensSwings({});
    setRegionalOneNationSwings({});
    setSelectedRegionId(null);
    setActivePresetId('actual_2022');
    setSelectedId(null);
    setPaintBrushParty(null);
    setGlobalPreferenceDeltas(INITIAL_PREFERENCE_DELTAS);
    setRegionalPreferenceDeltas({});
    setSeatPreferenceDeltas({});
  };

  // User Directive 3: "changing the tab should reset the model"
  const handleTabChange = (newTab: 'swing_pad' | 'preference_flow') => {
    if (newTab !== activeSimulatorTab) {
      handleResetAll();
      setActiveSimulatorTab(newTab);
    }
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(presetId);
    setCoalitionSwing(preset.coalitionSwing ?? 0);
    setGreensSwing(preset.greensSwing ?? 0);
    setOneNationSwing(preset.oneNationSwing ?? 0);
    setCustomOverrides(preset.overrideSeats || decodeOverrides(preset.codeString));
    // Clear any active regional swings when applying a whole preset
    setRegionalCoalitionSwings({});
    setRegionalGreensSwings({});
    setRegionalOneNationSwings({});
  };

  const handleOverrideSeat = (seatId: string, party: PartyCode | null) => {
    setCustomOverrides((prev) => {
      const copy = { ...prev };
      if (party === null) {
        delete copy[seatId];
      } else {
        copy[seatId] = party;
      }
      return copy;
    });
    setActivePresetId('custom');
  };

  const handleSeatClick = (id: string) => {
    if (!id) {
      setSelectedId(null);
      return;
    }
    if (paintBrushParty) {
      handleOverrideSeat(id, paintBrushParty);
    } else {
      setSelectedId((prev) => (prev === id ? null : id));
    }
  };

  const handleClearOverrides = () => {
    setCustomOverrides({});
    setActivePresetId('custom');
  };

  const handleSetCoalitionSwing = (val: number) => {
    if (selectedRegionId) {
      setRegionalCoalitionSwings((prev) => ({ ...prev, [selectedRegionId]: val }));
    } else {
      setCoalitionSwing(val);
    }
    setActivePresetId('custom');
  };

  const handleSetGreensSwing = (val: number) => {
    if (selectedRegionId) {
      setRegionalGreensSwings((prev) => ({ ...prev, [selectedRegionId]: val }));
    } else {
      setGreensSwing(val);
    }
    setActivePresetId('custom');
  };

  const handleSetOneNationSwing = (val: number) => {
    if (selectedRegionId) {
      setRegionalOneNationSwings((prev) => ({ ...prev, [selectedRegionId]: val }));
    } else {
      setOneNationSwing(val);
    }
    setActivePresetId('custom');
  };

  // Preference Simulator Handlers
  const handleUpdatePrimaryDelta = (party: PartyGroup, deltaPct: number) => {
    if (selectedId) {
      // Seat level
      setSeatPreferenceDeltas((prev) => {
        const current = prev[selectedId] || INITIAL_PREFERENCE_DELTAS;
        return {
          ...prev,
          [selectedId]: {
            ...current,
            primaryDeltas: {
              ...current.primaryDeltas,
              [party]: deltaPct,
            },
          },
        };
      });
    } else if (selectedRegionId) {
      // Region level
      setRegionalPreferenceDeltas((prev) => {
        const current = prev[selectedRegionId] || INITIAL_PREFERENCE_DELTAS;
        return {
          ...prev,
          [selectedRegionId]: {
            ...current,
            primaryDeltas: {
              ...current.primaryDeltas,
              [party]: deltaPct,
            },
          },
        };
      });
    } else {
      // State level
      setGlobalPreferenceDeltas((prev) => ({
        ...prev,
        primaryDeltas: {
          ...prev.primaryDeltas,
          [party]: deltaPct,
        },
      }));
    }
  };

  const handleBatchUpdatePrimaryDeltas = (deltas: Partial<Record<PartyGroup, number>>) => {
    if (selectedId) {
      setSeatPreferenceDeltas((prev) => {
        const current = prev[selectedId] || INITIAL_PREFERENCE_DELTAS;
        return {
          ...prev,
          [selectedId]: {
            ...current,
            primaryDeltas: {
              ...current.primaryDeltas,
              ...deltas,
            },
          },
        };
      });
    } else if (selectedRegionId) {
      setRegionalPreferenceDeltas((prev) => {
        const current = prev[selectedRegionId] || INITIAL_PREFERENCE_DELTAS;
        return {
          ...prev,
          [selectedRegionId]: {
            ...current,
            primaryDeltas: {
              ...current.primaryDeltas,
              ...deltas,
            },
          },
        };
      });
    } else {
      setGlobalPreferenceDeltas((prev) => ({
        ...prev,
        primaryDeltas: {
          ...prev.primaryDeltas,
          ...deltas,
        },
      }));
    }
  };

  const handleUpdateTransferFlow = (fromParty: PartyGroup, toParty: PartyGroup, newPct: number) => {
    const keyMap: Record<PartyGroup, string> = {
      ALP: 'toALP',
      COALITION: 'toCoalition',
      GRN: 'toGreens',
      ON: 'toOneNation',
      OTH: 'toOther',
    };
    const targetKey = keyMap[toParty];

    const updater = (current: PreferenceModelDeltas): PreferenceModelDeltas => {
      const existingOverrides = current.transferOverrides[fromParty] || {};
      return {
        ...current,
        transferOverrides: {
          ...current.transferOverrides,
          [fromParty]: {
            ...existingOverrides,
            [targetKey]: newPct,
          },
        },
      };
    };

    if (selectedId) {
      setSeatPreferenceDeltas((prev) => ({
        ...prev,
        [selectedId]: updater(prev[selectedId] || INITIAL_PREFERENCE_DELTAS),
      }));
    } else if (selectedRegionId) {
      setRegionalPreferenceDeltas((prev) => ({
        ...prev,
        [selectedRegionId]: updater(prev[selectedRegionId] || INITIAL_PREFERENCE_DELTAS),
      }));
    } else {
      setGlobalPreferenceDeltas(updater);
    }
  };

  const handleResetPreferenceDeltas = () => {
    if (selectedId) {
      setSeatPreferenceDeltas((prev) => {
        const copy = { ...prev };
        delete copy[selectedId];
        return copy;
      });
    } else if (selectedRegionId) {
      setRegionalPreferenceDeltas((prev) => {
        const copy = { ...prev };
        delete copy[selectedRegionId];
        return copy;
      });
    } else {
      setGlobalPreferenceDeltas(INITIAL_PREFERENCE_DELTAS);
    }
  };

  // Active preference deltas for current scope
  const currentActivePreferenceDeltas = useMemo(() => {
    if (selectedId && seatPreferenceDeltas[selectedId]) {
      return seatPreferenceDeltas[selectedId];
    }
    if (selectedRegionId && regionalPreferenceDeltas[selectedRegionId]) {
      return regionalPreferenceDeltas[selectedRegionId];
    }
    return globalPreferenceDeltas;
  }, [selectedId, selectedRegionId, seatPreferenceDeltas, regionalPreferenceDeltas, globalPreferenceDeltas]);

  const activeCoalitionSwing = selectedRegionId !== null ? (regionalCoalitionSwings[selectedRegionId] ?? coalitionSwing) : coalitionSwing;
  const activeGreensSwing = selectedRegionId !== null ? (regionalGreensSwings[selectedRegionId] ?? greensSwing) : greensSwing;
  const activeOneNationSwing = selectedRegionId !== null ? (regionalOneNationSwings[selectedRegionId] ?? oneNationSwing) : oneNationSwing;

  const customOverridesCount = Object.keys(customOverrides).length;

  // Generate the current overrides string representation
  const currentOverridesString = useMemo(() => {
    return encodeOverrides(customOverrides);
  }, [customOverrides]);

  const handleCopyOverridesString = () => {
    navigator.clipboard.writeText(currentOverridesString).then(() => {
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2000);
    });
  };

  const handleDownloadOverridesFile = () => {
    const filename = 'vic-election-overrides.txt';
    const blob = new Blob([currentOverridesString], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedbackMessage({ type: 'success', text: `Downloaded override configuration string file!` });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleCopyPresetSnippet = () => {
    const presetSnippet = `createPreset({
  id: 'custom_scenario_${Math.floor(Math.random() * 1000)}',
  name: 'Custom Scenario',
  description: 'Scenario with swings: Coalition (${activeCoalitionSwing >= 0 ? '+' : ''}${activeCoalitionSwing}%), Greens (${activeGreensSwing >= 0 ? '+' : ''}${activeGreensSwing}%), One Nation (${activeOneNationSwing >= 0 ? '+' : ''}${activeOneNationSwing}%).',
  coalitionSwing: ${activeCoalitionSwing},
  greensSwing: ${activeGreensSwing},
  oneNationSwing: ${activeOneNationSwing},
  codeString: '${currentOverridesString}',
}),`;

    navigator.clipboard.writeText(presetSnippet).then(() => {
      setCopiedSnippetFeedback(true);
      setTimeout(() => setCopiedSnippetFeedback(false), 2000);
    });
  };

  const handleApplyImportedString = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) {
      setFeedbackMessage({ type: 'error', text: 'Please enter or paste an override string.' });
      return;
    }

    try {
      const decodedMap = decodeOverrides(trimmed);
      setCustomOverrides(decodedMap);
      setActivePresetId('custom');
      setImportStringInput('');
      const count = Object.keys(decodedMap).length;
      setFeedbackMessage({
        type: 'success',
        text: `Successfully imported scenario with ${count} manual seat override${count !== 1 ? 's' : ''}!`,
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err?.message || 'Failed to parse override string format.',
      });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleApplyImportedString(content);
      }
    };
    reader.onerror = () => {
      setFeedbackMessage({ type: 'error', text: 'Failed to read uploaded file.' });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const alphabeticalElectorates = useMemo(() => getAlphabeticalElectorates(), []);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0E0] font-sans selection:bg-white/10 selection:text-white flex flex-col p-4 md:p-6 lg:p-8">
      
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto w-full mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <VoteIcon size={22} className="stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <h1 className="serif text-white text-3xl tracking-tight leading-none">
              Jordon's Victorian Election Simulator
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-white/15">•</span>
              <span className="bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-medium">88 Seats Total</span>
              <span className="text-white/15">•</span>
              <span className="bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-medium">45 Majority Threshold</span>
            </p>
          </div>
        </div>

        {/* Global Control Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3.5 py-2 rounded transition-all duration-150 cursor-pointer"
          >
            <RefreshCw size={12} />
            <span>Reset Baseline</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full flex flex-col gap-6 flex-1">
        
        {/* ROW 1: THE INTERACTIVE MAP AND THE HEMICYCLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Electorates Cartogram Map (Col span 7) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full">
            <ElectorateMap
              electorates={simulatedElectorates}
              selectedId={selectedId}
              onSelect={handleSeatClick}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              paintBrushParty={paintBrushParty}
              onPaintBrushPartyChange={setPaintBrushParty}
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
            />
          </div>

          {/* Parliament Seats Won Hemicycle (Col span 5) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
            <ParliamentHemicycle
              electorates={simulatedElectorates}
              selectedId={selectedId}
              onSelect={handleSeatClick}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              customOverridesCount={customOverridesCount}
              onClearOverrides={handleClearOverrides}
            />
          </div>
          
        </div>

        {/* ROW 2: CONTROLS, PROFILE & DIRECTORY */}
        {activeSimulatorTab === 'preference_flow' ? (
          /* Preference Flow View: expanded controls for Sankey diagram layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Preference Flow Simulator Panel (Col span 7 or 8) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full">
              <ScenarioControls
                activeSimulatorTab={activeSimulatorTab}
                onChangeSimulatorTab={handleTabChange}
                coalitionSwing={activeCoalitionSwing}
                setCoalitionSwing={handleSetCoalitionSwing}
                greensSwing={activeGreensSwing}
                setGreensSwing={handleSetGreensSwing}
                oneNationSwing={activeOneNationSwing}
                setOneNationSwing={handleSetOneNationSwing}
                activePresetId={activePresetId}
                onApplyPreset={handleApplyPreset}
                customOverridesCount={customOverridesCount}
                onClearOverrides={handleClearOverrides}
                electorates={simulatedElectorates}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
                preferenceDeltas={currentActivePreferenceDeltas}
                onUpdatePrimaryDelta={handleUpdatePrimaryDelta}
                onBatchUpdatePrimaryDeltas={handleBatchUpdatePrimaryDeltas}
                onUpdateTransferFlow={handleUpdateTransferFlow}
                onResetPreferenceDeltas={handleResetPreferenceDeltas}
                selectedSeatId={selectedId}
                onClearSeatSelection={() => setSelectedId(null)}
              />
            </div>

            {/* Selected Electorate Details Profile (Col span 5 or 4) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
              <ElectorateDetail
                electorate={selectedElectorate}
                customOverrides={customOverrides}
                onOverrideSeat={handleOverrideSeat}
                onClearSeatSelection={() => setSelectedId(null)}
              />
            </div>

            {/* Electorates Directory full width below */}
            <div className="col-span-full flex flex-col">
              <ElectorateList
                electorates={simulatedElectorates}
                selectedId={selectedId}
                onSelect={handleSeatClick}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            </div>
          </div>
        ) : (
          /* Standard 3-Column View for Swing Pad */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Scenario & Swing Controls */}
            <div className="md:col-span-1 flex flex-col h-full">
              <ScenarioControls
                activeSimulatorTab={activeSimulatorTab}
                onChangeSimulatorTab={handleTabChange}
                coalitionSwing={activeCoalitionSwing}
                setCoalitionSwing={handleSetCoalitionSwing}
                greensSwing={activeGreensSwing}
                setGreensSwing={handleSetGreensSwing}
                oneNationSwing={activeOneNationSwing}
                setOneNationSwing={handleSetOneNationSwing}
                activePresetId={activePresetId}
                onApplyPreset={handleApplyPreset}
                customOverridesCount={customOverridesCount}
                onClearOverrides={handleClearOverrides}
                electorates={simulatedElectorates}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
                preferenceDeltas={currentActivePreferenceDeltas}
                onUpdatePrimaryDelta={handleUpdatePrimaryDelta}
                onBatchUpdatePrimaryDeltas={handleBatchUpdatePrimaryDeltas}
                onUpdateTransferFlow={handleUpdateTransferFlow}
                onResetPreferenceDeltas={handleResetPreferenceDeltas}
                selectedSeatId={selectedId}
                onClearSeatSelection={() => setSelectedId(null)}
              />
            </div>

            {/* Selected Electorate Details Profile */}
            <div className="md:col-span-1 flex flex-col h-full">
              <ElectorateDetail
                electorate={selectedElectorate}
                customOverrides={customOverrides}
                onOverrideSeat={handleOverrideSeat}
                onClearSeatSelection={() => setSelectedId(null)}
              />
            </div>

            {/* Search & Directory List */}
            <div className="md:col-span-1 flex flex-col h-full">
              <ElectorateList
                electorates={simulatedElectorates}
                selectedId={selectedId}
                onSelect={handleSeatClick}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            </div>
          </div>
        )}

        {/* CUSTOM SEAT OVERRIDES STRING MANAGER (IMPORT/EXPORT) */}
        <div id="overrides-string-manager" className="bg-[#161B22] border border-white/10 rounded-lg p-6 shadow-xl flex flex-col gap-5 mt-6">
          <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
            <h3 className="serif text-white italic text-xl flex items-center gap-2">
              <FileCode className="text-amber-400" size={20} />
              <span>Share & Restore Seat Overrides</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Export your custom seat overrides as an 88-character string, or import a previously exported string to restore your scenario. Each position in the string corresponds to one of Victoria's 88 electorates sorted alphabetically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EXPORT PANEL */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Active Scenario Override String
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">
                  {customOverridesCount} seat{customOverridesCount !== 1 ? 's' : ''} overridden
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentOverridesString}
                  aria-label="Exported overrides string"
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  id="btn-copy-overrides"
                  onClick={handleCopyOverridesString}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  {copiedFeedback ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy String</span>
                    </>
                  )}
                </button>

                <button
                  id="btn-download-overrides"
                  onClick={handleDownloadOverridesFile}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/30 text-amber-400 hover:text-amber-300 px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download .txt</span>
                </button>

                <button
                  id="btn-copy-preset-snippet"
                  onClick={handleCopyPresetSnippet}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-4 py-2 rounded transition-all duration-150 cursor-pointer"
                  title="Copy full TypeScript preset code to quickly add this scenario to src/presets.ts"
                >
                  {copiedSnippetFeedback ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Preset TS Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <FileCode size={14} className="text-amber-400" />
                      <span>Copy Preset TS Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Character Legend */}
              <div className="bg-black/20 p-3 rounded border border-white/5 flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                  Character Reference Key
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-500 bg-white/5 w-4 h-4 rounded flex items-center justify-center">.</span>
                    <span className="text-slate-400">No Override</span>
                  </div>
                  {Object.entries(PARTY_TO_CHAR).map(([party, char]) => (
                    <div key={party} className="flex items-center gap-1.5">
                      <span
                        className="font-mono font-bold text-white w-4 h-4 rounded flex items-center justify-center text-[10px]"
                        style={{ backgroundColor: PARTIES[party as PartyCode]?.color || '#555' }}
                      >
                        {char}
                      </span>
                      <span className="text-slate-300">{PARTIES[party as PartyCode]?.name || party}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IMPORT PANEL */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Restore From String or File
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste 88-character scenario string (e.g. ................L..N...)"
                  value={importStringInput}
                  onChange={(e) => setImportStringInput(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  id="btn-apply-imported-string"
                  onClick={() => handleApplyImportedString(importStringInput)}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  <span>Apply String</span>
                </button>

                <div className="flex-1 min-w-[140px] relative">
                  <input
                    type="file"
                    id="file-override-upload"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-override-upload"
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-800/40 hover:bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white px-4 py-2.5 rounded transition-all duration-150 cursor-pointer select-none text-center"
                  >
                    <Upload size={14} />
                    <span>Upload File</span>
                  </label>
                </div>
              </div>

              {/* Status and Feedback Messages */}
              {feedbackMessage && (
                <div
                  className={`p-3 rounded text-xs flex items-center gap-2 border ${
                    feedbackMessage.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse bg-current" />
                  <span>{feedbackMessage.text}</span>
                </div>
              )}

              {/* Toggle Alphabetical Reference mapping key */}
              <div className="mt-auto">
                <button
                  onClick={() => setShowAlphabeticalGuide(!showAlphabeticalGuide)}
                  className="text-xs text-amber-400/80 hover:text-amber-400 font-medium flex items-center gap-1.5 hover:underline cursor-pointer transition-colors"
                >
                  <span>{showAlphabeticalGuide ? 'Hide' : 'Show'} Electorate Alphabetical Key Map ({alphabeticalElectorates.length} Seats)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Alphabetical Guide Grid */}
          {showAlphabeticalGuide && (
            <div className="mt-3 pt-4 border-t border-white/5 animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Alphabetical seat positions and active override characters:
                </span>
                <span className="text-[9px] text-slate-500 font-mono">Index 1 - 88</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-black/20 p-4 rounded border border-white/5 max-h-56 overflow-y-auto font-mono text-[10.5px]">
                {alphabeticalElectorates.map((e, index) => {
                  const charValue = currentOverridesString[index] || '.';
                  const isOverridden = charValue !== '.';
                  return (
                    <div
                      key={e.id}
                      className={`flex items-center justify-between p-1.5 rounded border transition-colors ${
                        isOverridden
                          ? 'bg-amber-500/10 border-amber-500/25 text-amber-300 font-semibold'
                          : 'border-transparent hover:bg-white/5 text-slate-400'
                      }`}
                    >
                      <span className="truncate pr-1">
                        <span className="text-slate-600 mr-1">#{index + 1}</span>
                        {e.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          isOverridden
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-white/5 text-slate-600'
                        }`}
                      >
                        {charValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto w-full mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
        <p>© 2026 Victorian Election Simulator. Data modeled on 2022 VEC redistributions, results & preferences.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 transition-colors">Victorian Electoral Commission (VEC)</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors">Parliament of Victoria</span>
        </div>
      </footer>

    </div>
  );
}
