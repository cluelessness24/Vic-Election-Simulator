/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  GitFork, 
  Sliders, 
  MapPin, 
  Paintbrush, 
  BarChart3, 
  FileCode, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { PARTIES } from '../data';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPreferenceSimulator?: () => void;
  onOpenSwingPad?: () => void;
}

type GuideTab = 'quickstart' | 'preference_flow' | 'swing_pad' | 'map_and_paint' | 'demographics' | 'export_share';

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenPreferenceSimulator,
  onOpenSwingPad,
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('quickstart');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: GuideTab; label: string; icon: React.ReactNode }[] = [
    { id: 'quickstart', label: 'Quick Start', icon: <Sparkles size={15} /> },
    { id: 'preference_flow', label: 'Preference Flow', icon: <GitFork size={15} /> },
    { id: 'swing_pad', label: 'Swing Pad & Presets', icon: <Sliders size={15} /> },
    { id: 'map_and_paint', label: 'Map & Seat Overrides', icon: <MapPin size={15} /> },
    { id: 'demographics', label: 'Demographics & Margins', icon: <BarChart3 size={15} /> },
    { id: 'export_share', label: 'Share & Import Strings', icon: <FileCode size={15} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog */}
      <div 
        className="bg-[#12161F] border border-white/15 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 id="guide-modal-title" className="text-lg font-serif italic text-white leading-tight">
                Victorian Election Explorer — User Guide
              </h2>
              <p className="text-xs text-slate-400">
                Interactive modeling of the 88 Legislative Assembly seats & 2026 outcomes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 bg-black/20 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg transition-all shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-lg border border-amber-500/20">
                <h3 className="text-base font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Sparkles size={16} />
                  The 30-Second Overview
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Victoria&apos;s Legislative Assembly has <strong>88 single-member electorates</strong>. A party or coalition needs <strong>45 seats</strong> to form a majority government. This simulator lets you test statewide swings, preference shifts, regional trends, or hand-craft seat flips to see who wins government.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="w-7 h-7 rounded bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Pick a Simulation Mode
                  </h4>
                  <p className="text-xs text-slate-400">
                    Use the <strong>Preference Flow Simulator</strong> to test realistic primary vote deltas & preference transfers, or the <strong>Three-Way Swing Pad</strong> to drag a balance between Labor, Coalition, and One Nation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="w-7 h-7 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Target Statewide or Local
                  </h4>
                  <p className="text-xs text-slate-400">
                    Adjust swings globally across all 88 electorates, zoom into a specific <strong>Region</strong> (e.g. Western Victoria or Northern Metro), or fine-tune an individual seat.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Inspect & Share
                  </h4>
                  <p className="text-xs text-slate-400">
                    Watch the <strong>Parliament Hemicycle</strong> update live with majority thresholds. Export your scenario as an 88-character string or download a config file to share.
                  </p>
                </div>
              </div>

              {/* Major Parties Key */}
              <div className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Major Political Parties Represented
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  {Object.entries(PARTIES).map(([code, party]) => (
                    <div key={code} className="flex items-center gap-2 p-2 rounded bg-white/5">
                      <span 
                        className="w-3 h-3 rounded-full shrink-0" 
                        style={{ backgroundColor: party.color }} 
                      />
                      <span className="font-medium text-white truncate">{party.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREFERENCE FLOW SIMULATOR */}
          {activeTab === 'preference_flow' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <GitFork size={16} className="text-amber-400" />
                  Preference Flow Simulator (Sankey Model)
                </h3>
                <p className="text-xs text-slate-400">
                  Australian elections use preferential voting where minor party votes flow to major parties until a candidate achieves over 50% Two-Candidate-Preferred (2CP).
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex gap-3">
                  <div className="font-bold text-amber-400 text-xs shrink-0 mt-0.5">A.</div>
                  <div>
                    <h5 className="font-semibold text-white text-xs">Primary Vote Deltas (+/- %)</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Move sliders for Labor (ALP), Coalition (LIB/NAT), Greens (GRN), One Nation (ON), and Others (OTH). When one party gains vote share, votes are dynamically balanced from opponents to preserve 100% total vote share.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex gap-3">
                  <div className="font-bold text-amber-400 text-xs shrink-0 mt-0.5">B.</div>
                  <div>
                    <h5 className="font-semibold text-white text-xs">Preference Transfer Flows (%)</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Control where minor party preferences go upon elimination. For example: what percentage of Greens preferences flow to Labor vs Coalition, or where One Nation preferences transfer. The interactive Sankey diagram visualizes this flow from primary ballots to final Two-Candidate Preferred outcomes.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex gap-3">
                  <div className="font-bold text-amber-400 text-xs shrink-0 mt-0.5">C.</div>
                  <div>
                    <h5 className="font-semibold text-white text-xs">Scope Hierarchy (State → Region → Seat)</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      By default, changes apply <strong>Statewide</strong> across all 88 electorates. If you click a region (or a specific seat), your sliders will specifically calibrate that target without affecting the rest of Victoria.
                    </p>
                  </div>
                </div>
              </div>

              {onOpenPreferenceSimulator && (
                <button
                  onClick={() => {
                    onOpenPreferenceSimulator();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 rounded transition-all cursor-pointer"
                >
                  <span>Switch to Preference Flow Simulator</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          )}

          {/* TAB 3: THREE-WAY SWING PAD */}
          {activeTab === 'swing_pad' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <Sliders size={16} className="text-amber-400" />
                  Three-Way Swing Pad & Preset Scenarios
                </h3>
                <p className="text-xs text-slate-400">
                  Ideal for rapid political forecasting, exploring uniform swings, or testing historical political realignment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Barycentric Triangle Pad
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click and drag inside the triangle pad:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li><strong>Left corner:</strong> Swing towards Labor (ALP)</li>
                    <li><strong>Right corner:</strong> Swing towards Coalition (Liberal/National)</li>
                    <li><strong>Top apex:</strong> Swing towards One Nation / populist minor parties</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Pre-Configured Scenarios
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Select from curated scenarios in the dropdown:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li><strong>2022 Actual:</strong> Baseline result (Labor 56, Coalition 28, Greens 4)</li>
                    <li><strong>Coalition Surge / Wave:</strong> Simulates swing required for Liberal/National victory</li>
                    <li><strong>Hung Parliament:</strong> Labor falls short of 45 seats; crossbench holds balance of power</li>
                    <li><strong>Green Wave & Regional Revolt:</strong> Inner-city Greens gains & regional independents</li>
                  </ul>
                </div>
              </div>

              {onOpenSwingPad && (
                <button
                  onClick={() => {
                    onOpenSwingPad();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 rounded transition-all cursor-pointer"
                >
                  <span>Switch to Three-Way Swing Pad</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          )}

          {/* TAB 4: MAP & SEAT OVERRIDES */}
          {activeTab === 'map_and_paint' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <MapPin size={16} className="text-amber-400" />
                  Cartogram Map, Hemicycle & Paintbrush Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Every electorate can be inspected, filtered, or individually overridden to any party.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <Paintbrush size={14} className="text-amber-400" />
                    Rapid Paintbrush Override
                  </h4>
                  <p className="text-xs text-slate-400">
                    Located above the Cartogram map:
                  </p>
                  <ol className="text-xs text-slate-400 space-y-1 list-decimal pl-4">
                    <li>Click a party paintbrush (e.g. <strong>Labor</strong>, <strong>Liberal</strong>, <strong>Greens</strong>).</li>
                    <li>Click any seat on the map or hemicycle to immediately flip that seat to that party.</li>
                    <li>Click the paintbrush icon again to exit paint mode.</li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} className="text-blue-400" />
                    Parliament Hemicycle
                  </h4>
                  <p className="text-xs text-slate-400">
                    Displays all 88 assembly seats arranged in the traditional Westminster hemicycle:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li>Dotted line denotes the <strong>45-seat majority threshold</strong>.</li>
                    <li>Live counter tallies seats won by each party.</li>
                    <li>Seats with manual overrides are marked with a distinct amber halo dot.</li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-black/20 border border-white/5 text-xs text-slate-300">
                <strong>Pro-tip:</strong> Want to reset all manual seat overrides without clearing your swing sliders? Click <strong>Clear Overrides</strong> in the Hemicycle or controls panel at any time.
              </div>
            </div>
          )}

          {/* TAB 5: DEMOGRAPHICS & MARGINS */}
          {activeTab === 'demographics' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <BarChart3 size={16} className="text-amber-400" />
                  Electorate Profile & ABS Census Demographics
                </h3>
                <p className="text-xs text-slate-400">
                  Select any seat on the map, hemicycle, or directory list to open its comprehensive profile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Election Tab
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li><strong>Simulated 2CP Margin:</strong> Evaluates safety tier:
                      <div className="grid grid-cols-2 gap-1 mt-1 text-[11px]">
                        <span className="text-red-400 font-semibold">• Ultra-Marginal (&lt;2%)</span>
                        <span className="text-amber-400 font-semibold">• Marginal (2–6%)</span>
                        <span className="text-blue-400 font-semibold">• Fairly Safe (6–12%)</span>
                        <span className="text-emerald-400 font-semibold">• Very Safe (&gt;12%)</span>
                      </div>
                    </li>
                    <li><strong>Incumbent Member:</strong> Current sitting MP and 2022 baseline party.</li>
                    <li><strong>Enrolled Voters:</strong> Total registered electorate size and voter turnout.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Demographics Tab (ABS Census)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Real socio-economic metrics benchmarked against Victoria state averages (yellow line):
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                    <li>Median Age & Household Income</li>
                    <li>Tertiary Education (University Degree %)</li>
                    <li>Home Ownership vs Mortgage/Rent Stress</li>
                    <li>Multicultural & Non-English Language Diversity</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXPORT & SHARE */}
          {activeTab === 'export_share' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <FileCode size={16} className="text-amber-400" />
                  Sharing, Restoring & Code Strings
                </h3>
                <p className="text-xs text-slate-400">
                  Every custom scenario can be shared with colleagues or restored in seconds using our compact 88-character encoding format.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                  <h5 className="font-semibold text-white text-xs">How the 88-Character String Works</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Victoria&apos;s 88 electorates are sorted alphabetically (Albert Park #1 to Yan Yean #88). Each character represents a seat:
                  </p>
                  <div className="p-2 rounded bg-black/40 font-mono text-[11px] text-amber-300 mt-2">
                    <code>. = Model calculated &nbsp;|&nbsp; L = Labor &nbsp;|&nbsp; P = Liberal &nbsp;|&nbsp; N = National &nbsp;|&nbsp; G = Greens &nbsp;|&nbsp; O = One Nation &nbsp;|&nbsp; I = Independent</code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded bg-white/5 border border-white/5">
                    <h6 className="font-semibold text-white text-xs mb-1">Copy String</h6>
                    <p className="text-[11px] text-slate-400">
                      Copy the current scenario string to your clipboard to paste into emails, tweets, or messages.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/5">
                    <h6 className="font-semibold text-white text-xs mb-1">Download .txt</h6>
                    <p className="text-[11px] text-slate-400">
                      Saves your scenario file locally to archive or re-upload later.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/5">
                    <h6 className="font-semibold text-white text-xs mb-1">Copy Preset TS Code</h6>
                    <p className="text-[11px] text-slate-400">
                      Generates ready-to-use TypeScript preset definitions (<code className="text-amber-300">createPreset(...)</code>) for developers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1 mt-2">
                  <h5 className="font-semibold text-amber-300 text-xs">Preference Flow Model String (<code className="text-amber-200">PREF1:...</code>)</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Export or restore the entire state of the Preference Flow Simulator — capturing all primary vote swings, custom preference transfer flows, and regional/seat modifiers in a single portable string.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-xs text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Esc</kbd> to close
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg transition-all cursor-pointer"
          >
            Got It, Let&apos;s Explore
          </button>
        </div>
      </div>
    </div>
  );
};
