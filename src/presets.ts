/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PartyCode } from './data';
import { encodeOverrides, decodeOverrides } from './utils/overridesString';

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  coalitionSwing?: number;
  greensSwing?: number;
  oneNationSwing?: number;
  /**
   * Overrides stored directly in the 88-character export string format.
   * Positions match electorates sorted alphabetically by name.
   * Character key: . = No override, A = ALP, L = LIB, N = NAT, G = GRN, O = ON, I = IND
   */
  codeString: string;
  /**
   * Computed seat overrides map derived from codeString.
   */
  overrideSeats?: Record<string, PartyCode>;
}

/**
 * Helper function to define a scenario preset.
 * You can provide overrides either using the 88-character export string (`codeString`)
 * OR using a readable seat-to-party mapping (`overrideSeats`).
 * Both formats are stored and exposed in the standard export format string.
 */
export function createPreset(config: {
  id: string;
  name: string;
  description: string;
  coalitionSwing?: number;
  greensSwing?: number;
  oneNationSwing?: number;
  /** 88-character export format string (e.g. ".....L...A...") */
  codeString?: string;
  /** Named seat overrides mapping (e.g. { hawthorn: 'IND', kew: 'IND' }) */
  overrideSeats?: Record<string, PartyCode>;
}): ScenarioPreset {
  let finalCodeString = config.codeString;

  if (!finalCodeString) {
    if (config.overrideSeats && Object.keys(config.overrideSeats).length > 0) {
      finalCodeString = encodeOverrides(config.overrideSeats);
    } else {
      finalCodeString = '.'.repeat(88);
    }
  }

  return {
    id: config.id,
    name: config.name,
    description: config.description,
    coalitionSwing: config.coalitionSwing ?? 0,
    greensSwing: config.greensSwing ?? 0,
    oneNationSwing: config.oneNationSwing ?? 0,
    codeString: finalCodeString,
    get overrideSeats() {
      return decodeOverrides(finalCodeString!);
    },
  };
}

/**
 * Built-in election scenario presets stored in the 88-character export string format.
 * To add a new preset, simply call `createPreset({...})` and append it to this list.
 */
export const SCENARIO_PRESETS: ScenarioPreset[] = [
  createPreset({
    id: 'actual_2022',
    name: '2022 State Election',
    description: 'Actual results: Labor 56 seats, Coalition 28 seats (LIB 19, NAT 9), Greens 4 seats. Labor won a second consecutive majority under Daniel Andrews.',
    coalitionSwing: 0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '........................................................................................',
  }),
  createPreset({
    id: 'election_2018',
    name: '2018 State Election',
    description: 'Actual results: Labor 55 seats, Coalition 27 seats (LIB 21, NAT 6), Greens 3 seats, Independents 3 seats. Known as the "Danslide" landslide victory.',
    coalitionSwing: 0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '.....L...........................L..A...........I....I.....A....L......AL...I...........',
  }),
  createPreset({
    id: 'election_2014',
    name: '2014 State Election',
    description: 'Actual results: Labor 47 seats, Coalition 38 seats (LIB 30, NAT 8), Greens 2 seats, Independents 1 seat. Labor returned to power under Daniel Andrews.',
    coalitionSwing: 0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '.L...LL...L.L..A..............L..L..........L..........................AL...IL.........L',
  }),
  createPreset({
    id: 'election_2010',
    name: '2010 State Election',
    description: 'Actual results: Coalition 45 seats (LIB 35, NAT 10), Labor 43 seats. Ted Baillieu led the Coalition back to government after eleven years in opposition.',
    coalitionSwing: 0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '.L...LL...L.L..A........L.....L..L...L......L.A...L.............L....L.ALN...L.........L',
  }),
  createPreset({
    id: 'election_2006',
    name: '2006 State Election',
    description: 'Actual results: Labor 55 seats, Coalition 30 seats (LIB 23, NAT 7), Independents 3 seats. Steve Bracks led Labor to a third consecutive victory.',
    coalitionSwing: 0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '.....L......L..A.................L............A.I.......I............L.AL...I...........',
  }),
  createPreset({
    id: 'coalition_victory',
    name: 'Coalition Majority (2026 Shift)',
    description: 'A uniform swing of +6.5% to the Liberal-National Coalition, delivering them a narrow majority of seats.',
    coalitionSwing: 6.5,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '........................................................................................',
  }),
  createPreset({
    id: 'greens_balance_power',
    name: 'Greens Surge / Hung Parliament',
    description: 'Greens surge in inner metropolitan seats combined with moderate swings away from Labor, resulting in a minority government.',
    coalitionSwing: 1.5,
    greensSwing: 6.0,
    oneNationSwing: 0,
    codeString: 'G............................................................G..........................',
  }),
  createPreset({
    id: 'labor_landslide',
    name: 'Labor Mega-Landslide',
    description: 'A swing of +3.5% further to Labor, wiping out several high-profile Liberal marginals (e.g., Hawthorn, Kew, Caulfield).',
    coalitionSwing: -3.5,
    greensSwing: -1.0,
    oneNationSwing: 0,
    codeString: '........................................................................................',
  }),
  createPreset({
    id: 'teal_independent_wave',
    name: 'Teal Independent Wave',
    description: 'Community independents sweep Southern Metropolitan wealthy coastal seats, turning blue electorates orange.',
    coalitionSwing: 1.0,
    greensSwing: 0,
    oneNationSwing: 0,
    codeString: '.............I.....I................I.I.............I......................I............',
  }),
];
