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

export default function App() {
  // 1. STATE MANAGEMENT
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
    });
  }, [coalitionSwing, greensSwing, oneNationSwing, customOverrides, regionalCoalitionSwings, regionalGreensSwings, regionalOneNationSwings]);

  const selectedElectorate = useMemo(() => {
    if (!selectedId) return null;
    return simulatedElectorates.find((e) => e.id === selectedId) || null;
  }, [selectedId, simulatedElectorates]);

  // 3. HANDLERS
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
    setActivePresetId('custom'); // Flag as custom scenario
  };

  const handleSeatClick = (id: string) => {
    if (paintBrushParty) {
      handleOverrideSeat(id, paintBrushParty);
    } else {
      setSelectedId(id);
    }
  };

  const handleClearOverrides = () => {
    setCustomOverrides({});
    setActivePresetId('custom');
  };

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
      setFeedbackMessage({ type: 'success', text: 'Copied TypeScript preset code snippet! Paste into src/presets.ts to save as code preset.' });
      setTimeout(() => setFeedbackMessage(null), 4000);
    });
  };

  const handleApplyImportString = (strToApply?: string) => {
    const targetString = strToApply !== undefined ? strToApply : importStringInput;
    if (!targetString || targetString.trim().length === 0) {
      setFeedbackMessage({ type: 'error', text: 'Please enter or paste a valid configuration string first.' });
      setTimeout(() => setFeedbackMessage(null), 3500);
      return;
    }
    const decoded = decodeOverrides(targetString);
    const count = Object.keys(decoded).length;
    setCustomOverrides(decoded);
    setActivePresetId('custom');
    setFeedbackMessage({ type: 'success', text: `Successfully restored configuration: ${count} seat overrides applied!` });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const cleanedText = text.trim();
        setImportStringInput(cleanedText);
        handleApplyImportString(cleanedText);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const alphabeticalElectorates = useMemo(() => {
    return getAlphabeticalElectorates();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0E0] font-sans selection:bg-white/10 selection:text-white flex flex-col p-4 md:p-6 lg:p-8">
      
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto w-full mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <VoteIcon size={22} className="stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold mb-1">
              2026 State Election Simulator
            </span>
            <h1 className="serif text-white text-3xl tracking-tight leading-none">
              Victorian Legislative Assembly
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-2 flex items-center gap-1.5 flex-wrap">
              <span>Interactive Model</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Scenario & Swing Controls */}
          <div className="md:col-span-1 flex flex-col h-full">
            <ScenarioControls
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
            />
          </div>

          {/* Selected Electorate Details Profile */}
          <div className="md:col-span-1 flex flex-col h-full">
            <ElectorateDetail
              electorate={selectedElectorate}
              customOverrides={customOverrides}
              onOverrideSeat={handleOverrideSeat}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* COLUMN 1: EXPORT */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Export Configuration String
                </span>
                <span className="text-[10px] text-slate-500 leading-normal">
                  Copy this string or download it as a text file. Positions representing overridden seats show party initials (A/L/N/G/O/I); non-overridden seats show as a dot (.).
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
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-red-500 bg-red-500/10 w-4 h-4 rounded flex items-center justify-center">A</span>
                    <span className="text-slate-400">Labor</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-blue-500 bg-blue-500/10 w-4 h-4 rounded flex items-center justify-center">L</span>
                    <span className="text-slate-400">Liberal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 w-4 h-4 rounded flex items-center justify-center">N</span>
                    <span className="text-slate-400">National</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-green-500 bg-green-500/10 w-4 h-4 rounded flex items-center justify-center">G</span>
                    <span className="text-slate-400">Greens</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-orange-500 bg-orange-500/10 w-4 h-4 rounded flex items-center justify-center">O</span>
                    <span className="text-slate-400">One Nation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-neutral-400 bg-neutral-400/10 w-4 h-4 rounded flex items-center justify-center">I</span>
                    <span className="text-slate-400">Independent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: IMPORT */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Import / Restore Configuration
                </span>
                <span className="text-[10px] text-slate-500 leading-normal">
                  Paste an 88-character overrides string directly below or choose an exported <code>.txt</code> file to restore those exact seat overrides.
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Paste configuration string here (e.g. ............A.........G....)"
                  value={importStringInput}
                  onChange={(e) => setImportStringInput(e.target.value)}
                  aria-label="Paste overrides string input"
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-white/20"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  id="btn-apply-import"
                  onClick={() => handleApplyImportString()}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  <Check size={14} />
                  <span>Apply Overrides</span>
                </button>

                <div className="flex-1 min-w-[140px]">
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
      <footer className="max-w-7xl mx-auto w-full mt-10 border-t border-white/10 pt-6 pb-2 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-500 font-sans">
        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
          <Info size={12} className="text-slate-500" />
          <span>Calculations based on 2PP state margins and standard uniform swing formulas.</span>
        </div>
        <div>
          Victorian State Elections scenario planning model • Data synced from VEC 2022 actuals.
        </div>
      </footer>

    </div>
  );
}
