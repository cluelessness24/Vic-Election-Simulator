// Generated 2022 Victorian Election Full Preference & Primary Vote Dataset
// Sources: Victorian Electoral Commission (VEC) official distribution & results tables

export type PartyGroup = 'ALP' | 'COALITION' | 'GRN' | 'ON' | 'OTH';

export interface PartyTransferFlow {
  toALP: number;
  toCoalition: number;
  toGreens: number;
  toOneNation: number;
  toOther: number;
}

export interface ElectoratePreferenceData {
  electorateId: string;
  name: string;
  region: string;
  hasOfficialDistribution: boolean;
  totalFormalVotes: number;
  primaryVotes: Record<PartyGroup, number>;
  primaryPercentages: Record<PartyGroup, number>;
  transferFlows: Record<PartyGroup, PartyTransferFlow>;
  twoPartyPreferred: {
    alp: number;
    coalition: number;
    alpPercent: number;
    coalitionPercent: number;
  };
}

export const STATE_DEFAULT_TRANSFERS: Record<PartyGroup, PartyTransferFlow> = {
  "ALP": {
    "toALP": 0,
    "toCoalition": 29.5,
    "toGreens": 20.7,
    "toOneNation": 0,
    "toOther": 49.8
  },
  "COALITION": {
    "toALP": 39.1,
    "toCoalition": 0,
    "toGreens": 25,
    "toOneNation": 0,
    "toOther": 35.9
  },
  "GRN": {
    "toALP": 67.2,
    "toCoalition": 18.6,
    "toGreens": 0,
    "toOneNation": 0.1,
    "toOther": 14.1
  },
  "ON": {
    "toALP": 19.3,
    "toCoalition": 72.5,
    "toGreens": 8.2,
    "toOneNation": 0,
    "toOther": 0
  },
  "OTH": {
    "toALP": 26.9,
    "toCoalition": 40.4,
    "toGreens": 31.3,
    "toOneNation": 1.4,
    "toOther": 0
  }
};

export const PREFERENCE_DATA: Record<string, ElectoratePreferenceData> = {
  "melbourne": {
    "electorateId": "melbourne",
    "name": "Melbourne",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 127557,
    "primaryVotes": {
      "ALP": 16926,
      "COALITION": 7522,
      "GRN": 25593,
      "ON": 0,
      "OTH": 48628
    },
    "primaryPercentages": {
      "ALP": 13.3,
      "COALITION": 5.9,
      "GRN": 20.1,
      "ON": 0,
      "OTH": 38.1
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 31.8,
        "toCoalition": 0,
        "toGreens": 68.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.1,
        "toCoalition": 17.2,
        "toGreens": 63.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 63371,
      "coalition": 35298,
      "alpPercent": 64.2,
      "coalitionPercent": 35.8
    }
  },
  "brunswick": {
    "electorateId": "brunswick",
    "name": "Brunswick",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 130335,
    "primaryVotes": {
      "ALP": 13854,
      "COALITION": 5632,
      "GRN": 23959,
      "ON": 0,
      "OTH": 50816
    },
    "primaryPercentages": {
      "ALP": 10.6,
      "COALITION": 4.3,
      "GRN": 18.4,
      "ON": 0,
      "OTH": 39
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.8,
        "toCoalition": 12.3,
        "toGreens": 67.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 64725,
      "coalition": 29536,
      "alpPercent": 68.7,
      "coalitionPercent": 31.3
    }
  },
  "richmond": {
    "electorateId": "richmond",
    "name": "Richmond",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 119193,
    "primaryVotes": {
      "ALP": 16959,
      "COALITION": 7456,
      "GRN": 22772,
      "ON": 0,
      "OTH": 45198
    },
    "primaryPercentages": {
      "ALP": 14.2,
      "COALITION": 6.3,
      "GRN": 19.1,
      "ON": 0,
      "OTH": 37.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 31.9,
        "toCoalition": 0,
        "toGreens": 68.1,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 22.9,
        "toCoalition": 16.7,
        "toGreens": 60.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 61655,
      "coalition": 30730,
      "alpPercent": 66.7,
      "coalitionPercent": 33.3
    }
  },
  "northcote": {
    "electorateId": "northcote",
    "name": "Northcote",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 127926,
    "primaryVotes": {
      "ALP": 21413,
      "COALITION": 5735,
      "GRN": 21229,
      "ON": 0,
      "OTH": 49449
    },
    "primaryPercentages": {
      "ALP": 16.7,
      "COALITION": 4.5,
      "GRN": 16.6,
      "ON": 0,
      "OTH": 38.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 38.1,
        "toCoalition": 0,
        "toGreens": 58.5,
        "toOneNation": 0,
        "toOther": 3.4
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.2,
        "toCoalition": 18.7,
        "toGreens": 61.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 64393,
      "coalition": 33433,
      "alpPercent": 65.8,
      "coalitionPercent": 34.2
    }
  },
  "preston": {
    "electorateId": "preston",
    "name": "Preston",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 119571,
    "primaryVotes": {
      "ALP": 20761,
      "COALITION": 6883,
      "GRN": 19096,
      "ON": 0,
      "OTH": 51805
    },
    "primaryPercentages": {
      "ALP": 17.4,
      "COALITION": 5.8,
      "GRN": 16,
      "ON": 0,
      "OTH": 43.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 32.7,
        "toCoalition": 0,
        "toGreens": 67.3,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 22,
        "toCoalition": 22.7,
        "toGreens": 55.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 61821,
      "coalition": 36724,
      "alpPercent": 62.7,
      "coalitionPercent": 37.3
    }
  },
  "pascoe_vale": {
    "electorateId": "pascoe_vale",
    "name": "Pascoe Vale",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 120819,
    "primaryVotes": {
      "ALP": 20950,
      "COALITION": 8461,
      "GRN": 19323,
      "ON": 0,
      "OTH": 47440
    },
    "primaryPercentages": {
      "ALP": 17.3,
      "COALITION": 7,
      "GRN": 16,
      "ON": 0,
      "OTH": 39.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 38,
        "toCoalition": 0,
        "toGreens": 62,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.7,
        "toCoalition": 23.7,
        "toGreens": 55.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 58816,
      "coalition": 37358,
      "alpPercent": 61.2,
      "coalitionPercent": 38.8
    }
  },
  "broadmeadows": {
    "electorateId": "broadmeadows",
    "name": "Broadmeadows",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 69560,
    "primaryVotes": {
      "ALP": 18063,
      "COALITION": 10416,
      "GRN": 6301,
      "ON": 0,
      "OTH": 7929
    },
    "primaryPercentages": {
      "ALP": 26,
      "COALITION": 15,
      "GRN": 9.1,
      "ON": 0,
      "OTH": 11.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.3,
        "toCoalition": 29.9,
        "toGreens": 42.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26983,
      "coalition": 15726,
      "alpPercent": 63.2,
      "coalitionPercent": 36.8
    }
  },
  "thomastown": {
    "electorateId": "thomastown",
    "name": "Thomastown",
    "region": "northern_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 74839,
    "primaryVotes": {
      "ALP": 24658,
      "COALITION": 12705,
      "GRN": 2557,
      "ON": 0,
      "OTH": 6520
    },
    "primaryPercentages": {
      "ALP": 32.9,
      "COALITION": 17,
      "GRN": 3.4,
      "ON": 0,
      "OTH": 8.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 29.5,
        "toGreens": 20.7,
        "toOneNation": 0,
        "toOther": 49.8
      },
      "COALITION": {
        "toALP": 34.5,
        "toCoalition": 0,
        "toGreens": 64.8,
        "toOneNation": 0,
        "toOther": 0.7
      },
      "GRN": {
        "toALP": 45.3,
        "toCoalition": 10.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 44.3
      },
      "ON": {
        "toALP": 19.3,
        "toCoalition": 72.5,
        "toGreens": 8.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 23.7,
        "toCoalition": 27.9,
        "toGreens": 48.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 30132,
      "coalition": 16308,
      "alpPercent": 64.9,
      "coalitionPercent": 35.1
    }
  },
  "bundoora": {
    "electorateId": "bundoora",
    "name": "Bundoora",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 80672,
    "primaryVotes": {
      "ALP": 20316,
      "COALITION": 13296,
      "GRN": 6724,
      "ON": 0,
      "OTH": 4570
    },
    "primaryPercentages": {
      "ALP": 25.2,
      "COALITION": 16.5,
      "GRN": 8.3,
      "ON": 0,
      "OTH": 5.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 22.5,
        "toCoalition": 46.6,
        "toGreens": 30.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27284,
      "coalition": 17622,
      "alpPercent": 60.8,
      "coalitionPercent": 39.2
    }
  },
  "mill_park": {
    "electorateId": "mill_park",
    "name": "Mill Park",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 75596,
    "primaryVotes": {
      "ALP": 19106,
      "COALITION": 10288,
      "GRN": 3162,
      "ON": 0,
      "OTH": 7075
    },
    "primaryPercentages": {
      "ALP": 25.3,
      "COALITION": 13.6,
      "GRN": 4.2,
      "ON": 0,
      "OTH": 9.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.8,
        "toCoalition": 43,
        "toGreens": 35.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 24063,
      "coalition": 15568,
      "alpPercent": 60.7,
      "coalitionPercent": 39.3
    }
  },
  "greenvale": {
    "electorateId": "greenvale",
    "name": "Greenvale",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 75372,
    "primaryVotes": {
      "ALP": 19309,
      "COALITION": 12709,
      "GRN": 2194,
      "ON": 0,
      "OTH": 13186
    },
    "primaryPercentages": {
      "ALP": 25.6,
      "COALITION": 16.9,
      "GRN": 2.9,
      "ON": 0,
      "OTH": 17.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 45.3,
        "toCoalition": 10.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 44.3
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 41,
        "toCoalition": 48.5,
        "toGreens": 10.5,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27134,
      "coalition": 20264,
      "alpPercent": 57.2,
      "coalitionPercent": 42.8
    }
  },
  "bulleen": {
    "electorateId": "bulleen",
    "name": "Bulleen",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 85918,
    "primaryVotes": {
      "ALP": 14829,
      "COALITION": 22374,
      "GRN": 5756,
      "ON": 0,
      "OTH": 3686
    },
    "primaryPercentages": {
      "ALP": 17.3,
      "COALITION": 26,
      "GRN": 6.7,
      "ON": 0,
      "OTH": 4.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.1,
        "toCoalition": 46.9,
        "toGreens": 32,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 20664,
      "coalition": 25981,
      "alpPercent": 44.3,
      "coalitionPercent": 55.7
    }
  },
  "croydon": {
    "electorateId": "croydon",
    "name": "Croydon",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 91278,
    "primaryVotes": {
      "ALP": 22193,
      "COALITION": 23446,
      "GRN": 4940,
      "ON": 0,
      "OTH": 5530
    },
    "primaryPercentages": {
      "ALP": 24.3,
      "COALITION": 25.7,
      "GRN": 5.4,
      "ON": 0,
      "OTH": 6.1
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 76.3,
        "toCoalition": 23.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 29.1,
        "toCoalition": 41.2,
        "toGreens": 29.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28251,
      "coalition": 27858,
      "alpPercent": 50.4,
      "coalitionPercent": 49.6
    }
  },
  "warrandyte": {
    "electorateId": "warrandyte",
    "name": "Warrandyte",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90150,
    "primaryVotes": {
      "ALP": 15495,
      "COALITION": 23112,
      "GRN": 6468,
      "ON": 0,
      "OTH": 3502
    },
    "primaryPercentages": {
      "ALP": 17.2,
      "COALITION": 25.6,
      "GRN": 7.2,
      "ON": 0,
      "OTH": 3.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 15.7,
        "toCoalition": 50.5,
        "toGreens": 33.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 21597,
      "coalition": 26980,
      "alpPercent": 44.5,
      "coalitionPercent": 55.5
    }
  },
  "ferntree_gully": {
    "electorateId": "ferntree_gully",
    "name": "Ferntree Gully",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 85198,
    "primaryVotes": {
      "ALP": 23101,
      "COALITION": 19498,
      "GRN": 3151,
      "ON": 0,
      "OTH": 6665
    },
    "primaryPercentages": {
      "ALP": 27.1,
      "COALITION": 22.9,
      "GRN": 3.7,
      "ON": 0,
      "OTH": 7.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 74.3,
        "toCoalition": 25.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 23.5,
        "toCoalition": 44.5,
        "toGreens": 32,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27746,
      "coalition": 24669,
      "alpPercent": 52.9,
      "coalitionPercent": 47.1
    }
  },
  "box_hill": {
    "electorateId": "box_hill",
    "name": "Box Hill",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 88712,
    "primaryVotes": {
      "ALP": 25383,
      "COALITION": 18973,
      "GRN": 6267,
      "ON": 0,
      "OTH": 4156
    },
    "primaryPercentages": {
      "ALP": 28.6,
      "COALITION": 21.4,
      "GRN": 7.1,
      "ON": 0,
      "OTH": 4.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 82.2,
        "toCoalition": 17.8,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.5,
        "toCoalition": 49.2,
        "toGreens": 29.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31798,
      "coalition": 22981,
      "alpPercent": 58,
      "coalitionPercent": 42
    }
  },
  "ringwood": {
    "electorateId": "ringwood",
    "name": "Ringwood",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 91506,
    "primaryVotes": {
      "ALP": 26322,
      "COALITION": 19431,
      "GRN": 7105,
      "ON": 0,
      "OTH": 5330
    },
    "primaryPercentages": {
      "ALP": 28.8,
      "COALITION": 21.2,
      "GRN": 7.8,
      "ON": 0,
      "OTH": 5.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 80.6,
        "toCoalition": 19.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.7,
        "toCoalition": 42.7,
        "toGreens": 29.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 34146,
      "coalition": 24042,
      "alpPercent": 58.7,
      "coalitionPercent": 41.3
    }
  },
  "bayswater": {
    "electorateId": "bayswater",
    "name": "Bayswater",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 85198,
    "primaryVotes": {
      "ALP": 23101,
      "COALITION": 19498,
      "GRN": 3151,
      "ON": 0,
      "OTH": 6665
    },
    "primaryPercentages": {
      "ALP": 27.1,
      "COALITION": 22.9,
      "GRN": 3.7,
      "ON": 0,
      "OTH": 7.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 74.3,
        "toCoalition": 25.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 23.5,
        "toCoalition": 44.5,
        "toGreens": 32,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27746,
      "coalition": 24669,
      "alpPercent": 52.9,
      "coalitionPercent": 47.1
    }
  },
  "glen_waverley": {
    "electorateId": "glen_waverley",
    "name": "Glen Waverley",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 89334,
    "primaryVotes": {
      "ALP": 23809,
      "COALITION": 20858,
      "GRN": 4279,
      "ON": 0,
      "OTH": 4294
    },
    "primaryPercentages": {
      "ALP": 26.7,
      "COALITION": 23.3,
      "GRN": 4.8,
      "ON": 0,
      "OTH": 4.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 80.6,
        "toCoalition": 19.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.5,
        "toCoalition": 41.4,
        "toGreens": 37.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28726,
      "coalition": 24514,
      "alpPercent": 54,
      "coalitionPercent": 46
    }
  },
  "ashwood": {
    "electorateId": "ashwood",
    "name": "Ashwood",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 89420,
    "primaryVotes": {
      "ALP": 25106,
      "COALITION": 19604,
      "GRN": 6612,
      "ON": 0,
      "OTH": 3466
    },
    "primaryPercentages": {
      "ALP": 28.1,
      "COALITION": 21.9,
      "GRN": 7.4,
      "ON": 0,
      "OTH": 3.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 83.6,
        "toCoalition": 16.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 16.7,
        "toCoalition": 49.3,
        "toGreens": 34,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31511,
      "coalition": 23277,
      "alpPercent": 57.5,
      "coalitionPercent": 42.5
    }
  },
  "eltham": {
    "electorateId": "eltham",
    "name": "Eltham",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 87688,
    "primaryVotes": {
      "ALP": 25870,
      "COALITION": 17974,
      "GRN": 5897,
      "ON": 0,
      "OTH": 2823
    },
    "primaryPercentages": {
      "ALP": 29.5,
      "COALITION": 20.5,
      "GRN": 6.7,
      "ON": 0,
      "OTH": 3.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 85,
        "toCoalition": 15,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.3,
        "toCoalition": 47.3,
        "toGreens": 33.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31701,
      "coalition": 20863,
      "alpPercent": 60.3,
      "coalitionPercent": 39.7
    }
  },
  "ivanhoe": {
    "electorateId": "ivanhoe",
    "name": "Ivanhoe",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81198,
    "primaryVotes": {
      "ALP": 25476,
      "COALITION": 15123,
      "GRN": 7808,
      "ON": 0,
      "OTH": 2892
    },
    "primaryPercentages": {
      "ALP": 31.4,
      "COALITION": 18.6,
      "GRN": 9.6,
      "ON": 0,
      "OTH": 3.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 85.2,
        "toCoalition": 14.8,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.7,
        "toCoalition": 43.2,
        "toGreens": 36.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 33065,
      "coalition": 18234,
      "alpPercent": 64.5,
      "coalitionPercent": 35.5
    }
  },
  "brighton": {
    "electorateId": "brighton",
    "name": "Brighton",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 82392,
    "primaryVotes": {
      "ALP": 11850,
      "COALITION": 20730,
      "GRN": 8616,
      "ON": 0,
      "OTH": 6561
    },
    "primaryPercentages": {
      "ALP": 14.4,
      "COALITION": 25.2,
      "GRN": 10.5,
      "ON": 0,
      "OTH": 8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 25.7,
        "toCoalition": 29.6,
        "toGreens": 44.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 21921,
      "coalition": 25836,
      "alpPercent": 45.9,
      "coalitionPercent": 54.1
    }
  },
  "caulfield": {
    "electorateId": "caulfield",
    "name": "Caulfield",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81366,
    "primaryVotes": {
      "ALP": 19500,
      "COALITION": 21922,
      "GRN": 6447,
      "ON": 0,
      "OTH": 4108
    },
    "primaryPercentages": {
      "ALP": 24,
      "COALITION": 26.9,
      "GRN": 7.9,
      "ON": 0,
      "OTH": 5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 24.3,
        "toCoalition": 0,
        "toGreens": 15.1,
        "toOneNation": 0,
        "toOther": 60.6
      },
      "GRN": {
        "toALP": 82.5,
        "toCoalition": 17.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 26.5,
        "toCoalition": 26.4,
        "toGreens": 47.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26877,
      "coalition": 25100,
      "alpPercent": 51.7,
      "coalitionPercent": 48.3
    }
  },
  "hawthorn": {
    "electorateId": "hawthorn",
    "name": "Hawthorn",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 88620,
    "primaryVotes": {
      "ALP": 21383,
      "COALITION": 23510,
      "GRN": 4927,
      "ON": 0,
      "OTH": 10273
    },
    "primaryPercentages": {
      "ALP": 24.1,
      "COALITION": 26.5,
      "GRN": 5.6,
      "ON": 0,
      "OTH": 11.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 29.8,
        "toCoalition": 0,
        "toGreens": 16.7,
        "toOneNation": 0,
        "toOther": 53.5
      },
      "GRN": {
        "toALP": 37,
        "toCoalition": 9.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 53.7
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 72.2,
        "toCoalition": 25.5,
        "toGreens": 2.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 32912,
      "coalition": 27181,
      "alpPercent": 54.8,
      "coalitionPercent": 45.2
    }
  },
  "kew": {
    "electorateId": "kew",
    "name": "Kew",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 87184,
    "primaryVotes": {
      "ALP": 20063,
      "COALITION": 23529,
      "GRN": 3612,
      "ON": 0,
      "OTH": 10763
    },
    "primaryPercentages": {
      "ALP": 23,
      "COALITION": 27,
      "GRN": 4.1,
      "ON": 0,
      "OTH": 12.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 40.7,
        "toCoalition": 11.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 47.9
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 67.8,
        "toCoalition": 29.8,
        "toGreens": 2.5,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 30367,
      "coalition": 27600,
      "alpPercent": 52.4,
      "coalitionPercent": 47.6
    }
  },
  "malvern": {
    "electorateId": "malvern",
    "name": "Malvern",
    "region": "southern_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 81551,
    "primaryVotes": {
      "ALP": 17000,
      "COALITION": 23750,
      "GRN": 6390,
      "ON": 0,
      "OTH": 2287
    },
    "primaryPercentages": {
      "ALP": 20.8,
      "COALITION": 29.1,
      "GRN": 7.8,
      "ON": 0,
      "OTH": 2.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 17.1,
        "toGreens": 82.9,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 20.8,
        "toCoalition": 0,
        "toGreens": 14.3,
        "toOneNation": 0,
        "toOther": 64.8
      },
      "GRN": {
        "toALP": 69.4,
        "toCoalition": 16.1,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 14.5
      },
      "ON": {
        "toALP": 19.3,
        "toCoalition": 72.5,
        "toGreens": 8.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 32.6,
        "toCoalition": 35.8,
        "toGreens": 31.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 23397,
      "coalition": 26030,
      "alpPercent": 47.3,
      "coalitionPercent": 52.7
    }
  },
  "sandringham": {
    "electorateId": "sandringham",
    "name": "Sandringham",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81024,
    "primaryVotes": {
      "ALP": 11825,
      "COALITION": 20737,
      "GRN": 7950,
      "ON": 0,
      "OTH": 5354
    },
    "primaryPercentages": {
      "ALP": 14.6,
      "COALITION": 25.6,
      "GRN": 9.8,
      "ON": 0,
      "OTH": 6.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 26.1,
        "toCoalition": 36.5,
        "toGreens": 37.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 20537,
      "coalition": 25329,
      "alpPercent": 44.8,
      "coalitionPercent": 55.2
    }
  },
  "prahran": {
    "electorateId": "prahran",
    "name": "Prahran",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 117729,
    "primaryVotes": {
      "ALP": 10421,
      "COALITION": 14909,
      "GRN": 24334,
      "ON": 0,
      "OTH": 41581
    },
    "primaryPercentages": {
      "ALP": 8.9,
      "COALITION": 12.7,
      "GRN": 20.7,
      "ON": 0,
      "OTH": 35.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 17.1,
        "toGreens": 82.9,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 17.3,
        "toCoalition": 36.7,
        "toGreens": 45.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 43575,
      "coalition": 47670,
      "alpPercent": 47.8,
      "coalitionPercent": 52.2
    }
  },
  "albert_park": {
    "electorateId": "albert_park",
    "name": "Albert Park",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 78220,
    "primaryVotes": {
      "ALP": 23916,
      "COALITION": 15728,
      "GRN": 8178,
      "ON": 0,
      "OTH": 4485
    },
    "primaryPercentages": {
      "ALP": 30.6,
      "COALITION": 20.1,
      "GRN": 10.5,
      "ON": 0,
      "OTH": 5.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 8.4,
        "toCoalition": 0,
        "toGreens": 11.2,
        "toOneNation": 0,
        "toOther": 80.4
      },
      "GRN": {
        "toALP": 83.8,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 24.4,
        "toCoalition": 35,
        "toGreens": 40.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 32611,
      "coalition": 19696,
      "alpPercent": 62.3,
      "coalitionPercent": 37.7
    }
  },
  "bentleigh": {
    "electorateId": "bentleigh",
    "name": "Bentleigh",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90240,
    "primaryVotes": {
      "ALP": 26188,
      "COALITION": 18932,
      "GRN": 4845,
      "ON": 0,
      "OTH": 3218
    },
    "primaryPercentages": {
      "ALP": 29,
      "COALITION": 21,
      "GRN": 5.4,
      "ON": 0,
      "OTH": 3.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 81,
        "toCoalition": 19,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.1,
        "toCoalition": 43.1,
        "toGreens": 36.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31136,
      "coalition": 22047,
      "alpPercent": 58.5,
      "coalitionPercent": 41.5
    }
  },
  "oakleigh": {
    "electorateId": "oakleigh",
    "name": "Oakleigh",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 87820,
    "primaryVotes": {
      "ALP": 27876,
      "COALITION": 16034,
      "GRN": 7278,
      "ON": 0,
      "OTH": 4006
    },
    "primaryPercentages": {
      "ALP": 31.7,
      "COALITION": 18.3,
      "GRN": 8.3,
      "ON": 0,
      "OTH": 4.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 84,
        "toCoalition": 16,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 22,
        "toCoalition": 45.1,
        "toGreens": 32.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 35303,
      "coalition": 19891,
      "alpPercent": 64,
      "coalitionPercent": 36
    }
  },
  "mordialloc": {
    "electorateId": "mordialloc",
    "name": "Mordialloc",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 88118,
    "primaryVotes": {
      "ALP": 25640,
      "COALITION": 18419,
      "GRN": 4526,
      "ON": 0,
      "OTH": 6306
    },
    "primaryPercentages": {
      "ALP": 29.1,
      "COALITION": 20.9,
      "GRN": 5.1,
      "ON": 0,
      "OTH": 7.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 76.8,
        "toCoalition": 23.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 24,
        "toCoalition": 50.1,
        "toGreens": 25.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31158,
      "coalition": 23733,
      "alpPercent": 56.8,
      "coalitionPercent": 43.2
    }
  },
  "footscray": {
    "electorateId": "footscray",
    "name": "Footscray",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 121020,
    "primaryVotes": {
      "ALP": 21880,
      "COALITION": 7214,
      "GRN": 18460,
      "ON": 0,
      "OTH": 47034
    },
    "primaryPercentages": {
      "ALP": 18.1,
      "COALITION": 6,
      "GRN": 15.3,
      "ON": 0,
      "OTH": 38.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 37,
        "toCoalition": 0,
        "toGreens": 63,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.2,
        "toCoalition": 19.2,
        "toGreens": 60.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 61039,
      "coalition": 33549,
      "alpPercent": 64.5,
      "coalitionPercent": 35.5
    }
  },
  "kororoit": {
    "electorateId": "kororoit",
    "name": "Kororoit",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 80746,
    "primaryVotes": {
      "ALP": 21452,
      "COALITION": 12533,
      "GRN": 2650,
      "ON": 0,
      "OTH": 14074
    },
    "primaryPercentages": {
      "ALP": 26.6,
      "COALITION": 15.5,
      "GRN": 3.3,
      "ON": 0,
      "OTH": 17.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 42.8,
        "toCoalition": 16.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 40.9
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 48.5,
        "toCoalition": 41,
        "toGreens": 10.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 30995,
      "coalition": 19714,
      "alpPercent": 61.1,
      "coalitionPercent": 38.9
    }
  },
  "laverton": {
    "electorateId": "laverton",
    "name": "Laverton",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 74274,
    "primaryVotes": {
      "ALP": 19364,
      "COALITION": 10321,
      "GRN": 7452,
      "ON": 0,
      "OTH": 8382
    },
    "primaryPercentages": {
      "ALP": 26.1,
      "COALITION": 13.9,
      "GRN": 10,
      "ON": 0,
      "OTH": 11.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.9,
        "toCoalition": 24.9,
        "toGreens": 47.2,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29867,
      "coalition": 15652,
      "alpPercent": 65.6,
      "coalitionPercent": 34.4
    }
  },
  "st_albans": {
    "electorateId": "st_albans",
    "name": "St Albans",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 71432,
    "primaryVotes": {
      "ALP": 21274,
      "COALITION": 14442,
      "GRN": 2416,
      "ON": 0,
      "OTH": 9140
    },
    "primaryPercentages": {
      "ALP": 29.8,
      "COALITION": 20.2,
      "GRN": 3.4,
      "ON": 0,
      "OTH": 12.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 71.6,
        "toCoalition": 28.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.4,
        "toCoalition": 42.9,
        "toGreens": 29.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26566,
      "coalition": 20706,
      "alpPercent": 56.2,
      "coalitionPercent": 43.8
    }
  },
  "sydenham": {
    "electorateId": "sydenham",
    "name": "Sydenham",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 87330,
    "primaryVotes": {
      "ALP": 22648,
      "COALITION": 14584,
      "GRN": 2547,
      "ON": 0,
      "OTH": 13094
    },
    "primaryPercentages": {
      "ALP": 25.9,
      "COALITION": 16.7,
      "GRN": 2.9,
      "ON": 0,
      "OTH": 15
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 55.8,
        "toCoalition": 18.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 25.6
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 29.8,
        "toCoalition": 26.8,
        "toGreens": 43.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31455,
      "coalition": 21418,
      "alpPercent": 59.5,
      "coalitionPercent": 40.5
    }
  },
  "tarneit": {
    "electorateId": "tarneit",
    "name": "Tarneit",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 77956,
    "primaryVotes": {
      "ALP": 19649,
      "COALITION": 11774,
      "GRN": 4329,
      "ON": 0,
      "OTH": 8733
    },
    "primaryPercentages": {
      "ALP": 25.2,
      "COALITION": 15.1,
      "GRN": 5.6,
      "ON": 0,
      "OTH": 11.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 34.7,
        "toCoalition": 31.4,
        "toGreens": 34,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27762,
      "coalition": 16723,
      "alpPercent": 62.4,
      "coalitionPercent": 37.6
    }
  },
  "williamstown": {
    "electorateId": "williamstown",
    "name": "Williamstown",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 77948,
    "primaryVotes": {
      "ALP": 24726,
      "COALITION": 14248,
      "GRN": 6013,
      "ON": 0,
      "OTH": 5860
    },
    "primaryPercentages": {
      "ALP": 31.7,
      "COALITION": 18.3,
      "GRN": 7.7,
      "ON": 0,
      "OTH": 7.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 85.9,
        "toCoalition": 14.1,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 23.5,
        "toCoalition": 36.6,
        "toGreens": 39.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 32183,
      "coalition": 18664,
      "alpPercent": 63.3,
      "coalitionPercent": 36.7
    }
  },
  "point_cook": {
    "electorateId": "point_cook",
    "name": "Point Cook",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 78198,
    "primaryVotes": {
      "ALP": 22810,
      "COALITION": 16289,
      "GRN": 2657,
      "ON": 0,
      "OTH": 11134
    },
    "primaryPercentages": {
      "ALP": 29.2,
      "COALITION": 20.8,
      "GRN": 3.4,
      "ON": 0,
      "OTH": 14.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 55.7,
        "toCoalition": 44.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.8,
        "toCoalition": 30.6,
        "toGreens": 41.5,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29590,
      "coalition": 23300,
      "alpPercent": 55.9,
      "coalitionPercent": 44.1
    }
  },
  "werribee": {
    "electorateId": "werribee",
    "name": "Werribee",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 77206,
    "primaryVotes": {
      "ALP": 19912,
      "COALITION": 13483,
      "GRN": 5208,
      "ON": 0,
      "OTH": 8699
    },
    "primaryPercentages": {
      "ALP": 25.8,
      "COALITION": 17.5,
      "GRN": 6.7,
      "ON": 0,
      "OTH": 11.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 27.6,
        "toCoalition": 42.6,
        "toGreens": 29.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27577,
      "coalition": 19725,
      "alpPercent": 58.3,
      "coalitionPercent": 41.7
    }
  },
  "melton": {
    "electorateId": "melton",
    "name": "Melton",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 75238,
    "primaryVotes": {
      "ALP": 20538,
      "COALITION": 17081,
      "GRN": 1711,
      "ON": 0,
      "OTH": 12560
    },
    "primaryPercentages": {
      "ALP": 27.3,
      "COALITION": 22.7,
      "GRN": 2.3,
      "ON": 0,
      "OTH": 16.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 53.3,
        "toCoalition": 10,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 36.7
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 36.9,
        "toCoalition": 56.8,
        "toGreens": 6.2,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26925,
      "coalition": 24965,
      "alpPercent": 51.9,
      "coalitionPercent": 48.1
    }
  },
  "niddrie": {
    "electorateId": "niddrie",
    "name": "Niddrie",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 84484,
    "primaryVotes": {
      "ALP": 23949,
      "COALITION": 18293,
      "GRN": 3117,
      "ON": 0,
      "OTH": 6214
    },
    "primaryPercentages": {
      "ALP": 28.3,
      "COALITION": 21.7,
      "GRN": 3.7,
      "ON": 0,
      "OTH": 7.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 71.5,
        "toCoalition": 28.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 31.5,
        "toCoalition": 41.6,
        "toGreens": 26.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28855,
      "coalition": 22718,
      "alpPercent": 56,
      "coalitionPercent": 44
    }
  },
  "rowville": {
    "electorateId": "rowville",
    "name": "Rowville",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 86738,
    "primaryVotes": {
      "ALP": 20095,
      "COALITION": 23274,
      "GRN": 3055,
      "ON": 0,
      "OTH": 8431
    },
    "primaryPercentages": {
      "ALP": 23.2,
      "COALITION": 26.8,
      "GRN": 3.5,
      "ON": 0,
      "OTH": 9.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 66.6,
        "toCoalition": 14.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 18.9
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 36.6,
        "toCoalition": 56.2,
        "toGreens": 7.2,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 25926,
      "coalition": 28929,
      "alpPercent": 47.3,
      "coalitionPercent": 52.7
    }
  },
  "berwick": {
    "electorateId": "berwick",
    "name": "Berwick",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 88578,
    "primaryVotes": {
      "ALP": 16503,
      "COALITION": 22192,
      "GRN": 5594,
      "ON": 0,
      "OTH": 4087
    },
    "primaryPercentages": {
      "ALP": 18.6,
      "COALITION": 25.1,
      "GRN": 6.3,
      "ON": 0,
      "OTH": 4.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 15.4,
        "toCoalition": 52.9,
        "toGreens": 31.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 21984,
      "coalition": 26392,
      "alpPercent": 45.4,
      "coalitionPercent": 54.6
    }
  },
  "carrum": {
    "electorateId": "carrum",
    "name": "Carrum",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 86600,
    "primaryVotes": {
      "ALP": 21666,
      "COALITION": 13247,
      "GRN": 3341,
      "ON": 0,
      "OTH": 6032
    },
    "primaryPercentages": {
      "ALP": 25,
      "COALITION": 15.3,
      "GRN": 3.9,
      "ON": 0,
      "OTH": 7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 32.7,
        "toCoalition": 43.3,
        "toGreens": 24.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26984,
      "coalition": 17302,
      "alpPercent": 60.9,
      "coalitionPercent": 39.1
    }
  },
  "cranbourne": {
    "electorateId": "cranbourne",
    "name": "Cranbourne",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81644,
    "primaryVotes": {
      "ALP": 21931,
      "COALITION": 12973,
      "GRN": 2282,
      "ON": 0,
      "OTH": 12126
    },
    "primaryPercentages": {
      "ALP": 26.9,
      "COALITION": 15.9,
      "GRN": 2.8,
      "ON": 0,
      "OTH": 14.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 56.3,
        "toCoalition": 12.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 31.4
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 35.6,
        "toCoalition": 37.9,
        "toGreens": 26.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29677,
      "coalition": 19635,
      "alpPercent": 60.2,
      "coalitionPercent": 39.8
    }
  },
  "dandenong": {
    "electorateId": "dandenong",
    "name": "Dandenong",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 79142,
    "primaryVotes": {
      "ALP": 27390,
      "COALITION": 13206,
      "GRN": 3215,
      "ON": 0,
      "OTH": 5179
    },
    "primaryPercentages": {
      "ALP": 34.6,
      "COALITION": 16.7,
      "GRN": 4.1,
      "ON": 0,
      "OTH": 6.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 29.5,
        "toGreens": 20.7,
        "toOneNation": 0,
        "toOther": 49.8
      },
      "COALITION": {
        "toALP": 10.6,
        "toCoalition": 0,
        "toGreens": 6.8,
        "toOneNation": 0,
        "toOther": 82.6
      },
      "GRN": {
        "toALP": 64.8,
        "toCoalition": 15.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 19.6
      },
      "ON": {
        "toALP": 19.3,
        "toCoalition": 72.5,
        "toGreens": 8.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 30.1,
        "toCoalition": 41.3,
        "toGreens": 28.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 32703,
      "coalition": 16287,
      "alpPercent": 66.8,
      "coalitionPercent": 33.2
    }
  },
  "frankston": {
    "electorateId": "frankston",
    "name": "Frankston",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 79882,
    "primaryVotes": {
      "ALP": 23429,
      "COALITION": 17932,
      "GRN": 5060,
      "ON": 0,
      "OTH": 5104
    },
    "primaryPercentages": {
      "ALP": 29.3,
      "COALITION": 22.4,
      "GRN": 6.3,
      "ON": 0,
      "OTH": 6.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 7.6,
        "toCoalition": 0,
        "toGreens": 6.9,
        "toOneNation": 0,
        "toOther": 85.5
      },
      "GRN": {
        "toALP": 78.5,
        "toCoalition": 21.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 14.7,
        "toCoalition": 46.6,
        "toGreens": 38.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28625,
      "coalition": 22900,
      "alpPercent": 55.6,
      "coalitionPercent": 44.4
    }
  },
  "mulgrave": {
    "electorateId": "mulgrave",
    "name": "Mulgrave",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 76138,
    "primaryVotes": {
      "ALP": 22976,
      "COALITION": 15191,
      "GRN": 1930,
      "ON": 0,
      "OTH": 10148
    },
    "primaryPercentages": {
      "ALP": 30.2,
      "COALITION": 20,
      "GRN": 2.5,
      "ON": 0,
      "OTH": 13.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 29.5,
        "toGreens": 20.7,
        "toOneNation": 0,
        "toOther": 49.8
      },
      "COALITION": {
        "toALP": 10.6,
        "toCoalition": 0,
        "toGreens": 6.8,
        "toOneNation": 0,
        "toOther": 82.6
      },
      "GRN": {
        "toALP": 64.8,
        "toCoalition": 15.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 19.6
      },
      "ON": {
        "toALP": 19.3,
        "toCoalition": 72.5,
        "toGreens": 8.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 30.1,
        "toCoalition": 41.3,
        "toGreens": 28.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29826,
      "coalition": 20419,
      "alpPercent": 59.4,
      "coalitionPercent": 40.6
    }
  },
  "narre_warren_n": {
    "electorateId": "narre_warren_n",
    "name": "Narre Warren North",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 82740,
    "primaryVotes": {
      "ALP": 22764,
      "COALITION": 14862,
      "GRN": 2809,
      "ON": 0,
      "OTH": 10134
    },
    "primaryPercentages": {
      "ALP": 27.5,
      "COALITION": 18,
      "GRN": 3.4,
      "ON": 0,
      "OTH": 12.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 14.2,
        "toCoalition": 0,
        "toGreens": 6,
        "toOneNation": 0,
        "toOther": 79.7
      },
      "GRN": {
        "toALP": 60.6,
        "toCoalition": 16.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 22.8
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 38,
        "toCoalition": 41.1,
        "toGreens": 20.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29840,
      "coalition": 20729,
      "alpPercent": 59,
      "coalitionPercent": 41
    }
  },
  "narre_warren_s": {
    "electorateId": "narre_warren_s",
    "name": "Narre Warren South",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 85718,
    "primaryVotes": {
      "ALP": 23247,
      "COALITION": 15027,
      "GRN": 2836,
      "ON": 0,
      "OTH": 9271
    },
    "primaryPercentages": {
      "ALP": 27.1,
      "COALITION": 17.5,
      "GRN": 3.3,
      "ON": 0,
      "OTH": 10.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 9.9,
        "toCoalition": 0,
        "toGreens": 7.5,
        "toOneNation": 0,
        "toOther": 82.6
      },
      "GRN": {
        "toALP": 59.3,
        "toCoalition": 13.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 27.2
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 24.7,
        "toCoalition": 33.6,
        "toGreens": 41.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29485,
      "coalition": 20896,
      "alpPercent": 58.5,
      "coalitionPercent": 41.5
    }
  },
  "keysborough": {
    "electorateId": "keysborough",
    "name": "Keysborough",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81128,
    "primaryVotes": {
      "ALP": 21954,
      "COALITION": 12921,
      "GRN": 3227,
      "ON": 0,
      "OTH": 9825
    },
    "primaryPercentages": {
      "ALP": 27.1,
      "COALITION": 15.9,
      "GRN": 4,
      "ON": 0,
      "OTH": 12.1
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 66.2,
        "toCoalition": 15.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 18.3
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 36.6,
        "toCoalition": 30,
        "toGreens": 33.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29965,
      "coalition": 17962,
      "alpPercent": 62.5,
      "coalitionPercent": 37.5
    }
  },
  "clarinda": {
    "electorateId": "clarinda",
    "name": "Clarinda",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81128,
    "primaryVotes": {
      "ALP": 21954,
      "COALITION": 12921,
      "GRN": 3227,
      "ON": 0,
      "OTH": 9825
    },
    "primaryPercentages": {
      "ALP": 27.1,
      "COALITION": 15.9,
      "GRN": 4,
      "ON": 0,
      "OTH": 12.1
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 66.2,
        "toCoalition": 15.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 18.3
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 36.6,
        "toCoalition": 30,
        "toGreens": 33.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 29965,
      "coalition": 17962,
      "alpPercent": 62.5,
      "coalitionPercent": 37.5
    }
  },
  "benalla": {
    "electorateId": "benalla",
    "name": "Benalla",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 84484,
    "primaryVotes": {
      "ALP": 16926,
      "COALITION": 34543,
      "GRN": 2245,
      "ON": 0,
      "OTH": 4434
    },
    "primaryPercentages": {
      "ALP": 20,
      "COALITION": 40.9,
      "GRN": 2.7,
      "ON": 0,
      "OTH": 5.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 66.2,
        "toCoalition": 19.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 14.4
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.7,
        "toCoalition": 71,
        "toGreens": 9.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 19627,
      "coalition": 38521,
      "alpPercent": 33.8,
      "coalitionPercent": 66.2
    }
  },
  "euroa": {
    "electorateId": "euroa",
    "name": "Euroa",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 84484,
    "primaryVotes": {
      "ALP": 16926,
      "COALITION": 34543,
      "GRN": 2245,
      "ON": 0,
      "OTH": 4434
    },
    "primaryPercentages": {
      "ALP": 20,
      "COALITION": 40.9,
      "GRN": 2.7,
      "ON": 0,
      "OTH": 5.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 66.2,
        "toCoalition": 19.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 14.4
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.7,
        "toCoalition": 71,
        "toGreens": 9.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 19627,
      "coalition": 38521,
      "alpPercent": 33.8,
      "coalitionPercent": 66.2
    }
  },
  "mildura": {
    "electorateId": "mildura",
    "name": "Mildura",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 114420,
    "primaryVotes": {
      "ALP": 2483,
      "COALITION": 26811,
      "GRN": 894,
      "ON": 0,
      "OTH": 61451
    },
    "primaryPercentages": {
      "ALP": 2.2,
      "COALITION": 23.4,
      "GRN": 0.8,
      "ON": 0,
      "OTH": 53.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 39.7,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 60.3
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 100
      },
      "GRN": {
        "toALP": 24.9,
        "toCoalition": 18.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 56.8
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 15,
        "toCoalition": 79.6,
        "toGreens": 5.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 12743,
      "coalition": 78896,
      "alpPercent": 13.9,
      "coalitionPercent": 86.1
    }
  },
  "murray_plains": {
    "electorateId": "murray_plains",
    "name": "Murray Plains",
    "region": "northern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 80464,
    "primaryVotes": {
      "ALP": 10919,
      "COALITION": 29354,
      "GRN": 1560,
      "ON": 0,
      "OTH": 6257
    },
    "primaryPercentages": {
      "ALP": 13.6,
      "COALITION": 36.5,
      "GRN": 1.9,
      "ON": 0,
      "OTH": 7.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 42.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 57.7
      },
      "COALITION": {
        "toALP": 50,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 50
      },
      "GRN": {
        "toALP": 56.4,
        "toCoalition": 19.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 24.3
      },
      "ON": {
        "toALP": 20.2,
        "toCoalition": 63.5,
        "toGreens": 16.3,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.7,
        "toCoalition": 52.2,
        "toGreens": 17.5,
        "toOneNation": 8.7,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 15444,
      "coalition": 32646,
      "alpPercent": 32.1,
      "coalitionPercent": 67.9
    }
  },
  "ovens_valley": {
    "electorateId": "ovens_valley",
    "name": "Ovens Valley",
    "region": "northern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 80844,
    "primaryVotes": {
      "ALP": 12959,
      "COALITION": 30490,
      "GRN": 3625,
      "ON": 0,
      "OTH": 4344
    },
    "primaryPercentages": {
      "ALP": 16,
      "COALITION": 37.7,
      "GRN": 4.5,
      "ON": 0,
      "OTH": 5.4
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 42.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 57.7
      },
      "COALITION": {
        "toALP": 50,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 50
      },
      "GRN": {
        "toALP": 56.4,
        "toCoalition": 19.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 24.3
      },
      "ON": {
        "toALP": 20.2,
        "toCoalition": 63.5,
        "toGreens": 16.3,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.7,
        "toCoalition": 52.2,
        "toGreens": 17.5,
        "toOneNation": 8.7,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 18172,
      "coalition": 33246,
      "alpPercent": 35.3,
      "coalitionPercent": 64.7
    }
  },
  "shepparton": {
    "electorateId": "shepparton",
    "name": "Shepparton",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 123903,
    "primaryVotes": {
      "ALP": 3285,
      "COALITION": 31946,
      "GRN": 1056,
      "ON": 0,
      "OTH": 62228
    },
    "primaryPercentages": {
      "ALP": 2.7,
      "COALITION": 25.8,
      "GRN": 0.9,
      "ON": 0,
      "OTH": 50.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 44.9,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 55.1
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 100
      },
      "GRN": {
        "toALP": 35.5,
        "toCoalition": 30.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 34.3
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.3,
        "toCoalition": 67.8,
        "toGreens": 10.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 18732,
      "coalition": 79783,
      "alpPercent": 19,
      "coalitionPercent": 81
    }
  },
  "swan_hill": {
    "electorateId": "swan_hill",
    "name": "Swan Hill",
    "region": "northern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 80464,
    "primaryVotes": {
      "ALP": 10919,
      "COALITION": 29354,
      "GRN": 1560,
      "ON": 0,
      "OTH": 6257
    },
    "primaryPercentages": {
      "ALP": 13.6,
      "COALITION": 36.5,
      "GRN": 1.9,
      "ON": 0,
      "OTH": 7.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 42.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 57.7
      },
      "COALITION": {
        "toALP": 50,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 50
      },
      "GRN": {
        "toALP": 56.4,
        "toCoalition": 19.3,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 24.3
      },
      "ON": {
        "toALP": 20.2,
        "toCoalition": 63.5,
        "toGreens": 16.3,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.7,
        "toCoalition": 52.2,
        "toGreens": 17.5,
        "toOneNation": 8.7,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 15444,
      "coalition": 32646,
      "alpPercent": 32.1,
      "coalitionPercent": 67.9
    }
  },
  "bendigo_east": {
    "electorateId": "bendigo_east",
    "name": "Bendigo East",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 91136,
    "primaryVotes": {
      "ALP": 22802,
      "COALITION": 13450,
      "GRN": 4929,
      "ON": 4387,
      "OTH": 4539
    },
    "primaryPercentages": {
      "ALP": 25,
      "COALITION": 14.8,
      "GRN": 5.4,
      "ON": 4.8,
      "OTH": 5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 17.4,
        "toCoalition": 21.4,
        "toGreens": 21.7,
        "toOneNation": 39.4,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 30302,
      "coalition": 19805,
      "alpPercent": 60.5,
      "coalitionPercent": 39.5
    }
  },
  "bendigo_west": {
    "electorateId": "bendigo_west",
    "name": "Bendigo West",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 80496,
    "primaryVotes": {
      "ALP": 20396,
      "COALITION": 13233,
      "GRN": 6619,
      "ON": 0,
      "OTH": 6853
    },
    "primaryPercentages": {
      "ALP": 25.3,
      "COALITION": 16.4,
      "GRN": 8.2,
      "ON": 0,
      "OTH": 8.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 24.7,
        "toCoalition": 46.3,
        "toGreens": 29,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28175,
      "coalition": 18926,
      "alpPercent": 59.8,
      "coalitionPercent": 40.2
    }
  },
  "macedon": {
    "electorateId": "macedon",
    "name": "Macedon",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 83178,
    "primaryVotes": {
      "ALP": 24762,
      "COALITION": 16827,
      "GRN": 5214,
      "ON": 1511,
      "OTH": 5167
    },
    "primaryPercentages": {
      "ALP": 29.8,
      "COALITION": 20.2,
      "GRN": 6.3,
      "ON": 1.8,
      "OTH": 6.2
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 83.5,
        "toCoalition": 16.5,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 20.2,
        "toCoalition": 63.5,
        "toGreens": 16.3,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.8,
        "toCoalition": 24.2,
        "toGreens": 25.8,
        "toOneNation": 30.2,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31806,
      "coalition": 21675,
      "alpPercent": 59.5,
      "coalitionPercent": 40.5
    }
  },
  "yan_yean": {
    "electorateId": "yan_yean",
    "name": "Yan Yean",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 78838,
    "primaryVotes": {
      "ALP": 19771,
      "COALITION": 15059,
      "GRN": 2537,
      "ON": 0,
      "OTH": 10498
    },
    "primaryPercentages": {
      "ALP": 25.1,
      "COALITION": 19.1,
      "GRN": 3.2,
      "ON": 0,
      "OTH": 13.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 61.8,
        "toCoalition": 12.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 25.8
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 35.9,
        "toCoalition": 35.9,
        "toGreens": 28.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 27133,
      "coalition": 20732,
      "alpPercent": 56.7,
      "coalitionPercent": 43.3
    }
  },
  "lowan": {
    "electorateId": "lowan",
    "name": "Lowan",
    "region": "western_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 86576,
    "primaryVotes": {
      "ALP": 12288,
      "COALITION": 30991,
      "GRN": 2575,
      "ON": 0,
      "OTH": 6686
    },
    "primaryPercentages": {
      "ALP": 14.2,
      "COALITION": 35.8,
      "GRN": 3,
      "ON": 0,
      "OTH": 7.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 29.5,
        "toGreens": 20.7,
        "toOneNation": 0,
        "toOther": 49.8
      },
      "COALITION": {
        "toALP": 39.1,
        "toCoalition": 0,
        "toGreens": 25,
        "toOneNation": 0,
        "toOther": 35.9
      },
      "GRN": {
        "toALP": 69.6,
        "toCoalition": 17.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 13
      },
      "ON": {
        "toALP": 19.3,
        "toCoalition": 72.5,
        "toGreens": 8.2,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 31.5,
        "toCoalition": 42.9,
        "toGreens": 25.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 17863,
      "coalition": 34677,
      "alpPercent": 34,
      "coalitionPercent": 66
    }
  },
  "polwarth": {
    "electorateId": "polwarth",
    "name": "Polwarth",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 92004,
    "primaryVotes": {
      "ALP": 22179,
      "COALITION": 23823,
      "GRN": 7661,
      "ON": 0,
      "OTH": 5317
    },
    "primaryPercentages": {
      "ALP": 24.1,
      "COALITION": 25.9,
      "GRN": 8.3,
      "ON": 0,
      "OTH": 5.8
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 82.6,
        "toCoalition": 17.4,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.4,
        "toCoalition": 50.7,
        "toGreens": 27.9,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 30085,
      "coalition": 28895,
      "alpPercent": 51,
      "coalitionPercent": 49
    }
  },
  "sw_coast": {
    "electorateId": "sw_coast",
    "name": "South-West Coast",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90992,
    "primaryVotes": {
      "ALP": 19086,
      "COALITION": 26410,
      "GRN": 2457,
      "ON": 0,
      "OTH": 13882
    },
    "primaryPercentages": {
      "ALP": 21,
      "COALITION": 29,
      "GRN": 2.7,
      "ON": 0,
      "OTH": 15.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 43.4,
        "toCoalition": 13,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 43.6
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 54.2,
        "toCoalition": 43.1,
        "toGreens": 2.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28710,
      "coalition": 33125,
      "alpPercent": 46.4,
      "coalitionPercent": 53.6
    }
  },
  "portland": {
    "electorateId": "portland",
    "name": "Portland Coast",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90992,
    "primaryVotes": {
      "ALP": 19086,
      "COALITION": 26410,
      "GRN": 2457,
      "ON": 0,
      "OTH": 13882
    },
    "primaryPercentages": {
      "ALP": 21,
      "COALITION": 29,
      "GRN": 2.7,
      "ON": 0,
      "OTH": 15.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 43.4,
        "toCoalition": 13,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 43.6
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 54.2,
        "toCoalition": 43.1,
        "toGreens": 2.8,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28710,
      "coalition": 33125,
      "alpPercent": 46.4,
      "coalitionPercent": 53.6
    }
  },
  "ballarat_east": {
    "electorateId": "ballarat_east",
    "name": "Ballarat East",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90494,
    "primaryVotes": {
      "ALP": 25869,
      "COALITION": 19378,
      "GRN": 4887,
      "ON": 0,
      "OTH": 7509
    },
    "primaryPercentages": {
      "ALP": 28.6,
      "COALITION": 21.4,
      "GRN": 5.4,
      "ON": 0,
      "OTH": 8.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 74.9,
        "toCoalition": 25.1,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 25.5,
        "toCoalition": 43.1,
        "toGreens": 31.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 32321,
      "coalition": 25322,
      "alpPercent": 56.1,
      "coalitionPercent": 43.9
    }
  },
  "ballarat_west": {
    "electorateId": "ballarat_west",
    "name": "Ballarat West",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 84350,
    "primaryVotes": {
      "ALP": 21423,
      "COALITION": 14783,
      "GRN": 5969,
      "ON": 0,
      "OTH": 5182
    },
    "primaryPercentages": {
      "ALP": 25.4,
      "COALITION": 17.5,
      "GRN": 7.1,
      "ON": 0,
      "OTH": 6.1
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 26.3,
        "toCoalition": 43.1,
        "toGreens": 30.5,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28252,
      "coalition": 19105,
      "alpPercent": 59.7,
      "coalitionPercent": 40.3
    }
  },
  "bellarine": {
    "electorateId": "bellarine",
    "name": "Bellarine",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 94306,
    "primaryVotes": {
      "ALP": 27567,
      "COALITION": 19586,
      "GRN": 5537,
      "ON": 0,
      "OTH": 5896
    },
    "primaryPercentages": {
      "ALP": 29.2,
      "COALITION": 20.8,
      "GRN": 5.9,
      "ON": 0,
      "OTH": 6.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 78,
        "toCoalition": 22,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 26.8,
        "toCoalition": 39.1,
        "toGreens": 34.1,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 34284,
      "coalition": 24302,
      "alpPercent": 58.5,
      "coalitionPercent": 41.5
    }
  },
  "geelong": {
    "electorateId": "geelong",
    "name": "Geelong",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 89524,
    "primaryVotes": {
      "ALP": 28965,
      "COALITION": 15797,
      "GRN": 6849,
      "ON": 0,
      "OTH": 4965
    },
    "primaryPercentages": {
      "ALP": 32.4,
      "COALITION": 17.6,
      "GRN": 7.7,
      "ON": 0,
      "OTH": 5.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 82.4,
        "toCoalition": 17.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 19.8,
        "toCoalition": 41.5,
        "toGreens": 38.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 36212,
      "coalition": 20364,
      "alpPercent": 64,
      "coalitionPercent": 36
    }
  },
  "lara": {
    "electorateId": "lara",
    "name": "Lara",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 79042,
    "primaryVotes": {
      "ALP": 19882,
      "COALITION": 10548,
      "GRN": 5031,
      "ON": 0,
      "OTH": 6048
    },
    "primaryPercentages": {
      "ALP": 25.2,
      "COALITION": 13.3,
      "GRN": 6.4,
      "ON": 0,
      "OTH": 7.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.5,
        "toCoalition": 33.2,
        "toGreens": 46.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26291,
      "coalition": 15218,
      "alpPercent": 63.3,
      "coalitionPercent": 36.7
    }
  },
  "south_barwon": {
    "electorateId": "south_barwon",
    "name": "South Barwon",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 90368,
    "primaryVotes": {
      "ALP": 27020,
      "COALITION": 18164,
      "GRN": 5719,
      "ON": 0,
      "OTH": 4980
    },
    "primaryPercentages": {
      "ALP": 29.9,
      "COALITION": 20.1,
      "GRN": 6.3,
      "ON": 0,
      "OTH": 5.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 80,
        "toCoalition": 20,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 23.6,
        "toCoalition": 43.8,
        "toGreens": 32.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 33339,
      "coalition": 22544,
      "alpPercent": 59.7,
      "coalitionPercent": 40.3
    }
  },
  "ripon": {
    "electorateId": "ripon",
    "name": "Ripon",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 84682,
    "primaryVotes": {
      "ALP": 22438,
      "COALITION": 19903,
      "GRN": 2524,
      "ON": 0,
      "OTH": 8191
    },
    "primaryPercentages": {
      "ALP": 26.5,
      "COALITION": 23.5,
      "GRN": 3,
      "ON": 0,
      "OTH": 9.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 71.9,
        "toCoalition": 11.1,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 17
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 43.1,
        "toCoalition": 48.4,
        "toGreens": 8.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 28483,
      "coalition": 24573,
      "alpPercent": 53.7,
      "coalitionPercent": 46.3
    }
  },
  "evelyn": {
    "electorateId": "evelyn",
    "name": "Evelyn",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 87330,
    "primaryVotes": {
      "ALP": 15370,
      "COALITION": 22686,
      "GRN": 5609,
      "ON": 0,
      "OTH": 4951
    },
    "primaryPercentages": {
      "ALP": 17.6,
      "COALITION": 26,
      "GRN": 6.4,
      "ON": 0,
      "OTH": 5.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 22.1,
        "toCoalition": 46.5,
        "toGreens": 31.4,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 21536,
      "coalition": 27080,
      "alpPercent": 44.3,
      "coalitionPercent": 55.7
    }
  },
  "narracan": {
    "electorateId": "narracan",
    "name": "Narracan",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 53600,
    "primaryVotes": {
      "ALP": 14686,
      "COALITION": 22834,
      "GRN": 5360,
      "ON": 3216,
      "OTH": 7504
    },
    "primaryPercentages": {
      "ALP": 27.4,
      "COALITION": 42.6,
      "GRN": 10,
      "ON": 6,
      "OTH": 14
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 24018,
      "coalition": 29582,
      "alpPercent": 44.8,
      "coalitionPercent": 55.2
    }
  },
  "nepean": {
    "electorateId": "nepean",
    "name": "Nepean",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 81532,
    "primaryVotes": {
      "ALP": 13919,
      "COALITION": 20603,
      "GRN": 4436,
      "ON": 0,
      "OTH": 5096
    },
    "primaryPercentages": {
      "ALP": 17.1,
      "COALITION": 25.3,
      "GRN": 5.4,
      "ON": 0,
      "OTH": 6.3
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 24.8,
        "toCoalition": 40.2,
        "toGreens": 35,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 19479,
      "coalition": 24575,
      "alpPercent": 44.2,
      "coalitionPercent": 55.8
    }
  },
  "mornington": {
    "electorateId": "mornington",
    "name": "Mornington",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 126186,
    "primaryVotes": {
      "ALP": 9246,
      "COALITION": 21326,
      "GRN": 2677,
      "ON": 0,
      "OTH": 65595
    },
    "primaryPercentages": {
      "ALP": 7.3,
      "COALITION": 16.9,
      "GRN": 2.1,
      "ON": 0,
      "OTH": 52
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 83.8
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 38.3,
        "toCoalition": 11.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 50.5
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 9.9,
        "toCoalition": 66.8,
        "toGreens": 23.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 19784,
      "coalition": 79060,
      "alpPercent": 20,
      "coalitionPercent": 80
    }
  },
  "gippsland_east": {
    "electorateId": "gippsland_east",
    "name": "Gippsland East",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 84498,
    "primaryVotes": {
      "ALP": 11027,
      "COALITION": 31259,
      "GRN": 2691,
      "ON": 0,
      "OTH": 5593
    },
    "primaryPercentages": {
      "ALP": 13.1,
      "COALITION": 37,
      "GRN": 3.2,
      "ON": 0,
      "OTH": 6.6
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 83.8
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 64.7,
        "toCoalition": 21.2,
        "toGreens": 0,
        "toOneNation": 0.8,
        "toOther": 13.3
      },
      "ON": {
        "toALP": 18.4,
        "toCoalition": 81.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.4,
        "toCoalition": 46,
        "toGreens": 28.1,
        "toOneNation": 5.6,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 16129,
      "coalition": 34441,
      "alpPercent": 31.9,
      "coalitionPercent": 68.1
    }
  },
  "gippsland_south": {
    "electorateId": "gippsland_south",
    "name": "Gippsland South",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 84731,
    "primaryVotes": {
      "ALP": 14723,
      "COALITION": 27645,
      "GRN": 3538,
      "ON": 0,
      "OTH": 6339
    },
    "primaryPercentages": {
      "ALP": 17.4,
      "COALITION": 32.6,
      "GRN": 4.2,
      "ON": 0,
      "OTH": 7.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 83.8
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 64.7,
        "toCoalition": 21.2,
        "toGreens": 0,
        "toOneNation": 0.8,
        "toOther": 13.3
      },
      "ON": {
        "toALP": 18.4,
        "toCoalition": 81.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.4,
        "toCoalition": 46,
        "toGreens": 28.1,
        "toOneNation": 5.6,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 20903,
      "coalition": 31342,
      "alpPercent": 40,
      "coalitionPercent": 60
    }
  },
  "morwell": {
    "electorateId": "morwell",
    "name": "Morwell",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 86522,
    "primaryVotes": {
      "ALP": 19720,
      "COALITION": 30251,
      "GRN": 1830,
      "ON": 2648,
      "OTH": 8570
    },
    "primaryPercentages": {
      "ALP": 22.8,
      "COALITION": 35,
      "GRN": 2.1,
      "ON": 3.1,
      "OTH": 9.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 63.7,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 4,
        "toOther": 16.1
      },
      "ON": {
        "toALP": 18.4,
        "toCoalition": 81.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 25.7,
        "toCoalition": 30.3,
        "toGreens": 5.1,
        "toOneNation": 38.9,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 25599,
      "coalition": 37420,
      "alpPercent": 40.6,
      "coalitionPercent": 59.4
    }
  },
  "bass": {
    "electorateId": "bass",
    "name": "Bass",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 82808,
    "primaryVotes": {
      "ALP": 20803,
      "COALITION": 26107,
      "GRN": 3369,
      "ON": 0,
      "OTH": 6569
    },
    "primaryPercentages": {
      "ALP": 25.1,
      "COALITION": 31.5,
      "GRN": 4.1,
      "ON": 0,
      "OTH": 7.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 65.4,
        "toCoalition": 34.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.2,
        "toCoalition": 54.3,
        "toGreens": 25.6,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 24787,
      "coalition": 32061,
      "alpPercent": 43.6,
      "coalitionPercent": 56.4
    }
  },
  "hastings": {
    "electorateId": "hastings",
    "name": "Hastings",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 82464,
    "primaryVotes": {
      "ALP": 21174,
      "COALITION": 20058,
      "GRN": 4118,
      "ON": 0,
      "OTH": 5338
    },
    "primaryPercentages": {
      "ALP": 25.7,
      "COALITION": 24.3,
      "GRN": 5,
      "ON": 0,
      "OTH": 6.5
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 77.8,
        "toCoalition": 22.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 21.4,
        "toCoalition": 43.3,
        "toGreens": 35.3,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26143,
      "coalition": 24545,
      "alpPercent": 51.6,
      "coalitionPercent": 48.4
    }
  },
  "monbulk": {
    "electorateId": "monbulk",
    "name": "Monbulk",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 83594,
    "primaryVotes": {
      "ALP": 24056,
      "COALITION": 17741,
      "GRN": 6255,
      "ON": 0,
      "OTH": 8144
    },
    "primaryPercentages": {
      "ALP": 28.8,
      "COALITION": 21.2,
      "GRN": 7.5,
      "ON": 0,
      "OTH": 9.7
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "COALITION": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 78.2,
        "toCoalition": 21.8,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "ON": {
        "toALP": 0,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 18.5,
        "toCoalition": 40.8,
        "toGreens": 40.7,
        "toOneNation": 0,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 31488,
      "coalition": 24708,
      "alpPercent": 56,
      "coalitionPercent": 44
    }
  },
  "pakenham": {
    "electorateId": "pakenham",
    "name": "Pakenham",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 77734,
    "primaryVotes": {
      "ALP": 19587,
      "COALITION": 19280,
      "GRN": 2571,
      "ON": 1321,
      "OTH": 9219
    },
    "primaryPercentages": {
      "ALP": 25.2,
      "COALITION": 24.8,
      "GRN": 3.3,
      "ON": 1.7,
      "OTH": 11.9
    },
    "transferFlows": {
      "ALP": {
        "toALP": 0,
        "toCoalition": 16.2,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 83.8
      },
      "COALITION": {
        "toALP": 100,
        "toCoalition": 0,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "GRN": {
        "toALP": 64.7,
        "toCoalition": 21.2,
        "toGreens": 0,
        "toOneNation": 0.8,
        "toOther": 13.3
      },
      "ON": {
        "toALP": 18.4,
        "toCoalition": 81.6,
        "toGreens": 0,
        "toOneNation": 0,
        "toOther": 0
      },
      "OTH": {
        "toALP": 20.4,
        "toCoalition": 46,
        "toGreens": 28.1,
        "toOneNation": 5.6,
        "toOther": 0
      }
    },
    "twoPartyPreferred": {
      "alp": 26912,
      "coalition": 25066,
      "alpPercent": 51.8,
      "coalitionPercent": 48.2
    }
  }
};
