import { PREFERENCE_DATA, PartyGroup, PartyTransferFlow, STATE_DEFAULT_TRANSFERS, ElectoratePreferenceData } from '../preferenceData';
import { ELECTORATES_DATA, Electorate, PartyCode } from '../data';

export type { PartyGroup, PartyTransferFlow, ElectoratePreferenceData };

export interface StageCandidate {
  party: PartyGroup;
  votes: number;
  percentage: number;
}

export interface TransferRibbon {
  fromParty: PartyGroup;
  toParty: PartyGroup;
  votes: number;
  percentageOfTransfer: number; // % of eliminated party's votes
  isRetained: boolean; // true if continuing candidate retaining their votes
}

export interface EliminationStage {
  stageIndex: number;
  stageName: string;
  eliminatedParty?: PartyGroup;
  candidates: StageCandidate[];
  transfers: TransferRibbon[];
  totalVotes: number;
}

export interface PreferenceSimulationResult {
  stages: EliminationStage[];
  winner: PartyGroup;
  runnerUp: PartyGroup;
  winningMargin: number; // percentage lead
  finalTwoCandidatePreferred: Record<PartyGroup, number>; // votes
  finalPercentages: Record<PartyGroup, number>; // percentages
}

export interface PreferenceModelDeltas {
  // Primary vote adjustments (in percentage points, e.g. +2.5% for GRN)
  primaryDeltas: Record<PartyGroup, number>;
  // Transfer flow overrides (target percentages 0-100)
  transferOverrides: Partial<Record<PartyGroup, Partial<PartyTransferFlow>>>;
}

export const INITIAL_PREFERENCE_DELTAS: PreferenceModelDeltas = {
  primaryDeltas: {
    ALP: 0,
    COALITION: 0,
    GRN: 0,
    ON: 0,
    OTH: 0,
  },
  transferOverrides: {},
};

// Calculate preference distribution for a given set of initial primary votes and transfer flows
export function runInstantRunoff(
  initialVotes: Record<PartyGroup, number>,
  transferFlows: Record<PartyGroup, PartyTransferFlow>
): PreferenceSimulationResult {
  const stages: EliminationStage[] = [];
  const parties: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];

  let totalVotes = Object.values(initialVotes).reduce((a, b) => a + b, 0);
  if (totalVotes <= 0) totalVotes = 1;

  // Active candidates and their progressive vote tallies
  let currentTallies: Record<PartyGroup, number> = { ...initialVotes };
  let activeParties: PartyGroup[] = parties.filter(p => (currentTallies[p] || 0) > 0);
  if (activeParties.length < 2) {
    activeParties = ['ALP', 'COALITION'];
  }

  // Stage 0: First Preferences (Primary)
  stages.push({
    stageIndex: 0,
    stageName: '1st Preferences',
    candidates: activeParties.map(p => ({
      party: p,
      votes: Math.round(currentTallies[p]),
      percentage: Number(((currentTallies[p] / totalVotes) * 100).toFixed(1)),
    })),
    transfers: [],
    totalVotes,
  });

  let round = 1;

  // Continue eliminating until only 2 candidates remain
  while (activeParties.length > 2) {
    // Find candidate with lowest votes among active candidates
    activeParties.sort((a, b) => currentTallies[a] - currentTallies[b]);
    const eliminated = activeParties[0];
    const eliminatedVotes = currentTallies[eliminated];

    const remainingParties = activeParties.slice(1);
    const flowConfig = transferFlows[eliminated] || STATE_DEFAULT_TRANSFERS[eliminated];

    // Calculate raw transfer weights to remaining parties
    const weights: Record<PartyGroup, number> = {
      ALP: flowConfig.toALP || 0,
      COALITION: flowConfig.toCoalition || 0,
      GRN: flowConfig.toGreens || 0,
      ON: flowConfig.toOneNation || 0,
      OTH: flowConfig.toOther || 0,
    };

    // Filter to only remaining parties and normalize weights to 100%
    let totalWeightToRemaining = remainingParties.reduce((sum, p) => sum + (weights[p] || 0), 0);
    if (totalWeightToRemaining <= 0) {
      // Equal fallback split
      remainingParties.forEach(p => {
        weights[p] = 100 / remainingParties.length;
      });
      totalWeightToRemaining = 100;
    }

    const stageTransfers: TransferRibbon[] = [];
    const nextTallies: Record<PartyGroup, number> = { ...currentTallies };

    // 1. Retained votes for continuing candidates
    remainingParties.forEach(p => {
      stageTransfers.push({
        fromParty: p,
        toParty: p,
        votes: Math.round(currentTallies[p]),
        percentageOfTransfer: 100,
        isRetained: true,
      });
      nextTallies[p] = currentTallies[p];
    });

    // 2. Transferred votes from eliminated candidate
    remainingParties.forEach(p => {
      const transferRate = weights[p] / totalWeightToRemaining;
      const transferAmount = eliminatedVotes * transferRate;
      nextTallies[p] += transferAmount;

      stageTransfers.push({
        fromParty: eliminated,
        toParty: p,
        votes: Math.round(transferAmount),
        percentageOfTransfer: Number((transferRate * 100).toFixed(1)),
        isRetained: false,
      });
    });

    // Save stage
    stages.push({
      stageIndex: round,
      stageName: `Exclude ${getPartyLabel(eliminated)}`,
      eliminatedParty: eliminated,
      candidates: remainingParties.map(p => ({
        party: p,
        votes: Math.round(nextTallies[p]),
        percentage: Number(((nextTallies[p] / totalVotes) * 100).toFixed(1)),
      })),
      transfers: stageTransfers,
      totalVotes,
    });

    activeParties = remainingParties;
    currentTallies = nextTallies;
    round++;
  }

  // Final 2 candidates
  activeParties.sort((a, b) => currentTallies[b] - currentTallies[a]);
  const winner = activeParties[0];
  const runnerUp = activeParties[1];
  const totalFinal = currentTallies[winner] + currentTallies[runnerUp] || 1;
  const margin = Number((((currentTallies[winner] - currentTallies[runnerUp]) / totalFinal) * 100).toFixed(1));

  const finalPercentages: Record<PartyGroup, number> = {
    ALP: 0,
    COALITION: 0,
    GRN: 0,
    ON: 0,
    OTH: 0,
  };
  finalPercentages[winner] = Number(((currentTallies[winner] / totalFinal) * 100).toFixed(1));
  finalPercentages[runnerUp] = Number(((currentTallies[runnerUp] / totalFinal) * 100).toFixed(1));

  return {
    stages,
    winner,
    runnerUp,
    winningMargin: Math.max(0.1, margin),
    finalTwoCandidatePreferred: currentTallies,
    finalPercentages,
  };
}

export function getPartyLabel(party: PartyGroup): string {
  switch (party) {
    case 'ALP':
      return 'Labor';
    case 'COALITION':
      return 'Coalition';
    case 'GRN':
      return 'Greens';
    case 'ON':
      return 'One Nation';
    case 'OTH':
      return 'Ind / Other';
  }
}

export function getPartyColor(party: PartyGroup): string {
  switch (party) {
    case 'ALP':
      return '#E61E2B';
    case 'COALITION':
      return '#0047AB';
    case 'GRN':
      return '#10C25B';
    case 'ON':
      return '#FF6600';
    case 'OTH':
      return '#94A3B8';
  }
}

// Get aggregate primary votes and transfer flows for:
// - Whole State (if scope === null)
// - A specific region (if scope in REGIONS)
// - A specific seat (if scope in ELECTORATES)
export function getScopeBaselineData(scopeId: string | null): {
  totalFormalVotes: number;
  primaryVotes: Record<PartyGroup, number>;
  primaryPercentages: Record<PartyGroup, number>;
  transferFlows: Record<PartyGroup, PartyTransferFlow>;
  seatCount: number;
} {
  const parties: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];

  if (scopeId && PREFERENCE_DATA[scopeId]) {
    // Single Seat
    const seat = PREFERENCE_DATA[scopeId];
    return {
      totalFormalVotes: seat.totalFormalVotes,
      primaryVotes: { ...seat.primaryVotes },
      primaryPercentages: { ...seat.primaryPercentages },
      transferFlows: JSON.parse(JSON.stringify(seat.transferFlows)),
      seatCount: 1,
    };
  }

  // Aggregate across region or entire state
  let seatsToInclude = Object.values(PREFERENCE_DATA);
  if (scopeId) {
    seatsToInclude = seatsToInclude.filter(s => s.region === scopeId);
  }

  const seatCount = seatsToInclude.length || 88;
  let totalFormal = 0;
  const aggPrimaries: Record<PartyGroup, number> = {
    ALP: 0,
    COALITION: 0,
    GRN: 0,
    ON: 0,
    OTH: 0,
  };

  seatsToInclude.forEach(s => {
    totalFormal += s.totalFormalVotes;
    parties.forEach(p => {
      aggPrimaries[p] += s.primaryVotes[p] || 0;
    });
  });

  const aggPercentages: Record<PartyGroup, number> = {
    ALP: Number(((aggPrimaries.ALP / (totalFormal || 1)) * 100).toFixed(1)),
    COALITION: Number(((aggPrimaries.COALITION / (totalFormal || 1)) * 100).toFixed(1)),
    GRN: Number(((aggPrimaries.GRN / (totalFormal || 1)) * 100).toFixed(1)),
    ON: Number(((aggPrimaries.ON / (totalFormal || 1)) * 100).toFixed(1)),
    OTH: Number(((aggPrimaries.OTH / (totalFormal || 1)) * 100).toFixed(1)),
  };

  // Compute average transfer flows
  const aggTransferFlows: Record<PartyGroup, PartyTransferFlow> = {
    ALP: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0 },
    COALITION: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0 },
    GRN: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0 },
    ON: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0 },
    OTH: { toALP: 0, toCoalition: 0, toGreens: 0, toOneNation: 0, toOther: 0 },
  };

  parties.forEach(src => {
    let count = 0;
    seatsToInclude.forEach(s => {
      const f = s.transferFlows[src];
      if (f) {
        aggTransferFlows[src].toALP += f.toALP;
        aggTransferFlows[src].toCoalition += f.toCoalition;
        aggTransferFlows[src].toGreens += f.toGreens;
        aggTransferFlows[src].toOneNation += f.toOneNation;
        aggTransferFlows[src].toOther += f.toOther;
        count++;
      }
    });
    if (count > 0) {
      aggTransferFlows[src].toALP = Number((aggTransferFlows[src].toALP / count).toFixed(1));
      aggTransferFlows[src].toCoalition = Number((aggTransferFlows[src].toCoalition / count).toFixed(1));
      aggTransferFlows[src].toGreens = Number((aggTransferFlows[src].toGreens / count).toFixed(1));
      aggTransferFlows[src].toOneNation = Number((aggTransferFlows[src].toOneNation / count).toFixed(1));
      aggTransferFlows[src].toOther = Number((aggTransferFlows[src].toOther / count).toFixed(1));
    } else {
      aggTransferFlows[src] = { ...STATE_DEFAULT_TRANSFERS[src] };
    }
  });

  return {
    totalFormalVotes: totalFormal,
    primaryVotes: aggPrimaries,
    primaryPercentages: aggPercentages,
    transferFlows: aggTransferFlows,
    seatCount,
  };
}

// Apply user deltas to an electorate and simulate its winner and margin
export function simulateElectorateWithPreferences(
  electorate: Electorate,
  globalDeltas: PreferenceModelDeltas,
  regionalDeltas: Record<string, PreferenceModelDeltas> = {},
  seatDeltas: Record<string, PreferenceModelDeltas> = {},
  customOverrides: Record<string, PartyCode> = {}
): { party: PartyCode; margin: number } {
  // Manual override takes precedence
  if (customOverrides[electorate.id]) {
    return {
      party: customOverrides[electorate.id],
      margin: electorate.originalMargin,
    };
  }

  const baseline = PREFERENCE_DATA[electorate.id];
  const isRegional = ['northern_vic', 'western_vic', 'eastern_vic'].includes(electorate.region);

  // Fallback if seat not found in preference data
  if (!baseline) {
    return {
      party: electorate.originalParty,
      margin: electorate.originalMargin,
    };
  }

  // Combine deltas: seat-level overrides region-level, which overrides global
  const activeRegDeltas = regionalDeltas[electorate.region] || INITIAL_PREFERENCE_DELTAS;
  const activeSeatDeltas = seatDeltas[electorate.id] || INITIAL_PREFERENCE_DELTAS;

  const parties: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];
  const totalFormal = baseline.totalFormalVotes;

  // Calculate adjusted primary votes
  const adjustedPrimaries: Record<PartyGroup, number> = { ...baseline.primaryVotes };

  parties.forEach(p => {
    // Delta in percentage points
    const deltaPct =
      (activeSeatDeltas.primaryDeltas[p] || 0) +
      (activeRegDeltas.primaryDeltas[p] || 0) +
      (globalDeltas.primaryDeltas[p] || 0);

    if (deltaPct !== 0) {
      adjustedPrimaries[p] = Math.max(0, adjustedPrimaries[p] + Math.round((deltaPct / 100) * totalFormal));
    }
  });

  // Calculate adjusted transfer flows
  const adjustedFlows: Record<PartyGroup, PartyTransferFlow> = JSON.parse(JSON.stringify(baseline.transferFlows));

  parties.forEach(src => {
    const overrides = {
      ...globalDeltas.transferOverrides[src],
      ...activeRegDeltas.transferOverrides[src],
      ...activeSeatDeltas.transferOverrides[src],
    };

    if (overrides.toALP !== undefined) adjustedFlows[src].toALP = overrides.toALP;
    if (overrides.toCoalition !== undefined) adjustedFlows[src].toCoalition = overrides.toCoalition;
    if (overrides.toGreens !== undefined) adjustedFlows[src].toGreens = overrides.toGreens;
    if (overrides.toOneNation !== undefined) adjustedFlows[src].toOneNation = overrides.toOneNation;
    if (overrides.toOther !== undefined) adjustedFlows[src].toOther = overrides.toOther;
  });

  // Run instant-runoff
  const simResult = runInstantRunoff(adjustedPrimaries, adjustedFlows);

  // Map simulated winner party group to PartyCode
  let partyCode: PartyCode = 'ALP';
  if (simResult.winner === 'ALP') {
    partyCode = 'ALP';
  } else if (simResult.winner === 'COALITION') {
    partyCode = electorate.originalParty === 'LIB' || electorate.originalParty === 'NAT'
      ? electorate.originalParty
      : (isRegional ? 'NAT' : 'LIB');
  } else if (simResult.winner === 'GRN') {
    partyCode = 'GRN';
  } else if (simResult.winner === 'ON') {
    partyCode = 'ON';
  } else {
    partyCode = 'IND';
  }

  return {
    party: partyCode,
    margin: simResult.winningMargin,
  };
}
