/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ELECTORATES_DATA, PartyCode } from '../data';

/**
 * Retrieves the complete list of electorates sorted alphabetically by name.
 * This guarantees a stable position index for each electorate.
 */
export const getAlphabeticalElectorates = () => {
  return [...ELECTORATES_DATA].sort((a, b) => a.name.localeCompare(b.name));
};

export const PARTY_TO_CHAR: Record<PartyCode, string> = {
  ALP: 'A',
  LIB: 'L',
  NAT: 'N',
  GRN: 'G',
  ON: 'O',
  IND: 'I',
};

export const CHAR_TO_PARTY: Record<string, PartyCode | null> = {
  '.': null,
  '-': null,
  'A': 'ALP',
  'L': 'LIB',
  'N': 'NAT',
  'G': 'GRN',
  'O': 'ON',
  'I': 'IND',
};

/**
 * Encodes custom overrides into an 88-character string.
 * Each character position matches the electorate sorted alphabetically by name.
 * Default is '.' for no override.
 */
export function encodeOverrides(customOverrides: Record<string, PartyCode>): string {
  const sorted = getAlphabeticalElectorates();
  return sorted
    .map((e) => {
      const party = customOverrides[e.id];
      return party && PARTY_TO_CHAR[party] ? PARTY_TO_CHAR[party] : '.';
    })
    .join('');
}

/**
 * Decodes any string (up to 88 chars) into a custom overrides mapping.
 * Each position maps alphabetically to the electorate at that index.
 */
export function decodeOverrides(codeString: string): Record<string, PartyCode> {
  const result: Record<string, PartyCode> = {};
  const sorted = getAlphabeticalElectorates();
  const trimmed = codeString.trim();

  for (let i = 0; i < sorted.length; i++) {
    const char = trimmed[i];
    if (!char) break;
    const upperChar = char.toUpperCase();
    const party = CHAR_TO_PARTY[upperChar];
    if (party) {
      result[sorted[i].id] = party;
    }
  }
  return result;
}
