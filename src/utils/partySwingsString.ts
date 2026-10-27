/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SliderPartyCode, SLIDER_PARTIES, PartySwings, INITIAL_PARTY_SWINGS } from '../components/PartySwingBar';

export interface SerializedPartySwingsState {
  global: PartySwings;
  regional?: Record<string, PartySwings>;
  seats?: Record<string, PartySwings>;
}

/**
 * Encodes Party Swings configuration into a clean, portable string.
 * Format:
 * SWING1:P[GRN:+2.0,ALP:-3.0,IND:0.0,LIB:+1.0,NAT:0.0,ON:0.0]|R[region:GRN:+1.0,...]|S[seat:ALP:+4.0,...]
 */
export function encodePartySwingsModel(
  globalSwings: PartySwings,
  regionalSwings: Record<string, PartySwings> = {},
  seatSwings: Record<string, PartySwings> = {}
): string {
  const parts: string[] = [];

  // 1. Global swings across all 6 parties in SLIDER_PARTIES order
  const pList = SLIDER_PARTIES.map((party) => {
    const val = Number((globalSwings[party] || 0).toFixed(1));
    const prefix = val > 0 ? `+${val.toFixed(1)}` : `${val.toFixed(1)}`;
    return `${party}:${prefix}`;
  });
  parts.push(`P[${pList.join(',')}]`);

  // 2. Regional overrides if any have non-zero swings
  const activeRegKeys = Object.keys(regionalSwings).filter((k) => {
    const rs = regionalSwings[k];
    return rs && SLIDER_PARTIES.some((p) => Math.abs(rs[p] || 0) >= 0.1);
  });

  if (activeRegKeys.length > 0) {
    const rList = activeRegKeys.map((regId) => {
      const rs = regionalSwings[regId];
      const regSwings = SLIDER_PARTIES.filter((p) => Math.abs(rs[p] || 0) >= 0.1)
        .map((p) => {
          const val = Number((rs[p] || 0).toFixed(1));
          return `${p}:${val > 0 ? '+' : ''}${val.toFixed(1)}`;
        })
        .join(',');
      return `${regId}:${regSwings}`;
    });
    parts.push(`R[${rList.join('|')}]`);
  }

  // 3. Seat-level overrides if any have non-zero swings
  const activeSeatKeys = Object.keys(seatSwings).filter((k) => {
    const ss = seatSwings[k];
    return ss && SLIDER_PARTIES.some((p) => Math.abs(ss[p] || 0) >= 0.1);
  });

  if (activeSeatKeys.length > 0) {
    const sList = activeSeatKeys.map((seatId) => {
      const ss = seatSwings[seatId];
      const sSwings = SLIDER_PARTIES.filter((p) => Math.abs(ss[p] || 0) >= 0.1)
        .map((p) => {
          const val = Number((ss[p] || 0).toFixed(1));
          return `${p}:${val > 0 ? '+' : ''}${val.toFixed(1)}`;
        })
        .join(',');
      return `${seatId}:${sSwings}`;
    });
    parts.push(`S[${sList.join('|')}]`);
  }

  return `SWING1:${parts.join('|')}`;
}

/**
 * Decodes an input string into SerializedPartySwingsState.
 * Supports:
 * - Full format: SWING1:P[...]...
 * - JSON format: {"ALP": 4, "LIB": -2, ...}
 * - Quick key-value format: "ALP:+4, LIB:-2, GRN:+1"
 */
export function decodePartySwingsModel(input: string): SerializedPartySwingsState {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('Input string is empty.');
  }

  // Try parsing JSON format if starts with {
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      const global: PartySwings = { ...INITIAL_PARTY_SWINGS };
      SLIDER_PARTIES.forEach((p) => {
        if (parsed[p] !== undefined && typeof parsed[p] === 'number') {
          global[p] = Math.max(-30, Math.min(30, Number(parsed[p].toFixed(1))));
        }
      });
      return { global };
    } catch {
      // Fall through
    }
  }

  // Check for official SWING1: format
  if (trimmed.startsWith('SWING1:')) {
    const content = trimmed.substring('SWING1:'.length);
    const sections = content.split('|');

    let global: PartySwings = { ...INITIAL_PARTY_SWINGS };
    const regional: Record<string, PartySwings> = {};
    const seats: Record<string, PartySwings> = {};

    sections.forEach((section) => {
      // P[party:val,party:val]
      if (section.startsWith('P[') && section.endsWith(']')) {
        const body = section.substring(2, section.length - 1);
        const pairs = body.split(',');
        pairs.forEach((pair) => {
          const [p, valStr] = pair.split(':');
          const party = p?.trim().toUpperCase() as SliderPartyCode;
          const val = parseFloat(valStr?.trim() || '0');
          if (SLIDER_PARTIES.includes(party) && !isNaN(val)) {
            global[party] = Math.max(-30, Math.min(30, Number(val.toFixed(1))));
          }
        });
      }
      // R[regId:party:val,party:val|regId2:...]
      else if (section.startsWith('R[') && section.endsWith(']')) {
        const body = section.substring(2, section.length - 1);
        const regItems = body.split('|');
        regItems.forEach((regItem) => {
          const colonIdx = regItem.indexOf(':');
          if (colonIdx > 0) {
            const regId = regItem.substring(0, colonIdx).trim();
            const pairsStr = regItem.substring(colonIdx + 1);
            const pairs = pairsStr.split(',');
            const rSwings: PartySwings = { ...INITIAL_PARTY_SWINGS };
            pairs.forEach((pair) => {
              const [p, valStr] = pair.split(':');
              const party = p?.trim().toUpperCase() as SliderPartyCode;
              const val = parseFloat(valStr?.trim() || '0');
              if (SLIDER_PARTIES.includes(party) && !isNaN(val)) {
                rSwings[party] = Math.max(-30, Math.min(30, Number(val.toFixed(1))));
              }
            });
            regional[regId] = rSwings;
          }
        });
      }
      // S[seatId:party:val,party:val|seatId2:...]
      else if (section.startsWith('S[') && section.endsWith(']')) {
        const body = section.substring(2, section.length - 1);
        const seatItems = body.split('|');
        seatItems.forEach((seatItem) => {
          const colonIdx = seatItem.indexOf(':');
          if (colonIdx > 0) {
            const seatId = seatItem.substring(0, colonIdx).trim();
            const pairsStr = seatItem.substring(colonIdx + 1);
            const pairs = pairsStr.split(',');
            const sSwings: PartySwings = { ...INITIAL_PARTY_SWINGS };
            pairs.forEach((pair) => {
              const [p, valStr] = pair.split(':');
              const party = p?.trim().toUpperCase() as SliderPartyCode;
              const val = parseFloat(valStr?.trim() || '0');
              if (SLIDER_PARTIES.includes(party) && !isNaN(val)) {
                sSwings[party] = Math.max(-30, Math.min(30, Number(val.toFixed(1))));
              }
            });
            seats[seatId] = sSwings;
          }
        });
      }
    });

    return {
      global,
      regional: Object.keys(regional).length > 0 ? regional : undefined,
      seats: Object.keys(seats).length > 0 ? seats : undefined,
    };
  }

  // Fallback: parse informal key-value format (e.g. "ALP:+4.0, LIB:-2.5, GRN:+1.5")
  const global: PartySwings = { ...INITIAL_PARTY_SWINGS };
  let foundAny = false;
  const items = trimmed.split(/[,;\n]+/);
  items.forEach((item) => {
    const parts = item.split(/[:=]+/);
    if (parts.length === 2) {
      const p = parts[0].trim().toUpperCase() as SliderPartyCode;
      const val = parseFloat(parts[1].trim());
      if (SLIDER_PARTIES.includes(p) && !isNaN(val)) {
        global[p] = Math.max(-30, Math.min(30, Number(val.toFixed(1))));
        foundAny = true;
      }
    }
  });

  if (foundAny) {
    return { global };
  }

  throw new Error('Invalid party swings format. Expected SWING1:P[party:val,...] or key-value pairs (e.g. ALP:+4, LIB:-2).');
}

/**
 * Returns a human-readable one-line summary of party swings.
 */
export function getPartySwingsSummary(swings: PartySwings): string {
  const active = SLIDER_PARTIES.filter((p) => Math.abs(swings[p] || 0) >= 0.1);
  if (active.length === 0) {
    return 'Baseline (0% swings)';
  }
  return active
    .map((p) => {
      const val = swings[p];
      return `${p} ${val > 0 ? '+' : ''}${val.toFixed(1)}%`;
    })
    .join(' · ');
}
