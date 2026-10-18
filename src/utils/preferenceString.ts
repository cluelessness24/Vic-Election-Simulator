/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PreferenceModelDeltas, INITIAL_PREFERENCE_DELTAS, PartyGroup } from './preferenceEngine';

export interface SerializedPreferenceState {
  global: PreferenceModelDeltas;
  regional?: Record<string, PreferenceModelDeltas>;
  seats?: Record<string, PreferenceModelDeltas>;
}

/**
 * Encodes preference flow simulator deltas and overrides into a single portable string.
 * Uses a clean compact format:
 * PREF1:[PrimaryDeltas]|T[TransferOverrides]|R[Regional]|S[Seats]
 */
export function encodePreferenceModel(
  globalDeltas: PreferenceModelDeltas,
  regionalDeltas: Record<string, PreferenceModelDeltas> = {},
  seatDeltas: Record<string, PreferenceModelDeltas> = {}
): string {
  const parts: string[] = [];

  // 1. Primary vote deltas (e.g. A+1.5,C-2.0,G+0.5,O+0.5,X-0.5)
  const pList: string[] = [];
  const parties: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];
  parties.forEach((party) => {
    const val = globalDeltas.primaryDeltas[party] || 0;
    const rounded = Number(val.toFixed(1));
    const prefix = rounded > 0 ? `+${rounded}` : `${rounded}`;
    pList.push(`${party}:${prefix}`);
  });
  parts.push(`P[${pList.join(',')}]`);

  // 2. Transfer overrides if any exist
  const tList: string[] = [];
  if (globalDeltas.transferOverrides) {
    Object.entries(globalDeltas.transferOverrides).forEach(([fromParty, flows]) => {
      if (flows && Object.keys(flows).length > 0) {
        const flowParts: string[] = [];
        if (flows.toALP !== undefined) flowParts.push(`ALP:${Math.round(flows.toALP)}`);
        if (flows.toCoalition !== undefined) flowParts.push(`COAL:${Math.round(flows.toCoalition)}`);
        if (flows.toGreens !== undefined) flowParts.push(`GRN:${Math.round(flows.toGreens)}`);
        if (flows.toOneNation !== undefined) flowParts.push(`ON:${Math.round(flows.toOneNation)}`);
        if (flows.toOther !== undefined) flowParts.push(`OTH:${Math.round(flows.toOther)}`);
        if (flowParts.length > 0) {
          tList.push(`${fromParty}>${flowParts.join(';')}`);
        }
      }
    });
  }
  if (tList.length > 0) {
    parts.push(`T[${tList.join('|')}]`);
  }

  // 3. Regional overrides if any exist
  const activeRegKeys = Object.keys(regionalDeltas).filter((k) => {
    const rd = regionalDeltas[k];
    const hasDeltas = Object.values(rd.primaryDeltas || {}).some((v) => Math.abs(v) > 0.01);
    const hasTransfers = Object.keys(rd.transferOverrides || {}).length > 0;
    return hasDeltas || hasTransfers;
  });
  if (activeRegKeys.length > 0) {
    const rStrings = activeRegKeys.map((regId) => {
      const rd = regionalDeltas[regId];
      const rP = parties
        .map((p) => `${p}:${(rd.primaryDeltas[p] || 0) > 0 ? '+' : ''}${(rd.primaryDeltas[p] || 0).toFixed(1)}`)
        .join(',');
      return `${regId}(${rP})`;
    });
    parts.push(`R[${rStrings.join('|')}]`);
  }

  // 4. Seat overrides if any exist
  const activeSeatKeys = Object.keys(seatDeltas).filter((k) => {
    const sd = seatDeltas[k];
    const hasDeltas = Object.values(sd.primaryDeltas || {}).some((v) => Math.abs(v) > 0.01);
    const hasTransfers = Object.keys(sd.transferOverrides || {}).length > 0;
    return hasDeltas || hasTransfers;
  });
  if (activeSeatKeys.length > 0) {
    const sStrings = activeSeatKeys.map((seatId) => {
      const sd = seatDeltas[seatId];
      const sP = parties
        .map((p) => `${p}:${(sd.primaryDeltas[p] || 0) > 0 ? '+' : ''}${(sd.primaryDeltas[p] || 0).toFixed(1)}`)
        .join(',');
      return `${seatId}(${sP})`;
    });
    parts.push(`S[${sStrings.join('|')}]`);
  }

  return `PREF1:${parts.join(';')}`;
}

/**
 * Decodes a preference model string back into state objects.
 * Handles both the compact PREF1:... format and JSON fallback.
 */
export function decodePreferenceModel(codeString: string): SerializedPreferenceState {
  const trimmed = codeString.trim();
  if (!trimmed) {
    throw new Error('Empty preference string provided.');
  }

  // Fallback if raw JSON was pasted
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        global: parsed.global || INITIAL_PREFERENCE_DELTAS,
        regional: parsed.regional || {},
        seats: parsed.seats || {},
      };
    } catch {
      throw new Error('Invalid JSON preference string.');
    }
  }

  if (!trimmed.startsWith('PREF1:')) {
    throw new Error('Invalid format: Preference string must start with "PREF1:"');
  }

  const content = trimmed.substring('PREF1:'.length);
  const blocks = content.split(';');

  const resultGlobal: PreferenceModelDeltas = {
    primaryDeltas: { ...INITIAL_PREFERENCE_DELTAS.primaryDeltas },
    transferOverrides: {},
  };
  const resultRegional: Record<string, PreferenceModelDeltas> = {};
  const resultSeats: Record<string, PreferenceModelDeltas> = {};

  blocks.forEach((block) => {
    // Primary Deltas: P[...]
    if (block.startsWith('P[') && block.endsWith(']')) {
      const inner = block.slice(2, -1);
      const items = inner.split(',');
      items.forEach((item) => {
        const [party, valStr] = item.split(':');
        const num = parseFloat(valStr);
        if (party && !isNaN(num) && (resultGlobal.primaryDeltas as any)[party] !== undefined) {
          resultGlobal.primaryDeltas[party as PartyGroup] = num;
        }
      });
    }

    // Transfers: T[...]
    else if (block.startsWith('T[') && block.endsWith(']')) {
      const inner = block.slice(2, -1);
      const partyRules = inner.split('|');
      partyRules.forEach((rule) => {
        const [fromParty, flowsStr] = rule.split('>');
        if (fromParty && flowsStr) {
          const flowMap: any = {};
          const flows = flowsStr.split(';');
          flows.forEach((f) => {
            const [targetParty, pctStr] = f.split(':');
            const pct = parseFloat(pctStr);
            if (!isNaN(pct)) {
              if (targetParty === 'ALP') flowMap.toALP = pct;
              else if (targetParty === 'COAL' || targetParty === 'COALITION') flowMap.toCoalition = pct;
              else if (targetParty === 'GRN') flowMap.toGreens = pct;
              else if (targetParty === 'ON') flowMap.toOneNation = pct;
              else if (targetParty === 'OTH') flowMap.toOther = pct;
            }
          });
          resultGlobal.transferOverrides[fromParty as PartyGroup] = flowMap;
        }
      });
    }

    // Regional: R[...]
    else if (block.startsWith('R[') && block.endsWith(']')) {
      const inner = block.slice(2, -1);
      const regItems = inner.split('|');
      regItems.forEach((rItem) => {
        const match = rItem.match(/^([^(]+)\(([^)]+)\)$/);
        if (match) {
          const regId = match[1];
          const deltasStr = match[2];
          const rd: PreferenceModelDeltas = {
            primaryDeltas: { ...INITIAL_PREFERENCE_DELTAS.primaryDeltas },
            transferOverrides: {},
          };
          deltasStr.split(',').forEach((item) => {
            const [party, valStr] = item.split(':');
            const num = parseFloat(valStr);
            if (party && !isNaN(num) && (rd.primaryDeltas as any)[party] !== undefined) {
              rd.primaryDeltas[party as PartyGroup] = num;
            }
          });
          resultRegional[regId] = rd;
        }
      });
    }

    // Seats: S[...]
    else if (block.startsWith('S[') && block.endsWith(']')) {
      const inner = block.slice(2, -1);
      const seatItems = inner.split('|');
      seatItems.forEach((sItem) => {
        const match = sItem.match(/^([^(]+)\(([^)]+)\)$/);
        if (match) {
          const seatId = match[1];
          const deltasStr = match[2];
          const sd: PreferenceModelDeltas = {
            primaryDeltas: { ...INITIAL_PREFERENCE_DELTAS.primaryDeltas },
            transferOverrides: {},
          };
          deltasStr.split(',').forEach((item) => {
            const [party, valStr] = item.split(':');
            const num = parseFloat(valStr);
            if (party && !isNaN(num) && (sd.primaryDeltas as any)[party] !== undefined) {
              sd.primaryDeltas[party as PartyGroup] = num;
            }
          });
          resultSeats[seatId] = sd;
        }
      });
    }
  });

  return {
    global: resultGlobal,
    regional: resultRegional,
    seats: resultSeats,
  };
}

/**
 * Returns a human-readable summary of what a preference model contains.
 */
export function getPreferenceSummary(globalDeltas: PreferenceModelDeltas): string {
  const parts: string[] = [];
  const p = globalDeltas.primaryDeltas;
  if (p.ALP !== 0) parts.push(`ALP ${p.ALP > 0 ? '+' : ''}${p.ALP.toFixed(1)}%`);
  if (p.COALITION !== 0) parts.push(`Coalition ${p.COALITION > 0 ? '+' : ''}${p.COALITION.toFixed(1)}%`);
  if (p.GRN !== 0) parts.push(`Greens ${p.GRN > 0 ? '+' : ''}${p.GRN.toFixed(1)}%`);
  if (p.ON !== 0) parts.push(`One Nation ${p.ON > 0 ? '+' : ''}${p.ON.toFixed(1)}%`);
  if (p.OTH !== 0) parts.push(`Others ${p.OTH > 0 ? '+' : ''}${p.OTH.toFixed(1)}%`);

  const tCount = Object.keys(globalDeltas.transferOverrides || {}).length;
  if (tCount > 0) parts.push(`${tCount} custom transfer flow${tCount !== 1 ? 's' : ''}`);

  return parts.length > 0 ? parts.join(' • ') : 'Baseline 2022 Primary Votes & Flows';
}
