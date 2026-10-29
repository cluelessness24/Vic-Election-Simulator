/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { ELECTORATES_DATA, calculateSimulatedWinner, PartyCode, PARTIES, SCENARIO_PRESETS } from './data';
import { ElectorateMap } from './components/ElectorateMap';
import { ParliamentHemicycle } from './components/ParliamentHemicycle';
import { ScenarioControls, SimulatorTab } from './components/ScenarioControls';
import { ElectorateDetail } from './components/ElectorateDetail';
import { ElectorateList } from './components/ElectorateList';
import { UserGuideModal, GuideTab } from './components/UserGuideModal';
import { SectionHeaderActions } from './components/SectionHeaderActions';
import { RefreshCw, Layers, Info, X, Copy, Check, Download, Upload, FileCode, BookOpen, GitFork, Users, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { encodeOverrides, decodeOverrides, getAlphabeticalElectorates, PARTY_TO_CHAR } from './utils/overridesString';
import { encodePreferenceModel, decodePreferenceModel, getPreferenceSummary } from './utils/preferenceString';
import { encodePartySwingsModel, decodePartySwingsModel, getPartySwingsSummary, SerializedPartySwingsState, convertPartySwingsToPrimaryDeltas } from './utils/partySwingsString';
import { logSettledScenario, logImmediateMilestone } from './services/googleSheetLogger';
import {
  PartyGroup,
  PreferenceModelDeltas,
  INITIAL_PREFERENCE_DELTAS,
  simulateElectorateWithPreferences,
} from './utils/preferenceEngine';
import {
  PartySwings,
  SliderPartyCode,
  INITIAL_PARTY_SWINGS,
} from './components/PartySwingBar';

const DISTRIBUTION_BAR_PARTIES: PartyCode[] = ['GRN', 'ALP', 'IND', 'LIB', 'NAT', 'ON'];

export default function App() {
  // 0. SIMULATION MODE (TAB CONTROL) - Defaults to preference flow simulator
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<SimulatorTab>('preference_flow');

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

  // 1c. STATE MANAGEMENT - PARTY SWINGS SIMULATOR (Replaces Demographics)
  const [globalPartySwings, setGlobalPartySwings] = useState<PartySwings>(INITIAL_PARTY_SWINGS);
  const [regionalPartySwings, setRegionalPartySwings] = useState<Record<string, PartySwings>>({});
  const [seatPartySwings, setSeatPartySwings] = useState<Record<string, PartySwings>>({});

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
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [guideModalTab, setGuideModalTab] = useState<GuideTab>('quickstart');

  const handleOpenGuide = (tab: GuideTab = 'quickstart') => {
    setGuideModalTab(tab);
    setShowGuideModal(true);
  };

  // Preference Flow String import/export states
  const [importPrefStringInput, setImportPrefStringInput] = useState<string>('');
  const [copiedPrefFeedback, setCopiedPrefFeedback] = useState<boolean>(false);
  const [prefFeedbackMessage, setPrefFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Party Swings String import/export states
  const [importPartySwingsInput, setImportPartySwingsInput] = useState<string>('');
  const [copiedPartySwingsFeedback, setCopiedPartySwingsFeedback] = useState<boolean>(false);
  const [partySwingsFeedbackMessage, setPartySwingsFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
      } else if (activeSimulatorTab === 'party_swing') {
        // Active swings for this seat
        const seatSwing = seatPartySwings[e.id];
        const regSwing = regionalPartySwings[e.region];
        const activeSwings = seatSwing || regSwing || globalPartySwings;

        // Coalition swing mapping: National in regional / NAT seats, Liberal in LIB / metro seats
        const isNat = e.originalParty === 'NAT';
        const isRegional = ['northern_vic', 'western_vic', 'eastern_vic'].includes(e.region);
        let coalSwing = isNat ? activeSwings.NAT : activeSwings.LIB;
        if (!isNat && isRegional && e.originalParty !== 'LIB') {
          coalSwing = activeSwings.NAT * 0.6 + activeSwings.LIB * 0.4;
        }

        const partyDeltas: PreferenceModelDeltas = {
          primaryDeltas: {
            ALP: activeSwings.ALP,
            COALITION: coalSwing,
            GRN: activeSwings.GRN,
            ON: activeSwings.ON,
            OTH: activeSwings.IND,
          },
          transferOverrides: {},
        };

        const { party, margin } = simulateElectorateWithPreferences(
          e,
          partyDeltas,
          {},
          {},
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
    globalPartySwings,
    regionalPartySwings,
    seatPartySwings,
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
    setGlobalPartySwings(INITIAL_PARTY_SWINGS);
    setRegionalPartySwings({});
    setSeatPartySwings({});
  };

  // Tab change handler - preserves user configurations across tabs without destructive reset
  const handleTabChange = (newTab: SimulatorTab) => {
    setActiveSimulatorTab(newTab);
  };

  // Dedicated handler to load current party swings directly into the preference flow model
  const handleLoadPartySwingsIntoPreferenceFlow = () => {
    // 1. Convert statewide/global party swings to global preference primary deltas
    const globalPrimary = convertPartySwingsToPrimaryDeltas(globalPartySwings);
    setGlobalPreferenceDeltas((prev) => ({
      ...prev,
      primaryDeltas: {
        ...prev.primaryDeltas,
        ...globalPrimary,
      },
    }));

    // 2. Convert regional party swings if defined
    if (Object.keys(regionalPartySwings).length > 0) {
      setRegionalPreferenceDeltas((prev) => {
        const next = { ...prev };
        (Object.entries(regionalPartySwings) as [string, PartySwings][]).forEach(([regId, swings]) => {
          const regPrimary = convertPartySwingsToPrimaryDeltas(swings);
          next[regId] = {
            ...(next[regId] || INITIAL_PREFERENCE_DELTAS),
            primaryDeltas: {
              ...(next[regId]?.primaryDeltas || INITIAL_PREFERENCE_DELTAS.primaryDeltas),
              ...regPrimary,
            },
          };
        });
        return next;
      });
    }

    // 3. Convert seat party swings if defined
    if (Object.keys(seatPartySwings).length > 0) {
      setSeatPreferenceDeltas((prev) => {
        const next = { ...prev };
        (Object.entries(seatPartySwings) as [string, PartySwings][]).forEach(([seatId, swings]) => {
          const seat = ELECTORATES_DATA.find((e) => e.id === seatId);
          const isNat = seat?.originalParty === 'NAT';
          const seatPrimary = convertPartySwingsToPrimaryDeltas(swings, isNat);
          next[seatId] = {
            ...(next[seatId] || INITIAL_PREFERENCE_DELTAS),
            primaryDeltas: {
              ...(next[seatId]?.primaryDeltas || INITIAL_PREFERENCE_DELTAS.primaryDeltas),
              ...seatPrimary,
            },
          };
        });
        return next;
      });
    }

    // 4. Ensure currently selected seat or region gets explicit primary deltas applied
    if (selectedId) {
      const activeSeatSwings = seatPartySwings[selectedId] || globalPartySwings;
      const seat = ELECTORATES_DATA.find((e) => e.id === selectedId);
      const isNat = seat?.originalParty === 'NAT';
      const seatPrimary = convertPartySwingsToPrimaryDeltas(activeSeatSwings, isNat);
      setSeatPreferenceDeltas((prev) => ({
        ...prev,
        [selectedId]: {
          ...(prev[selectedId] || INITIAL_PREFERENCE_DELTAS),
          primaryDeltas: {
            ...(prev[selectedId]?.primaryDeltas || INITIAL_PREFERENCE_DELTAS.primaryDeltas),
            ...seatPrimary,
          },
        },
      }));
    } else if (selectedRegionId) {
      const activeRegSwings = regionalPartySwings[selectedRegionId] || globalPartySwings;
      const regPrimary = convertPartySwingsToPrimaryDeltas(activeRegSwings);
      setRegionalPreferenceDeltas((prev) => ({
        ...prev,
        [selectedRegionId]: {
          ...(prev[selectedRegionId] || INITIAL_PREFERENCE_DELTAS),
          primaryDeltas: {
            ...(prev[selectedRegionId]?.primaryDeltas || INITIAL_PREFERENCE_DELTAS.primaryDeltas),
            ...regPrimary,
          },
        },
      }));
    }

    // 5. Switch to Preference Flow tab
    setActiveSimulatorTab('preference_flow');

    // 6. Give user clear feedback notification
    setPrefFeedbackMessage({
      type: 'success',
      text: 'Successfully transferred Party Swings to the Preference Flow Simulator!',
    });
    setTimeout(() => setPrefFeedbackMessage(null), 4000);
  };


  const handleUpdateCurrentPartySwings = (newSwings: PartySwings) => {
    if (selectedId) {
      setSeatPartySwings((prev) => ({
        ...prev,
        [selectedId]: newSwings,
      }));
    } else if (selectedRegionId) {
      setRegionalPartySwings((prev) => ({
        ...prev,
        [selectedRegionId]: newSwings,
      }));
    } else {
      setGlobalPartySwings(newSwings);
    }
  };

  const handleResetCurrentPartySwings = () => {
    if (selectedId) {
      setSeatPartySwings((prev) => {
        const copy = { ...prev };
        delete copy[selectedId];
        return copy;
      });
    } else if (selectedRegionId) {
      setRegionalPartySwings((prev) => {
        const copy = { ...prev };
        delete copy[selectedRegionId];
        return copy;
      });
    } else {
      setGlobalPartySwings(INITIAL_PARTY_SWINGS);
    }
  };

  const handleApplyPartySwingsPresetState = (state: SerializedPartySwingsState) => {
    if (selectedId) {
      setSeatPartySwings((prev) => ({
        ...prev,
        [selectedId]: state.global,
      }));
    } else if (selectedRegionId) {
      setRegionalPartySwings((prev) => ({
        ...prev,
        [selectedRegionId]: state.global,
      }));
    } else {
      setGlobalPartySwings(state.global);
      if (state.regional) setRegionalPartySwings(state.regional);
      if (state.seats) setSeatPartySwings(state.seats);
    }
  };

  const currentActivePartySwings = useMemo<PartySwings>(() => {
    if (selectedId && seatPartySwings[selectedId]) {
      return seatPartySwings[selectedId];
    }
    if (selectedRegionId && regionalPartySwings[selectedRegionId]) {
      return regionalPartySwings[selectedRegionId];
    }
    return globalPartySwings;
  }, [selectedId, selectedRegionId, seatPartySwings, regionalPartySwings, globalPartySwings]);

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

  // Generate the current preference flow model string representation
  const currentPreferenceFlowString = useMemo(() => {
    return encodePreferenceModel(globalPreferenceDeltas, regionalPreferenceDeltas, seatPreferenceDeltas);
  }, [globalPreferenceDeltas, regionalPreferenceDeltas, seatPreferenceDeltas]);

  const preferenceSummaryText = useMemo(() => {
    return getPreferenceSummary(globalPreferenceDeltas);
  }, [globalPreferenceDeltas]);

  // Generate the current party swings model string representation
  const currentPartySwingsString = useMemo(() => {
    return encodePartySwingsModel(globalPartySwings, regionalPartySwings, seatPartySwings);
  }, [globalPartySwings, regionalPartySwings, seatPartySwings]);

  const partySwingsSummaryText = useMemo(() => {
    return getPartySwingsSummary(globalPartySwings);
  }, [globalPartySwings]);

  // Parliamentary seat counts across all 5 party groupings + Labor swing
  const parliamentaryCounts = useMemo(() => {
    let alp = 0;
    let coalition = 0;
    let grn = 0;
    let on = 0;
    let ind = 0;

    simulatedElectorates.forEach((e) => {
      if (e.currentParty === 'ALP') alp++;
      else if (e.currentParty === 'LIB' || e.currentParty === 'NAT') coalition++;
      else if (e.currentParty === 'GRN') grn++;
      else if (e.currentParty === 'ON') on++;
      else ind++;
    });

    const projectedGov = alp >= 45 ? 'Labor Majority' : coalition >= 45 ? 'Coalition Majority' : 'Hung Parliament';

    // Labor swing: In preference flow mode, use ALP primary delta. In party swing mode, use active ALP swing. In swing pad mode, use inverse of coalition swing.
    const laborSwing = activeSimulatorTab === 'preference_flow'
      ? (globalPreferenceDeltas.primaryDeltas.ALP || 0)
      : activeSimulatorTab === 'party_swing'
      ? (currentActivePartySwings.ALP || 0)
      : -activeCoalitionSwing;

    return {
      laborSeats: alp,
      coalitionSeats: coalition,
      greensSeats: grn,
      oneNationSeats: on,
      independentSeats: ind,
      projectedGovernment: projectedGov,
      laborSwing: Number(laborSwing.toFixed(1)),
    };
  }, [simulatedElectorates, activeSimulatorTab, globalPreferenceDeltas, currentActivePartySwings, activeCoalitionSwing]);

  // Exact seat counts per party for the seat distribution bar
  const partySeatCounts = useMemo(() => {
    const counts: Record<PartyCode, number> = {
      GRN: 0,
      ALP: 0,
      IND: 0,
      LIB: 0,
      NAT: 0,
      ON: 0,
    };
    simulatedElectorates.forEach((e) => {
      if (counts[e.currentParty] !== undefined) {
        counts[e.currentParty]++;
      }
    });
    return counts;
  }, [simulatedElectorates]);

  // Helper for immediate milestone logging
  const logMilestone = (triggerType: 'COPY_OVERRIDE_STRING' | 'COPY_PREF_STRING' | 'DOWNLOAD_TXT' | 'APPLY_PRESET') => {
    logImmediateMilestone({
      triggerType,
      simulatorMode: activeSimulatorTab,
      coalitionSwing: activeCoalitionSwing,
      laborSwing: parliamentaryCounts.laborSwing,
      oneNationSwing: activeOneNationSwing,
      laborSeats: parliamentaryCounts.laborSeats,
      coalitionSeats: parliamentaryCounts.coalitionSeats,
      greensSeats: parliamentaryCounts.greensSeats,
      oneNationSeats: parliamentaryCounts.oneNationSeats,
      independentSeats: parliamentaryCounts.independentSeats,
      projectedGovernment: parliamentaryCounts.projectedGovernment,
      overridesCount: customOverridesCount,
      overridesString: currentOverridesString,
      preferenceFlowString: currentPreferenceFlowString,
    });
  };

  // Debounced auto-logging to Google Sheets when user finishes adjusting scenario
  useEffect(() => {
    logSettledScenario({
      triggerType: 'SCENARIO_SETTLED',
      simulatorMode: activeSimulatorTab,
      coalitionSwing: activeCoalitionSwing,
      laborSwing: parliamentaryCounts.laborSwing,
      oneNationSwing: activeOneNationSwing,
      laborSeats: parliamentaryCounts.laborSeats,
      coalitionSeats: parliamentaryCounts.coalitionSeats,
      greensSeats: parliamentaryCounts.greensSeats,
      oneNationSeats: parliamentaryCounts.oneNationSeats,
      independentSeats: parliamentaryCounts.independentSeats,
      projectedGovernment: parliamentaryCounts.projectedGovernment,
      overridesCount: customOverridesCount,
      overridesString: currentOverridesString,
      preferenceFlowString: currentPreferenceFlowString,
    });
  }, [
    simulatedElectorates,
    activeSimulatorTab,
    activeCoalitionSwing,
    activeOneNationSwing,
    currentOverridesString,
    currentPreferenceFlowString,
    parliamentaryCounts,
    customOverridesCount,
  ]);

  const handleCopyOverridesString = () => {
    navigator.clipboard.writeText(currentOverridesString).then(() => {
      setCopiedFeedback(true);
      logMilestone('COPY_OVERRIDE_STRING');
      setTimeout(() => setCopiedFeedback(false), 2000);
    });
  };

  const handleCopyPrefString = () => {
    navigator.clipboard.writeText(currentPreferenceFlowString).then(() => {
      setCopiedPrefFeedback(true);
      logMilestone('COPY_PREF_STRING');
      setTimeout(() => setCopiedPrefFeedback(false), 2000);
    });
  };

  const handleApplyImportedPrefString = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) {
      setPrefFeedbackMessage({ type: 'error', text: 'Please enter or paste a preference flow string.' });
      return;
    }
    try {
      const decoded = decodePreferenceModel(trimmed);
      setGlobalPreferenceDeltas(decoded.global);
      if (decoded.regional) setRegionalPreferenceDeltas(decoded.regional);
      if (decoded.seats) setSeatPreferenceDeltas(decoded.seats);
      setActiveSimulatorTab('preference_flow');
      setImportPrefStringInput('');
      setPrefFeedbackMessage({
        type: 'success',
        text: 'Successfully restored Preference Flow Simulator model state!',
      });
      setTimeout(() => setPrefFeedbackMessage(null), 4000);
    } catch (err: any) {
      setPrefFeedbackMessage({
        type: 'error',
        text: err?.message || 'Failed to parse preference model string format.',
      });
    }
  };

  const handleCopyPartySwingsString = () => {
    navigator.clipboard.writeText(currentPartySwingsString).then(() => {
      setCopiedPartySwingsFeedback(true);
      setTimeout(() => setCopiedPartySwingsFeedback(false), 2000);
    });
  };

  const handleApplyImportedPartySwingsString = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) {
      setPartySwingsFeedbackMessage({ type: 'error', text: 'Please enter or paste a party swings string.' });
      return;
    }
    try {
      const decoded = decodePartySwingsModel(trimmed);
      setGlobalPartySwings(decoded.global);
      if (decoded.regional) setRegionalPartySwings(decoded.regional);
      if (decoded.seats) setSeatPartySwings(decoded.seats);
      setActiveSimulatorTab('party_swing');
      setImportPartySwingsInput('');
      setPartySwingsFeedbackMessage({
        type: 'success',
        text: 'Successfully restored Party Swings selections state!',
      });
      setTimeout(() => setPartySwingsFeedbackMessage(null), 4000);
    } catch (err: any) {
      setPartySwingsFeedbackMessage({
        type: 'error',
        text: err?.message || 'Failed to parse party swings string format.',
      });
    }
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

    logMilestone('DOWNLOAD_TXT');
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
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0E0] font-sans selection:bg-white/10 selection:text-white flex flex-col p-4 md:p-6 lg:p-8 pb-28 sm:pb-32">
      
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto w-full mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-[1.5]"
            >
              <path d="M10.5 10.5 12 9v6m-2 0h4" />
              <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
              <path d="M22 19H2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold mb-1">
              State Election Simulator
            </span>
            <h1 className="serif text-white text-3xl tracking-tight leading-none">
              Victorian Legislative Assembly
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-2 flex items-center gap-1.5 flex-wrap">
              <span>Interactive Model</span>
              <span className="text-white/15">•</span>
              <span className="bg-amber-500/10 text-amber-300/90 px-2.5 py-0.5 rounded border border-amber-500/25 font-medium">created by cluelessness.net</span>
            </p>
          </div>
        </div>

        {/* Global Control Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => handleOpenGuide('quickstart')}
            id="btn-open-user-guide"
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/40 px-3.5 py-2 rounded transition-all duration-150 cursor-pointer shadow-sm"
          >
            <BookOpen size={13} className="text-amber-400" />
            <span>How to Use Guide</span>
          </button>
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
              onOpenGuide={handleOpenGuide}
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
              onOpenGuide={handleOpenGuide}
            />
          </div>
          
        </div>

        {/* ROW 2: CONTROLS, PROFILE & DIRECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Scenario Simulator Panel (Col span 7 or 8) */}
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
              partySwings={currentActivePartySwings}
              onUpdatePartySwings={handleUpdateCurrentPartySwings}
              onResetPartySwings={handleResetCurrentPartySwings}
              onApplyPartySwingsPresetState={handleApplyPartySwingsPresetState}
              onLoadPartySwingsIntoPreferenceFlow={handleLoadPartySwingsIntoPreferenceFlow}
              onOpenGuide={handleOpenGuide}
            />
          </div>

          {/* Selected Electorate Details / Region Profile (Col span 5 or 4) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
            <ElectorateDetail
              electorate={selectedElectorate}
              customOverrides={customOverrides}
              onOverrideSeat={handleOverrideSeat}
              onClearSeatSelection={() => setSelectedId(null)}
              selectedRegionId={selectedRegionId}
              onClearRegionSelection={() => setSelectedRegionId(null)}
              electorates={simulatedElectorates}
              onSelectSeat={handleSeatClick}
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
              onOpenGuide={handleOpenGuide}
            />
          </div>
        </div>

        {/* CUSTOM SEAT OVERRIDES STRING MANAGER (IMPORT/EXPORT) */}
        <div id="section-share-restore" className="bg-[#161B22] border border-white/10 rounded-lg p-6 shadow-xl flex flex-col gap-5 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/5 pb-4">
            <div className="flex flex-col gap-1">
              <h3 className="serif text-white italic text-xl flex items-center gap-2">
                <FileCode className="text-amber-400" size={20} />
                <span>Share & Restore Scenario Strings</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Export your custom seat overrides as an 88-character string, or import a previously exported string to restore your scenario. Each position in the string corresponds to one of Victoria's 88 electorates sorted alphabetically.
              </p>
            </div>
            <SectionHeaderActions
              elementId="section-share-restore"
              sectionTitle="Share & Restore Scenario Strings"
              guideTab="export_share"
              onOpenGuide={handleOpenGuide}
            />
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

          {/* SECTION B: PREFERENCE FLOW MODEL STRING */}
          <div className="mt-4 pt-5 border-t border-white/10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <h4 className="serif text-white italic text-lg flex items-center gap-2">
                  <GitFork className="text-amber-400" size={18} />
                  <span>Share & Restore Preference Flow Model</span>
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Export or restore the entire state of the Preference Flow Simulator (primary vote deltas, transfer flow rates, and regional/seat modifiers).
                </p>
              </div>
              <div className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded self-start sm:self-auto shrink-0">
                {preferenceSummaryText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EXPORT PANEL */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Active Preference Model Output String
                </span>
                <input
                  type="text"
                  readOnly
                  value={currentPreferenceFlowString}
                  aria-label="Exported preference model string"
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-amber-400 focus:outline-none select-all"
                />
                <button
                  id="btn-copy-pref-string"
                  onClick={handleCopyPrefString}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  {copiedPrefFeedback ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Preference String Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Preference String</span>
                    </>
                  )}
                </button>
              </div>

              {/* IMPORT PANEL */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Restore Preference Model
                </span>
                <input
                  type="text"
                  placeholder="Paste preference string (e.g. PREF1:P[ALP:+1.5,COAL:-2.0,...])"
                  value={importPrefStringInput}
                  onChange={(e) => setImportPrefStringInput(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                />
                <button
                  id="btn-apply-imported-pref-string"
                  onClick={() => handleApplyImportedPrefString(importPrefStringInput)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  <span>Apply Preference String</span>
                </button>

                {prefFeedbackMessage && (
                  <div
                    className={`p-2.5 rounded text-xs flex items-center gap-2 border ${
                      prefFeedbackMessage.type === 'success'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse bg-current" />
                    <span>{prefFeedbackMessage.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION C: PARTY SWINGS SELECTIONS STRING */}
          <div className="mt-4 pt-5 border-t border-white/10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <h4 className="serif text-white italic text-lg flex items-center gap-2">
                  <SlidersHorizontal className="text-teal-400" size={18} />
                  <span>Share & Restore Party Swings</span>
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Export or restore your party swings selections (state-wide swings, regional swings, and seat-level adjustments across all parties).
                </p>
              </div>
              <div className="text-[11px] font-mono text-teal-400/90 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded self-start sm:self-auto shrink-0">
                {partySwingsSummaryText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EXPORT PANEL */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Active Party Swings Output String
                </span>
                <input
                  type="text"
                  readOnly
                  value={currentPartySwingsString}
                  aria-label="Exported party swings string"
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-teal-400 focus:outline-none select-all"
                />
                <button
                  id="btn-copy-party-swings-string"
                  onClick={handleCopyPartySwingsString}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  {copiedPartySwingsFeedback ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Party Swings String Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Party Swings String</span>
                    </>
                  )}
                </button>
              </div>

              {/* IMPORT PANEL */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Restore Party Swings
                </span>
                <input
                  id="input-restore-party-swings"
                  type="text"
                  placeholder="Paste party swings string (e.g. SWING1:P[...] or ALP:+4, LIB:-2)"
                  value={importPartySwingsInput}
                  onChange={(e) => setImportPartySwingsInput(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-white/10 rounded px-3 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50"
                />
                <button
                  id="btn-apply-imported-party-swings-string"
                  onClick={() => handleApplyImportedPartySwingsString(importPartySwingsInput)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 px-4 py-2.5 rounded transition-all duration-150 cursor-pointer"
                >
                  <span>Apply Party Swings String</span>
                </button>

                {partySwingsFeedbackMessage && (
                  <div
                    className={`p-2.5 rounded text-xs flex items-center gap-2 border ${
                      partySwingsFeedbackMessage.type === 'success'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse bg-current" />
                    <span>{partySwingsFeedbackMessage.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
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

      {/* INTERACTIVE USER GUIDE MODAL */}
      <UserGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        initialTab={guideModalTab}
        onOpenPreferenceSimulator={() => handleTabChange('preference_flow')}
        onOpenPartySwings={() => handleTabChange('party_swing')}
        onOpenSwingPad={() => handleTabChange('swing_pad')}
      />

      {/* FLOATING SEAT DISTRIBUTION BAR (FIXED TO BOTTOM) */}
      <div
        id="floating-seat-distribution-bar"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-[86%] md:w-[75%] max-w-2xl bg-[#0D1117]/90 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/80 ring-1 ring-white/10 pointer-events-auto"
      >
        <div className="h-8 sm:h-9 w-full bg-white/5 rounded-xl overflow-hidden flex shadow-inner border border-white/10">
          {DISTRIBUTION_BAR_PARTIES.map((partyCode) => {
            const count = partySeatCounts[partyCode];
            if (count === 0) return null;
            const party = PARTIES[partyCode];
            const widthPct = (count / 88) * 100;
            return (
              <div
                key={partyCode}
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: party.color,
                }}
                title={`${party.name}: ${count} seats`}
                className="h-full flex items-center justify-center text-white font-bold text-xs sm:text-sm font-sans select-none transition-all duration-300 drop-shadow min-w-0 overflow-hidden"
              >
                <span className="truncate px-0.5">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
