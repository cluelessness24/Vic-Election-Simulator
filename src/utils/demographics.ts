/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Electorate } from '../data';
import { ABS_2021_CENSUS_DEMOGRAPHICS } from './absDemographicsData';

export interface DemographicData {
  age: {
    under20: number; // %
    twentyTo34: number; // %
    thirtyFiveTo54: number; // %
    fiftyFivePlus: number; // %
    median: number; // years
  };
  gender: {
    male: number; // %
    female: number; // %
  };
  religion: {
    christianity: number; // %
    noReligion: number; // %
    islam: number; // %
    hinduism: number; // %
    buddhism: number; // %
    other: number; // %
  };
  homeOwnership: {
    ownedOutright: number; // %
    mortgage: number; // %
    rented: number; // %
    other: number; // %
  };
  income: {
    medianWeekly: number; // AUD
    ranges: {
      low: number; // % under $1,000/week
      mid: number; // % $1,000 - $3,000/week
      high: number; // % over $3,000/week
    };
  };
  education: {
    bachelorDegreeOrHigher: number; // %
    diplomaCertificate: number; // %
    highSchoolOrBelow: number; // %
  };
}

export function getABSDemographics(electorate: Electorate): DemographicData {
  const data = ABS_2021_CENSUS_DEMOGRAPHICS[electorate.id];
  if (data) {
    return data;
  }

  // Fallback default
  return {
    age: { under20: 22.1, twentyTo34: 25.4, thirtyFiveTo54: 26.8, fiftyFivePlus: 25.7, median: 38 },
    gender: { male: 49.1, female: 50.9 },
    religion: { christianity: 40.2, noReligion: 47.1, islam: 3.2, hinduism: 3.1, buddhism: 2.8, other: 3.6 },
    homeOwnership: { ownedOutright: 31.2, mortgage: 36.5, rented: 29.8, other: 2.5 },
    income: { medianWeekly: 1759, ranges: { low: 22.4, mid: 53.1, high: 24.5 } },
    education: { bachelorDegreeOrHigher: 34.2, diplomaCertificate: 28.5, highSchoolOrBelow: 37.3 }
  };
}
