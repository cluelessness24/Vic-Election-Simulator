/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { decodePartySwingsModel, SerializedPartySwingsState } from '../utils/partySwingsString';
import { PartySwings, INITIAL_PARTY_SWINGS } from '../components/PartySwingBar';

export interface PartyWavePreset {
  id: string;
  name: string;
  pollster?: string;
  date?: string;
  category: 'poll' | 'scenario';
  description: string;
  /**
   * Paste ANY party swings export string here!
   * Accepts:
   * 1. Full export string from "Share & Restore Party Swings" (e.g. SWING1:P[GRN:+1.5,ALP:-7.0,...])
   * 2. Informal key-value shorthand (e.g. "ALP:-7, LIB:+4.5, NAT:+1.0, GRN:+1.5, ON:+1.3")
   * 3. JSON format (e.g. '{"ALP": -7, "LIB": 4.5, "GRN": 1.5, ...}')
   */
  exportString: string;
  badgeColor?: string;
}

/**
 * ============================================================================
 * QUICK PARTY WAVE & PUBLISHED POLLING SCENARIOS
 * ============================================================================
 *
 * HOW TO ADD A NEW PUBLISHED POLL OR PARTY WAVE SCENARIO TO THE CODEBASE:
 * 1. In the Victorian Election Simulator, set swings using the Party Swing Bar.
 * 2. In "Share & Restore Party Swings" below, click "Copy Party Swings String".
 * 3. Add an entry to the `PARTY_WAVE_PRESETS` array below using `createPartyWavePreset({...})`.
 * 4. Paste your copied string into `exportString`!
 *
 * Example:
 * createPartyWavePreset({
 *   id: 'newspoll_march_2026',
 *   name: 'Newspoll (March 2026)',
 *   pollster: 'Newspoll',
 *   date: 'March 2026',
 *   category: 'poll',
 *   description: 'Primary: ALP 31% (-6%), L/NP 40% (+5.5%), GRN 13% (+1.5%), ON 6% (+1.3%)',
 *   exportString: 'SWING1:P[GRN:+2.5,ALP:-13.0,IND:-3.3,LIB:-1.0,NAT:-0.5,ON:+15.3]',
 * })
 * ============================================================================
 */
export function createPartyWavePreset(preset: PartyWavePreset): PartyWavePreset {
  return preset;
}

export const PARTY_WAVE_PRESETS: PartyWavePreset[] = [
  createPartyWavePreset({
    id: 'newspoll_October_2026',
    name: 'Newspoll (October 2026)',
    pollster: 'Newspoll',
    date: 'October 2026',
    category: 'poll',
    description: 'Primary: ALP 24% (-13%), L/NP 33% (-1.5%), GRN 14% (+2.5%), ON 20% (+15.3%)',
    exportString: 'SWING1:P[GRN:+2.5,ALP:-13.0,IND:-3.3,LIB:-1.0,NAT:-0.5,ON:+15.3]',
  }),
  createPartyWavePreset({
    id: 'redbridge_dec_2024',
    name: 'RedBridge / Herald Sun',
    pollster: 'RedBridge',
    date: 'Dec 2024',
    category: 'poll',
    description: 'Published primary votes: Coalition 40% (+5.5%), Labor 30% (-7.0%), Greens 13% (+1.5%), ON 6% (+1.3%).',
    exportString: 'SWING1:P[GRN:+1.5,ALP:-7.0,IND:-1.3,LIB:+4.5,NAT:+1.0,ON:+1.3]',
    badgeColor: '#0047AB',
  }),
  createPartyWavePreset({
    id: 'resolve_strategic_nov_2024',
    name: 'Resolve Strategic / The Age',
    pollster: 'Resolve Strategic',
    date: 'Nov 2024',
    category: 'poll',
    description: 'Published primary votes: Coalition 38% (+3.5%), Labor 27% (-10.0%), Greens 13% (+1.5%), Ind/Other 16% (+3.7%), ON 6% (+1.3%).',
    exportString: 'SWING1:P[GRN:+1.5,ALP:-10.0,IND:+3.7,LIB:+3.0,NAT:+0.5,ON:+1.3]',
    badgeColor: '#0047AB',
  }),
  createPartyWavePreset({
    id: 'freshwater_oct_2024',
    name: 'Freshwater Strategy / AFR',
    pollster: 'Freshwater Strategy',
    date: 'Oct 2024',
    category: 'poll',
    description: 'Published primary votes: Coalition 41% (+6.5%), Labor 31% (-6.0%), Greens 12% (+0.5%), ON 5% (+0.3%), Ind/Other 11% (-1.3%).',
    exportString: 'SWING1:P[GRN:+0.5,ALP:-6.0,IND:-1.3,LIB:+5.5,NAT:+1.0,ON:+0.3]',
    badgeColor: '#0047AB',
  }),
  createPartyWavePreset({
    id: 'labor_rebound',
    name: 'Labor Rebound & Consolidation',
    date: 'Scenario',
    category: 'scenario',
    description: 'Labor primary rebounds toward 39% (+2%), Coalition softens to 32% (-2.5%), Greens at 12%.',
    exportString: 'SWING1:P[GRN:+0.5,ALP:+2.0,IND:-0.5,LIB:-2.0,NAT:-0.5,ON:+0.5]',
    badgeColor: '#E61E2B',
  }),
  createPartyWavePreset({
    id: 'greens_ind_surge',
    name: 'Greens & Community Ind Surge',
    date: 'Scenario',
    category: 'scenario',
    description: 'Inner-metro progressive swing with Greens +3.5% and Independent movement +4.0%, squeezing major parties.',
    exportString: 'SWING1:P[GRN:+3.5,ALP:-5.5,IND:+4.0,LIB:-1.5,NAT:-0.5,ON:0.0]',
    badgeColor: '#00A651',
  }),
  createPartyWavePreset({
    id: 'one_nation_regional_surge',
    name: 'One Nation Regional Breakthrough',
    date: 'Scenario',
    category: 'scenario',
    description: 'One Nation surges +8% across regional Victoria and outer Melbourne mortgage belts, challenging regional Coalition and Labor seats.',
    exportString: 'SWING1:P[GRN:-1.0,ALP:-4.0,IND:-1.0,LIB:-2.0,NAT:-1.0,ON:+8.0]',
    badgeColor: '#FF6600',
  }),
];

/**
 * Decodes a PartyWavePreset's exportString into active swings state.
 */
export function getPresetSwings(preset: PartyWavePreset): SerializedPartySwingsState {
  try {
    return decodePartySwingsModel(preset.exportString);
  } catch (e) {
    console.error(`Failed to decode preset ${preset.id}:`, e);
    return { global: { ...INITIAL_PARTY_SWINGS } };
  }
}
