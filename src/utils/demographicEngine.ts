/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Electorate, ELECTORATES_DATA } from '../data';
import { getABSDemographics, DemographicData } from './demographics';
import { PartyGroup, PreferenceModelDeltas, INITIAL_PREFERENCE_DELTAS } from './preferenceEngine';

export interface DemographicFactorsState {
  mortgageBelt: number;      // -10 to +10: Positive = Mortgage-heavy seats swing to Coalition/ON from ALP
  renterSqueeze: number;     // -10 to +10: Positive = Renter-heavy seats swing to GRN/ALP from Coalition
  tertiaryEducation: number; // -10 to +10: Positive = Bachelor+ seats swing to GRN/ALP from Coalition/ON
  workingClassEdu: number;   // -10 to +10: Positive = High school or below seats swing to ON/Coalition from ALP
  highIncomeAffluence: number; // -10 to +10: Positive = High income seats swing to Coalition/OTH from ALP
  lowIncomeSqueeze: number;  // -10 to +10: Positive = Low income seats swing to Coalition/ON from ALP
  youthVoters: number;       // -10 to +10: Positive = 20-34 yrs seats swing to GRN/ALP from Coalition
  seniorVoters: number;      // -10 to +10: Positive = 55+ yrs seats swing to Coalition/ON from GRN/ALP
  secularism: number;        // -10 to +10: Positive = No religion seats swing to GRN/ALP from Coalition
}

export const INITIAL_DEMOGRAPHIC_FACTORS: DemographicFactorsState = {
  mortgageBelt: 0,
  renterSqueeze: 0,
  tertiaryEducation: 0,
  workingClassEdu: 0,
  highIncomeAffluence: 0,
  lowIncomeSqueeze: 0,
  youthVoters: 0,
  seniorVoters: 0,
  secularism: 0,
};

// Victorian State Benchmark Averages (2021 Census)
export const STATE_BENCHMARKS = {
  mortgage: 36.5,
  rented: 29.8,
  ownedOutright: 31.2,
  bachelorDegreeOrHigher: 34.2,
  highSchoolOrBelow: 37.3,
  incomeHigh: 24.5,
  incomeLow: 22.4,
  medianIncome: 1759,
  youth: 25.4,
  seniors: 25.7,
  noReligion: 47.1,
  christianity: 40.2,
};

// Standard Deviations across the 88 electorates for normalization
export const STATE_STDEV = {
  mortgage: 7.8,
  rented: 9.2,
  bachelorDegreeOrHigher: 11.4,
  highSchoolOrBelow: 8.6,
  incomeHigh: 9.1,
  incomeLow: 6.4,
  youth: 6.8,
  seniors: 7.2,
  noReligion: 5.6,
};

export interface DemographicArchetypePreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  factors: DemographicFactorsState;
}

export const DEMOGRAPHIC_PRESETS: DemographicArchetypePreset[] = [
  {
    id: 'mortgage_belt_squeeze',
    name: 'Mortgage Belt Squeeze',
    tagline: 'High interest rates hitting growth corridors',
    description: 'Swings outer-suburban mortgage corridors (Point Cook, Tarneit, Cranbourne, Yan Yean) toward Coalition & One Nation, while inner renters hold.',
    factors: {
      mortgageBelt: 6.5,
      renterSqueeze: 2.0,
      tertiaryEducation: 0,
      workingClassEdu: 2.5,
      highIncomeAffluence: 0,
      lowIncomeSqueeze: 4.0,
      youthVoters: 0,
      seniorVoters: 1.5,
      secularism: 0,
    },
  },
  {
    id: 'education_realignment',
    name: 'Higher Education Realignment',
    tagline: 'Diploma divide accelerates political polarisation',
    description: 'Strong Green and Labor surge in high tertiary-education electorates (Prahran, Richmond, Melbourne); Coalition and One Nation gain in vocational/outer seats.',
    factors: {
      mortgageBelt: 0,
      renterSqueeze: 1.5,
      tertiaryEducation: 7.5,
      workingClassEdu: 5.0,
      highIncomeAffluence: -1.5,
      lowIncomeSqueeze: 0,
      youthVoters: 3.0,
      seniorVoters: 0,
      secularism: 3.5,
    },
  },
  {
    id: 'generational_divide',
    name: 'Generational Divide',
    tagline: 'Youth vs retiree voting divergence',
    description: 'Under-35 surge fuels Greens and Labor gains in university and inner-ring seats; retirees (55+) consolidate heavily around the Coalition in bayside and regional centres.',
    factors: {
      mortgageBelt: -1.0,
      renterSqueeze: 4.0,
      tertiaryEducation: 2.5,
      workingClassEdu: 0,
      highIncomeAffluence: 0,
      lowIncomeSqueeze: 0,
      youthVoters: 8.0,
      seniorVoters: 6.0,
      secularism: 4.0,
    },
  },
  {
    id: 'working_class_squeeze',
    name: 'Working-Class Cost of Living',
    tagline: 'Inflation pressure in lower-income industrial and outer seats',
    description: 'Low-to-mid income outer suburban and regional seats swing away from Labor towards Coalition and One Nation as living costs bite.',
    factors: {
      mortgageBelt: 4.5,
      renterSqueeze: 0,
      tertiaryEducation: 0,
      workingClassEdu: 6.5,
      highIncomeAffluence: -3.0,
      lowIncomeSqueeze: 7.5,
      youthVoters: -1.0,
      seniorVoters: 2.0,
      secularism: -1.5,
    },
  },
];

export function hasActiveDemographicFactors(factors: DemographicFactorsState): boolean {
  return Object.values(factors).some(v => Math.abs(v) > 0.01);
}

/**
 * Calculates primary vote deltas for each electorate based on demographic factors.
 */
export function calculateDemographicSeatDeltas(
  factors: DemographicFactorsState
): Record<string, PreferenceModelDeltas> {
  const result: Record<string, PreferenceModelDeltas> = {};

  if (!hasActiveDemographicFactors(factors)) {
    return result;
  }

  ELECTORATES_DATA.forEach(electorate => {
    const demo = getABSDemographics(electorate);

    // Compute standard deviations from Victorian benchmarks
    const mortgageDev = (demo.homeOwnership.mortgage - STATE_BENCHMARKS.mortgage) / STATE_STDEV.mortgage;
    const renterDev = (demo.homeOwnership.rented - STATE_BENCHMARKS.rented) / STATE_STDEV.rented;
    const tertiaryDev = (demo.education.bachelorDegreeOrHigher - STATE_BENCHMARKS.bachelorDegreeOrHigher) / STATE_STDEV.bachelorDegreeOrHigher;
    const workingClassDev = (demo.education.highSchoolOrBelow - STATE_BENCHMARKS.highSchoolOrBelow) / STATE_STDEV.highSchoolOrBelow;
    const highIncomeDev = (demo.income.ranges.high - STATE_BENCHMARKS.incomeHigh) / STATE_STDEV.incomeHigh;
    const lowIncomeDev = (demo.income.ranges.low - STATE_BENCHMARKS.incomeLow) / STATE_STDEV.incomeLow;
    const youthDev = (demo.age.twentyTo34 - STATE_BENCHMARKS.youth) / STATE_STDEV.youth;
    const seniorDev = (demo.age.fiftyFivePlus - STATE_BENCHMARKS.seniors) / STATE_STDEV.seniors;
    const secularDev = (demo.religion.noReligion - STATE_BENCHMARKS.noReligion) / STATE_STDEV.noReligion;

    // Accumulate party primary changes in percentage points
    let deltaALP = 0;
    let deltaCOALITION = 0;
    let deltaGRN = 0;
    let deltaON = 0;
    let deltaOTH = 0;

    // 1. Mortgage Belt
    if (factors.mortgageBelt !== 0) {
      const effect = factors.mortgageBelt * mortgageDev * 0.7;
      deltaCOALITION += effect * 0.7;
      deltaON += effect * 0.3;
      deltaALP -= effect;
    }

    // 2. Renter Squeeze
    if (factors.renterSqueeze !== 0) {
      const effect = factors.renterSqueeze * renterDev * 0.7;
      deltaGRN += effect * 0.65;
      deltaALP += effect * 0.35;
      deltaCOALITION -= effect;
    }

    // 3. Higher Education
    if (factors.tertiaryEducation !== 0) {
      const effect = factors.tertiaryEducation * tertiaryDev * 0.8;
      deltaGRN += effect * 0.6;
      deltaALP += effect * 0.4;
      deltaCOALITION -= effect * 0.75;
      deltaON -= effect * 0.25;
    }

    // 4. Working Class Education (High school or below)
    if (factors.workingClassEdu !== 0) {
      const effect = factors.workingClassEdu * workingClassDev * 0.75;
      deltaON += effect * 0.55;
      deltaCOALITION += effect * 0.45;
      deltaALP -= effect * 0.8;
      deltaGRN -= effect * 0.2;
    }

    // 5. High Income Affluence
    if (factors.highIncomeAffluence !== 0) {
      const effect = factors.highIncomeAffluence * highIncomeDev * 0.65;
      deltaCOALITION += effect * 0.6;
      deltaOTH += effect * 0.4;
      deltaALP -= effect;
    }

    // 6. Low Income / Cost of Living
    if (factors.lowIncomeSqueeze !== 0) {
      const effect = factors.lowIncomeSqueeze * lowIncomeDev * 0.75;
      deltaON += effect * 0.5;
      deltaCOALITION += effect * 0.5;
      deltaALP -= effect;
    }

    // 7. Youth Cohort (20-34)
    if (factors.youthVoters !== 0) {
      const effect = factors.youthVoters * youthDev * 0.75;
      deltaGRN += effect * 0.65;
      deltaALP += effect * 0.35;
      deltaCOALITION -= effect * 0.8;
      deltaON -= effect * 0.2;
    }

    // 8. Senior Cohort (55+)
    if (factors.seniorVoters !== 0) {
      const effect = factors.seniorVoters * seniorDev * 0.7;
      deltaCOALITION += effect * 0.75;
      deltaON += effect * 0.25;
      deltaGRN -= effect * 0.6;
      deltaALP -= effect * 0.4;
    }

    // 9. Secularism (No Religion)
    if (factors.secularism !== 0) {
      const effect = factors.secularism * secularDev * 0.6;
      deltaGRN += effect * 0.55;
      deltaALP += effect * 0.45;
      deltaCOALITION -= effect * 0.75;
      deltaON -= effect * 0.25;
    }

    // Round deltas to 1 decimal place
    deltaALP = Number(deltaALP.toFixed(1));
    deltaCOALITION = Number(deltaCOALITION.toFixed(1));
    deltaGRN = Number(deltaGRN.toFixed(1));
    deltaON = Number(deltaON.toFixed(1));
    deltaOTH = Number(deltaOTH.toFixed(1));

    // Ensure sum of deltas is approximately 0
    const sum = deltaALP + deltaCOALITION + deltaGRN + deltaON + deltaOTH;
    if (Math.abs(sum) > 0.05) {
      // Compensate residual on ALP/Coalition
      deltaOTH = Number((deltaOTH - sum).toFixed(1));
    }

    result[electorate.id] = {
      primaryDeltas: {
        ALP: deltaALP,
        COALITION: deltaCOALITION,
        GRN: deltaGRN,
        ON: deltaON,
        OTH: deltaOTH,
      },
      transferOverrides: {
        ALP: {},
        COALITION: {},
        GRN: {},
        ON: {},
        OTH: {},
      },
    };
  });

  return result;
}

/**
 * Returns top drivers of demographic swings for a specific electorate
 */
export function getSeatDemographicDrivers(
  electorateId: string,
  factors: DemographicFactorsState
): Array<{ label: string; deviationDesc: string; impactDesc: string; value: number }> {
  const electorate = ELECTORATES_DATA.find(e => e.id === electorateId);
  if (!electorate || !hasActiveDemographicFactors(factors)) return [];

  const demo = getABSDemographics(electorate);
  const drivers: Array<{ label: string; deviationDesc: string; impactDesc: string; value: number }> = [];

  if (factors.mortgageBelt !== 0) {
    const diff = demo.homeOwnership.mortgage - STATE_BENCHMARKS.mortgage;
    if (Math.abs(diff) > 2) {
      drivers.push({
        label: 'Mortgage Belt',
        deviationDesc: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% vs State Avg (${demo.homeOwnership.mortgage}% mortgage)`,
        impactDesc: diff > 0 ? 'Boosts Coalition / ON' : 'Dampens mortgage swing',
        value: Math.abs(diff * factors.mortgageBelt),
      });
    }
  }

  if (factors.tertiaryEducation !== 0) {
    const diff = demo.education.bachelorDegreeOrHigher - STATE_BENCHMARKS.bachelorDegreeOrHigher;
    if (Math.abs(diff) > 3) {
      drivers.push({
        label: 'Higher Education',
        deviationDesc: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% vs State Avg (${demo.education.bachelorDegreeOrHigher}% degree+)`,
        impactDesc: diff > 0 ? 'Boosts Greens / Labor' : 'Boosts Coalition / ON',
        value: Math.abs(diff * factors.tertiaryEducation),
      });
    }
  }

  if (factors.renterSqueeze !== 0) {
    const diff = demo.homeOwnership.rented - STATE_BENCHMARKS.rented;
    if (Math.abs(diff) > 3) {
      drivers.push({
        label: 'Renters',
        deviationDesc: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% vs State Avg (${demo.homeOwnership.rented}% renting)`,
        impactDesc: diff > 0 ? 'Boosts Greens / Labor' : 'Low rental factor',
        value: Math.abs(diff * factors.renterSqueeze),
      });
    }
  }

  if (factors.lowIncomeSqueeze !== 0) {
    const diff = demo.income.ranges.low - STATE_BENCHMARKS.incomeLow;
    if (Math.abs(diff) > 2) {
      drivers.push({
        label: 'Low Income / Cost of Living',
        deviationDesc: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% low-income vs State Avg`,
        impactDesc: diff > 0 ? 'Anti-incumbent swing to Coalition / ON' : 'Low cost-of-living exposure',
        value: Math.abs(diff * factors.lowIncomeSqueeze),
      });
    }
  }

  if (factors.youthVoters !== 0) {
    const diff = demo.age.twentyTo34 - STATE_BENCHMARKS.youth;
    if (Math.abs(diff) > 3) {
      drivers.push({
        label: 'Youth Cohort',
        deviationDesc: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% 20–34 yrs vs State Avg`,
        impactDesc: diff > 0 ? 'Boosts Greens / Labor' : 'Lower youth share',
        value: Math.abs(diff * factors.youthVoters),
      });
    }
  }

  return drivers.sort((a, b) => b.value - a.value).slice(0, 3);
}
