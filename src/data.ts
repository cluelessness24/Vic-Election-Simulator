/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PartyCode = 'ALP' | 'LIB' | 'NAT' | 'GRN' | 'IND' | 'ON';

export interface PartyInfo {
  code: PartyCode;
  name: string;
  fullName: string;
  color: string;
  textColor: string;
  leader: string;
}

export const PARTIES: Record<PartyCode, PartyInfo> = {
  ALP: {
    code: 'ALP',
    name: 'Labor',
    fullName: 'Australian Labor Party',
    color: '#E61E2B',
    textColor: 'text-red-500',
    leader: 'Jacinta Allan',
  },
  LIB: {
    code: 'LIB',
    name: 'Liberal',
    fullName: 'Liberal Party of Australia',
    color: '#0047AB',
    textColor: 'text-blue-500',
    leader: 'John Pesutto',
  },
  NAT: {
    code: 'NAT',
    name: 'National',
    fullName: 'National Party of Australia',
    color: '#006A4E',
    textColor: 'text-emerald-500',
    leader: 'Peter Walsh',
  },
  GRN: {
    code: 'GRN',
    name: 'Greens',
    fullName: 'Victorian Greens',
    color: '#00A651',
    textColor: 'text-green-500',
    leader: 'Ellen Sandell',
  },
  ON: {
    code: 'ON',
    name: 'One Nation',
    fullName: "Pauline Hanson's One Nation",
    color: '#FF6600',
    textColor: 'text-orange-500',
    leader: 'N/A',
  },
  IND: {
    code: 'IND',
    name: 'Independent',
    fullName: 'Independent / Other',
    color: '#808080',
    textColor: 'text-neutral-400',
    leader: 'N/A',
  },
};

export interface Electorate {
  id: string;
  name: string;
  region: string;
  originalParty: PartyCode;
  originalMargin: number; // 2-party preferred margin or primary margin in 2022 (%)
  mp: string;
  voters: number;
}

export interface RegionInfo {
  id: string;
  name: string;
  shortName: string;
  isMetro: boolean;
  // Positioning on our schematic SVG map (800x560 canvas)
  mapX: number;
  mapY: number;
  // Visual orientation of electorate grid (cols, rows)
  cols: number;
  rows: number;
}

export const REGIONS: Record<string, RegionInfo> = {
  northern_metro: {
    id: 'northern_metro',
    name: 'Northern Metropolitan',
    shortName: 'N. Metro',
    isMetro: true,
    mapX: 310,
    mapY: 145,
    cols: 4,
    rows: 3,
  },
  eastern_metro: {
    id: 'eastern_metro',
    name: 'Eastern Metropolitan',
    shortName: 'E. Metro',
    isMetro: true,
    mapX: 435,
    mapY: 180,
    cols: 4,
    rows: 3,
  },
  southern_metro: {
    id: 'southern_metro',
    name: 'Southern Metropolitan',
    shortName: 'S. Metro',
    isMetro: true,
    mapX: 310,
    mapY: 255,
    cols: 4,
    rows: 3,
  },
  western_metro: {
    id: 'western_metro',
    name: 'Western Metropolitan',
    shortName: 'W. Metro',
    isMetro: true,
    mapX: 185,
    mapY: 215,
    cols: 4,
    rows: 3,
  },
  se_metro: {
    id: 'se_metro',
    name: 'South-Eastern Metropolitan',
    shortName: 'SE. Metro',
    isMetro: true,
    mapX: 435,
    mapY: 290,
    cols: 4,
    rows: 3,
  },
  northern_vic: {
    id: 'northern_vic',
    name: 'Northern Victoria',
    shortName: 'Northern Vic',
    isMetro: false,
    mapX: 250,
    mapY: 25,
    cols: 6,
    rows: 2, // 6x2 grid (11 filled, 1 empty)
  },
  western_vic: {
    id: 'western_vic',
    name: 'Western Victoria',
    shortName: 'Western Vic',
    isMetro: false,
    mapX: 25,
    mapY: 135,
    cols: 3,
    rows: 4, // 3x4 grid (11 filled, 1 empty)
  },
  eastern_vic: {
    id: 'eastern_vic',
    name: 'Eastern Victoria',
    shortName: 'Eastern Vic',
    isMetro: false,
    mapX: 585,
    mapY: 135,
    cols: 3,
    rows: 4, // 3x4 grid (11 filled, 1 empty)
  },
};

// Complete list of 88 electorates grouped mathematically into the 8 regions (exactly 11 each)
export const ELECTORATES_DATA: Electorate[] = [
  // === NORTHERN METROPOLITAN (11 seats) ===
  { id: 'melbourne', name: 'Melbourne', region: 'northern_metro', originalParty: 'GRN', originalMargin: 10.2, mp: 'Ellen Sandell', voters: 54100 },
  { id: 'brunswick', name: 'Brunswick', region: 'northern_metro', originalParty: 'GRN', originalMargin: 13.5, mp: 'Tim Read', voters: 55400 },
  { id: 'richmond', name: 'Richmond', region: 'northern_metro', originalParty: 'GRN', originalMargin: 7.2, mp: 'Gabrielle de Vietri', voters: 53900 },
  { id: 'northcote', name: 'Northcote', region: 'northern_metro', originalParty: 'ALP', originalMargin: 0.2, mp: 'Kat Theophanous', voters: 52100 },
  { id: 'preston', name: 'Preston', region: 'northern_metro', originalParty: 'ALP', originalMargin: 9.8, mp: 'Nathan Lambert', voters: 51200 },
  { id: 'pascoe_vale', name: 'Pascoe Vale', region: 'northern_metro', originalParty: 'ALP', originalMargin: 11.4, mp: 'Lizzie Blandthorn', voters: 50800 },
  { id: 'broadmeadows', name: 'Broadmeadows', region: 'northern_metro', originalParty: 'ALP', originalMargin: 16.2, mp: 'Kathleen Matthews-Ward', voters: 49500 },
  { id: 'thomastown', name: 'Thomastown', region: 'northern_metro', originalParty: 'ALP', originalMargin: 14.8, mp: 'Bronwyn Halfpenny', voters: 52300 },
  { id: 'bundoora', name: 'Bundoora', region: 'northern_metro', originalParty: 'ALP', originalMargin: 11.9, mp: 'Colin Brooks', voters: 50200 },
  { id: 'mill_park', name: 'Mill Park', region: 'northern_metro', originalParty: 'ALP', originalMargin: 13.1, mp: 'Lily D\'Ambrosio', voters: 53100 },
  { id: 'greenvale', name: 'Greenvale', region: 'northern_metro', originalParty: 'ALP', originalMargin: 12.5, mp: 'Iwan Walters', voters: 48900 },

  // === EASTERN METROPOLITAN (11 seats) ===
  { id: 'bulleen', name: 'Bulleen', region: 'eastern_metro', originalParty: 'LIB', originalMargin: 5.9, mp: 'Matthew Guy', voters: 51200 },
  { id: 'croydon', name: 'Croydon', region: 'eastern_metro', originalParty: 'LIB', originalMargin: 4.8, mp: 'David Hodgett', voters: 52400 },
  { id: 'warrandyte', name: 'Warrandyte', region: 'eastern_metro', originalParty: 'LIB', originalMargin: 12.5, mp: 'Nicole Werner', voters: 51800 },
  { id: 'ferntree_gully', name: 'Ferntree Gully', region: 'eastern_metro', originalParty: 'LIB', originalMargin: 3.2, mp: 'Nick Wakeling', voters: 50900 },
  { id: 'box_hill', name: 'Box Hill', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 2.1, mp: 'Paul Hamer', voters: 53100 },
  { id: 'ringwood', name: 'Ringwood', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 1.2, mp: 'Will Fowles', voters: 52600 },
  { id: 'bayswater', name: 'Bayswater', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 4.2, mp: 'Jackson Taylor', voters: 51900 },
  { id: 'glen_waverley', name: 'Glen Waverley', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 3.3, mp: 'John Mullahy', voters: 52800 },
  { id: 'ashwood', name: 'Ashwood', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 5.4, mp: 'Matt Fregon', voters: 51500 },
  { id: 'eltham', name: 'Eltham', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 8.7, mp: 'Vicki Ward', voters: 53400 },
  { id: 'ivanhoe', name: 'Ivanhoe', region: 'eastern_metro', originalParty: 'ALP', originalMargin: 7.9, mp: 'Anthony Carbines', voters: 52100 },

  // === SOUTHERN METROPOLITAN (11 seats) ===
  { id: 'brighton', name: 'Brighton', region: 'southern_metro', originalParty: 'LIB', originalMargin: 5.2, mp: 'James Newbury', voters: 52200 },
  { id: 'caulfield', name: 'Caulfield', region: 'southern_metro', originalParty: 'LIB', originalMargin: 2.1, mp: 'David Southwick', voters: 51900 },
  { id: 'hawthorn', name: 'Hawthorn', region: 'southern_metro', originalParty: 'LIB', originalMargin: 1.7, mp: 'John Pesutto', voters: 53800 },
  { id: 'kew', name: 'Kew', region: 'southern_metro', originalParty: 'LIB', originalMargin: 6.4, mp: 'Jess Wilson', voters: 52500 },
  { id: 'malvern', name: 'Malvern', region: 'southern_metro', originalParty: 'LIB', originalMargin: 8.2, mp: 'Michael O\'Brien', voters: 51100 },
  { id: 'sandringham', name: 'Sandringham', region: 'southern_metro', originalParty: 'LIB', originalMargin: 5.2, mp: 'Brad Rowswell', voters: 52400 },
  { id: 'prahran', name: 'Prahran', region: 'southern_metro', originalParty: 'GRN', originalMargin: 12.0, mp: 'Sam Hibbins', voters: 50500 },
  { id: 'albert_park', name: 'Albert Park', region: 'southern_metro', originalParty: 'ALP', originalMargin: 6.2, mp: 'Nina Taylor', voters: 54900 },
  { id: 'bentleigh', name: 'Bentleigh', region: 'southern_metro', originalParty: 'ALP', originalMargin: 2.9, mp: 'Nick Staikos', voters: 51600 },
  { id: 'oakleigh', name: 'Oakleigh', region: 'southern_metro', originalParty: 'ALP', originalMargin: 11.5, mp: 'Steve Dimopoulos', voters: 52200 },
  { id: 'mordialloc', name: 'Mordialloc', region: 'southern_metro', originalParty: 'ALP', originalMargin: 6.8, mp: 'Tim Richardson', voters: 53100 },

  // === WESTERN METROPOLITAN (11 seats) ===
  { id: 'footscray', name: 'Footscray', region: 'western_metro', originalParty: 'ALP', originalMargin: 18.2, mp: 'Katie Hall', voters: 55100 },
  { id: 'kororoit', name: 'Kororoit', region: 'western_metro', originalParty: 'ALP', originalMargin: 14.5, mp: 'Luba Grigorovitch', voters: 54200 },
  { id: 'laverton', name: 'Laverton', region: 'western_metro', originalParty: 'ALP', originalMargin: 17.8, mp: 'Sarah Connolly', voters: 53600 },
  { id: 'st_albans', name: 'St Albans', region: 'western_metro', originalParty: 'ALP', originalMargin: 9.6, mp: 'Natalie Suleyman', voters: 51400 },
  { id: 'sydenham', name: 'Sydenham', region: 'western_metro', originalParty: 'ALP', originalMargin: 10.3, mp: 'Natalie Hutchins', voters: 54800 },
  { id: 'tarneit', name: 'Tarneit', region: 'western_metro', originalParty: 'ALP', originalMargin: 12.1, mp: 'Dylan Wight', voters: 55900 },
  { id: 'williamstown', name: 'Williamstown', region: 'western_metro', originalParty: 'ALP', originalMargin: 13.9, mp: 'Melissa Horne', voters: 52300 },
  { id: 'point_cook', name: 'Point Cook', region: 'western_metro', originalParty: 'ALP', originalMargin: 8.4, mp: 'Mathew Hilakari', voters: 53200 },
  { id: 'werribee', name: 'Werribee', region: 'western_metro', originalParty: 'ALP', originalMargin: 10.9, mp: 'Tim Pallas', voters: 54600 },
  { id: 'melton', name: 'Melton', region: 'western_metro', originalParty: 'ALP', originalMargin: 4.6, mp: 'Steve McGhie', voters: 56200 },
  { id: 'niddrie', name: 'Niddrie', region: 'western_metro', originalParty: 'ALP', originalMargin: 7.1, mp: 'Ben Carroll', voters: 51800 },

  // === SOUTH-EASTERN METROPOLITAN (11 seats) ===
  { id: 'rowville', name: 'Rowville', region: 'se_metro', originalParty: 'LIB', originalMargin: 10.4, mp: 'Kim Wells', voters: 51900 },
  { id: 'berwick', name: 'Berwick', region: 'se_metro', originalParty: 'LIB', originalMargin: 4.7, mp: 'Brad Battin', voters: 53400 },
  { id: 'carrum', name: 'Carrum', region: 'se_metro', originalParty: 'ALP', originalMargin: 9.1, mp: 'Sonya Kilkenny', voters: 52600 },
  { id: 'cranbourne', name: 'Cranbourne', region: 'se_metro', originalParty: 'ALP', originalMargin: 9.4, mp: 'Pauline Richards', voters: 55800 },
  { id: 'dandenong', name: 'Dandenong', region: 'se_metro', originalParty: 'ALP', originalMargin: 15.6, mp: 'Gabrielle Williams', voters: 50400 },
  { id: 'frankston', name: 'Frankston', region: 'se_metro', originalParty: 'ALP', originalMargin: 8.7, mp: 'Paul Edbrooke', voters: 51200 },
  { id: 'mulgrave', name: 'Mulgrave', region: 'se_metro', originalParty: 'ALP', originalMargin: 6.5, mp: 'Eden Foster', voters: 53100 },
  { id: 'narre_warren_n', name: 'Narre Warren North', region: 'se_metro', originalParty: 'ALP', originalMargin: 8.1, mp: 'Belinda Wilson', voters: 52900 },
  { id: 'narre_warren_s', name: 'Narre Warren South', region: 'se_metro', originalParty: 'ALP', originalMargin: 9.9, mp: 'Gary Maas', voters: 54100 },
  { id: 'keysborough', name: 'Keysborough', region: 'se_metro', originalParty: 'ALP', originalMargin: 13.2, mp: 'Martin Pakula', voters: 51800 },
  { id: 'clarinda', name: 'Clarinda', region: 'se_metro', originalParty: 'ALP', originalMargin: 12.8, mp: 'Meng Heang Tak', voters: 52000 },

  // === NORTHERN VICTORIA (11 seats) ===
  { id: 'benalla', name: 'Benalla', region: 'northern_vic', originalParty: 'NAT', originalMargin: 14.5, mp: 'Annabelle Cleeland', voters: 48900 },
  { id: 'euroa', name: 'Euroa', region: 'northern_vic', originalParty: 'NAT', originalMargin: 15.2, mp: 'Annabelle Cleeland', voters: 49200 },
  { id: 'mildura', name: 'Mildura', region: 'northern_vic', originalParty: 'NAT', originalMargin: 1.2, mp: 'Jade Benham', voters: 47800 },
  { id: 'murray_plains', name: 'Murray Plains', region: 'northern_vic', originalParty: 'NAT', originalMargin: 24.2, mp: 'Peter Walsh', voters: 51300 },
  { id: 'ovens_valley', name: 'Ovens Valley', region: 'northern_vic', originalParty: 'NAT', originalMargin: 18.5, mp: 'Tim McCurdy', voters: 49900 },
  { id: 'shepparton', name: 'Shepparton', region: 'northern_vic', originalParty: 'NAT', originalMargin: 6.8, mp: 'Kim O\'Keeffe', voters: 50400 },
  { id: 'swan_hill', name: 'Swan Hill', region: 'northern_vic', originalParty: 'NAT', originalMargin: 21.3, mp: 'Peter Walsh', voters: 46200 },
  { id: 'bendigo_east', name: 'Bendigo East', region: 'northern_vic', originalParty: 'ALP', originalMargin: 11.2, mp: 'Jacinta Allan', voters: 54500 },
  { id: 'bendigo_west', name: 'Bendigo West', region: 'northern_vic', originalParty: 'ALP', originalMargin: 14.1, mp: 'Maree Edwards', voters: 53900 },
  { id: 'macedon', name: 'Macedon', region: 'northern_vic', originalParty: 'ALP', originalMargin: 9.8, mp: 'Mary-Anne Thomas', voters: 51800 },
  { id: 'yan_yean', name: 'Yan Yean', region: 'northern_vic', originalParty: 'ALP', originalMargin: 4.2, mp: 'Lauren Kathage', voters: 53200 },

  // === WESTERN VICTORIA (11 seats) ===
  { id: 'lowan', name: 'Lowan', region: 'western_vic', originalParty: 'NAT', originalMargin: 19.8, mp: 'Emma Kealy', voters: 48200 },
  { id: 'polwarth', name: 'Polwarth', region: 'western_vic', originalParty: 'LIB', originalMargin: 8.4, mp: 'Richard Riordan', voters: 51400 },
  { id: 'sw_coast', name: 'South-West Coast', region: 'western_vic', originalParty: 'LIB', originalMargin: 5.4, mp: 'Roma Britnell', voters: 52100 },
  { id: 'portland', name: 'Portland Coast', region: 'western_vic', originalParty: 'LIB', originalMargin: 3.1, mp: 'Dan Tehan', voters: 49800 },
  { id: 'ballarat_east', name: 'Ballarat East', region: 'western_vic', originalParty: 'ALP', originalMargin: 9.1, mp: 'Michaela Settle', voters: 53900 },
  { id: 'ballarat_west', name: 'Ballarat West', region: 'western_vic', originalParty: 'ALP', originalMargin: 8.2, mp: 'Juliana Addison', voters: 55400 },
  { id: 'bellarine', name: 'Bellarine', region: 'western_vic', originalParty: 'ALP', originalMargin: 8.5, mp: 'Alison Marchant', voters: 53800 },
  { id: 'geelong', name: 'Geelong', region: 'western_vic', originalParty: 'ALP', originalMargin: 9.5, mp: 'Christine Couzens', voters: 54200 },
  { id: 'lara', name: 'Lara', region: 'western_vic', originalParty: 'ALP', originalMargin: 13.4, mp: 'Ella George', voters: 52700 },
  { id: 'south_barwon', name: 'South Barwon', region: 'western_vic', originalParty: 'ALP', originalMargin: 8.9, mp: 'Darren Cheeseman', voters: 54600 },
  { id: 'ripon', name: 'Ripon', region: 'western_vic', originalParty: 'ALP', originalMargin: 0.3, mp: 'Martha Haylett', voters: 50100 },

  // === EASTERN VICTORIA (11 seats) ===
  { id: 'evelyn', name: 'Evelyn', region: 'eastern_vic', originalParty: 'LIB', originalMargin: 5.8, mp: 'Bridget Vallence', voters: 51900 },
  { id: 'narracan', name: 'Narracan', region: 'eastern_vic', originalParty: 'LIB', originalMargin: 11.2, mp: 'Wayne Farnham', voters: 53600 },
  { id: 'nepean', name: 'Nepean', region: 'eastern_vic', originalParty: 'LIB', originalMargin: 4.2, mp: 'Sam Groth', voters: 52800 },
  { id: 'mornington', name: 'Mornington', region: 'eastern_vic', originalParty: 'LIB', originalMargin: 0.7, mp: 'Chris Crewther', voters: 51200 },
  { id: 'gippsland_east', name: 'Gippsland East', region: 'eastern_vic', originalParty: 'NAT', originalMargin: 21.5, mp: 'Tim Bull', voters: 49400 },
  { id: 'gippsland_south', name: 'Gippsland South', region: 'eastern_vic', originalParty: 'NAT', originalMargin: 15.8, mp: 'Danny O\'Brien', voters: 48700 },
  { id: 'morwell', name: 'Morwell', region: 'eastern_vic', originalParty: 'NAT', originalMargin: 4.4, mp: 'Martin Cameron', voters: 50800 },
  { id: 'bass', name: 'Bass', region: 'eastern_vic', originalParty: 'ALP', originalMargin: 2.5, mp: 'Jordan Crugnale', voters: 54100 },
  { id: 'hastings', name: 'Hastings', region: 'eastern_vic', originalParty: 'ALP', originalMargin: 1.4, mp: 'Paul Mercurio', voters: 52900 },
  { id: 'monbulk', name: 'Monbulk', region: 'eastern_vic', originalParty: 'ALP', originalMargin: 5.6, mp: 'Daniela De Martino', voters: 51700 },
  { id: 'pakenham', name: 'Pakenham', region: 'eastern_vic', originalParty: 'ALP', originalMargin: 0.4, mp: 'Emma Vulin', voters: 53500 },
];

export { type ScenarioPreset, SCENARIO_PRESETS, createPreset } from './presets';

// Helper to determine active party of a seat based on uniform swing simulation
export function calculateSimulatedWinner(
  electorate: Electorate,
  coalitionSwing: number, // positive means shift from ALP/others to LIB/NAT
  greensSwing: number, // positive means shift from ALP/others to GRN
  oneNationSwing: number = 0,
  customOverrides: Record<string, PartyCode> = {}
): { party: PartyCode; margin: number } {
  // If there's an explicit manual toggle/override, respect that first!
  if (customOverrides[electorate.id]) {
    return {
      party: customOverrides[electorate.id],
      margin: electorate.originalMargin, // keep original margin for simplicity
    };
  }

  const { originalParty, originalMargin } = electorate;
  const isRegional = ['northern_vic', 'western_vic', 'eastern_vic'].includes(electorate.region);

  // We assign a virtual support score to each contender.
  // The party with the highest score is the winner.
  // The margin is the difference between the 1st and 2nd highest scores.
  let alpSupport = 0;
  let coalitionSupport = 0;
  let greensSupport = 0;
  let oneNationSupport = 0;
  let indSupport = 0;

  if (originalParty === 'ALP') {
    alpSupport = originalMargin;
    coalitionSupport = coalitionSwing;
    greensSupport = greensSwing;
    oneNationSupport = oneNationSwing;
  } else if (originalParty === 'LIB' || originalParty === 'NAT') {
    coalitionSupport = originalMargin + coalitionSwing;
    alpSupport = 0;
    greensSupport = greensSwing;
    oneNationSupport = oneNationSwing;
  } else if (originalParty === 'GRN') {
    greensSupport = originalMargin + greensSwing;
    alpSupport = 0;
    coalitionSupport = coalitionSwing;
    oneNationSupport = oneNationSwing;
  } else if (originalParty === 'ON') {
    oneNationSupport = originalMargin + oneNationSwing;
    alpSupport = 0;
    coalitionSupport = coalitionSwing;
    greensSupport = greensSwing;
  } else {
    // IND or other
    indSupport = originalMargin;
    alpSupport = 0;
    coalitionSupport = coalitionSwing;
    greensSupport = greensSwing;
    oneNationSupport = oneNationSwing;
  }

  // Create list of candidates with their calculated scores
  const candidates = [
    { party: 'ALP' as PartyCode, score: alpSupport },
    { 
      party: (originalParty === 'LIB' || originalParty === 'NAT' ? originalParty : (isRegional ? 'NAT' : 'LIB')) as PartyCode, 
      score: coalitionSupport 
    },
    { party: 'GRN' as PartyCode, score: greensSupport },
    { party: 'ON' as PartyCode, score: oneNationSupport },
  ];

  if (originalParty === 'IND') {
    candidates.push({ party: 'IND' as PartyCode, score: indSupport });
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  const winner = candidates[0];
  const runnerUp = candidates[1];

  // Margin is the lead of the winner over the runner up
  const margin = Math.max(0.1, winner.score - runnerUp.score);

  return {
    party: winner.party,
    margin: parseFloat(margin.toFixed(1)),
  };
}
