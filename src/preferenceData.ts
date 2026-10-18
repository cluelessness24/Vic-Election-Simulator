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
    "toCoalition": 29.3,
    "toGreens": 20.9,
    "toOneNation": 0,
    "toOther": 49.9
  },
  "COALITION": {
    "toALP": 36.1,
    "toCoalition": 5.7,
    "toGreens": 24.3,
    "toOneNation": 0,
    "toOther": 33.8
  },
  "GRN": {
    "toALP": 70.4,
    "toCoalition": 18.2,
    "toGreens": 0,
    "toOneNation": 0.1,
    "toOther": 11.3
  },
  "ON": {
    "toALP": 19.1,
    "toCoalition": 74.1,
    "toGreens": 6.8,
    "toOneNation": 0,
    "toOther": 0
  },
  "OTH": {
    "toALP": 19.3,
    "toCoalition": 27.4,
    "toGreens": 20.9,
    "toOneNation": 1,
    "toOther": 31.5
  }
};

export const PREFERENCE_DATA: Record<string, ElectoratePreferenceData> = {
  "melbourne": {
    "electorateId": "melbourne",
    "name": "Melbourne",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42519,
    "primaryVotes": {
        "ALP": 13033,
        "COALITION": 7522,
        "GRN": 15855,
        "ON": 0,
        "OTH": 6109
    },
    "primaryPercentages": {
        "ALP": 30.7,
        "COALITION": 17.7,
        "GRN": 37.3,
        "ON": 0,
        "OTH": 14.4
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
            "toALP": 31.8,
            "toCoalition": 0,
            "toGreens": 68.2,
            "toOneNation": 0,
            "toOther": 0
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
            "toALP": 15.1,
            "toCoalition": 13.6,
            "toGreens": 50.3,
            "toOneNation": 0,
            "toOther": 21
        }
    },
    "twoPartyPreferred": {
        "alp": 16926,
        "coalition": 25593,
        "alpPercent": 39.81,
        "coalitionPercent": 60.2
    }
},
  "brunswick": {
    "electorateId": "brunswick",
    "name": "Brunswick",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43445,
    "primaryVotes": {
        "ALP": 12392,
        "COALITION": 4723,
        "GRN": 18959,
        "ON": 0,
        "OTH": 7371
    },
    "primaryPercentages": {
        "ALP": 28.5,
        "COALITION": 10.9,
        "GRN": 43.6,
        "ON": 0,
        "OTH": 17
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
            "toALP": 16.4,
            "toCoalition": 10.2,
            "toGreens": 56,
            "toOneNation": 0,
            "toOther": 17.4
        }
    },
    "twoPartyPreferred": {
        "alp": 13854,
        "coalition": 5632,
        "alpPercent": 31.89,
        "coalitionPercent": 12.96
    }
},
  "richmond": {
    "electorateId": "richmond",
    "name": "Richmond",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39731,
    "primaryVotes": {
        "ALP": 13037,
        "COALITION": 7456,
        "GRN": 13771,
        "ON": 0,
        "OTH": 5467
    },
    "primaryPercentages": {
        "ALP": 32.8,
        "COALITION": 18.8,
        "GRN": 34.7,
        "ON": 0,
        "OTH": 13.8
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
            "toALP": 0,
            "toCoalition": 0,
            "toGreens": 68.1,
            "toOneNation": 0,
            "toOther": 31.9
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
            "toALP": 0,
            "toCoalition": 13.3,
            "toGreens": 47.9,
            "toOneNation": 0,
            "toOther": 38.8
        }
    },
    "twoPartyPreferred": {
        "alp": 16959,
        "coalition": 22772,
        "alpPercent": 42.68,
        "coalitionPercent": 57.3
    }
},
  "northcote": {
    "electorateId": "northcote",
    "name": "Northcote",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42642,
    "primaryVotes": {
        "ALP": 17303,
        "COALITION": 5205,
        "GRN": 12797,
        "ON": 0,
        "OTH": 7337
    },
    "primaryPercentages": {
        "ALP": 40.6,
        "COALITION": 12.2,
        "GRN": 30,
        "ON": 0,
        "OTH": 17.2
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
            "toGreens": 60.9,
            "toOneNation": 0,
            "toOther": 0
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
            "toALP": 15.5,
            "toCoalition": 16,
            "toGreens": 45.7,
            "toOneNation": 0,
            "toOther": 22.7
        }
    },
    "twoPartyPreferred": {
        "alp": 21413,
        "coalition": 21229,
        "alpPercent": 50.22,
        "coalitionPercent": 49.8
    }
},
  "preston": {
    "electorateId": "preston",
    "name": "Preston",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39857,
    "primaryVotes": {
        "ALP": 14999,
        "COALITION": 6883,
        "GRN": 6027,
        "ON": 0,
        "OTH": 11948
    },
    "primaryPercentages": {
        "ALP": 37.6,
        "COALITION": 17.3,
        "GRN": 15.1,
        "ON": 0,
        "OTH": 30
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
            "toALP": 32.7,
            "toCoalition": 0,
            "toGreens": 67.3,
            "toOneNation": 0,
            "toOther": 0
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
            "toALP": 16.8,
            "toCoalition": 17.4,
            "toGreens": 42.5,
            "toOneNation": 0,
            "toOther": 23.3
        }
    },
    "twoPartyPreferred": {
        "alp": 20761,
        "coalition": 19096,
        "alpPercent": 52.09,
        "coalitionPercent": 47.9
    }
},
  "pascoe_vale": {
    "electorateId": "pascoe_vale",
    "name": "Pascoe Vale",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40273,
    "primaryVotes": {
        "ALP": 15611,
        "COALITION": 8461,
        "GRN": 9034,
        "ON": 0,
        "OTH": 7167
    },
    "primaryPercentages": {
        "ALP": 38.8,
        "COALITION": 21,
        "GRN": 22.4,
        "ON": 0,
        "OTH": 17.8
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
            "toALP": 38,
            "toCoalition": 0,
            "toGreens": 62,
            "toOneNation": 0,
            "toOther": 0
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
            "toALP": 15.2,
            "toCoalition": 17.3,
            "toGreens": 40.8,
            "toOneNation": 0,
            "toOther": 26.7
        }
    },
    "twoPartyPreferred": {
        "alp": 20950,
        "coalition": 19323,
        "alpPercent": 52.02,
        "coalitionPercent": 48
    }
},
  "broadmeadows": {
    "electorateId": "broadmeadows",
    "name": "Broadmeadows",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 34780,
    "primaryVotes": {
        "ALP": 15899,
        "COALITION": 8044,
        "GRN": 2908,
        "ON": 0,
        "OTH": 7929
    },
    "primaryPercentages": {
        "ALP": 45.7,
        "COALITION": 23.1,
        "GRN": 8.4,
        "ON": 0,
        "OTH": 22.8
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
            "toALP": 20.3,
            "toCoalition": 22.2,
            "toGreens": 31.8,
            "toOneNation": 0,
            "toOther": 25.7
        }
    },
    "twoPartyPreferred": {
        "alp": 18063,
        "coalition": 10416,
        "alpPercent": 51.94,
        "coalitionPercent": 29.95
    }
},
  "thomastown": {
    "electorateId": "thomastown",
    "name": "Thomastown",
    "region": "northern_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 37476,
    "primaryVotes": {
        "ALP": 19396,
        "COALITION": 9003,
        "GRN": 2557,
        "ON": 0,
        "OTH": 6520
    },
    "primaryPercentages": {
        "ALP": 51.8,
        "COALITION": 24,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 17.4
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
    },
    "twoPartyPreferred": {
        "alp": 24658,
        "coalition": 12705,
        "alpPercent": 66,
        "coalitionPercent": 34
    }
},
  "bundoora": {
    "electorateId": "bundoora",
    "name": "Bundoora",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40336,
    "primaryVotes": {
        "ALP": 19288,
        "COALITION": 11167,
        "GRN": 5311,
        "ON": 0,
        "OTH": 4570
    },
    "primaryPercentages": {
        "ALP": 47.8,
        "COALITION": 27.7,
        "GRN": 13.2,
        "ON": 0,
        "OTH": 11.3
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
            "toALP": 16.5,
            "toCoalition": 34.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 49.3
        }
    },
    "twoPartyPreferred": {
        "alp": 20316,
        "coalition": 13296,
        "alpPercent": 50.37,
        "coalitionPercent": 32.96
    }
},
  "mill_park": {
    "electorateId": "mill_park",
    "name": "Mill Park",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37798,
    "primaryVotes": {
        "ALP": 18857,
        "COALITION": 9797,
        "GRN": 2761,
        "ON": 0,
        "OTH": 6383
    },
    "primaryPercentages": {
        "ALP": 49.9,
        "COALITION": 25.9,
        "GRN": 7.3,
        "ON": 0,
        "OTH": 16.9
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
            "toALP": 0,
            "toCoalition": 26.8,
            "toGreens": 21.9,
            "toOneNation": 0,
            "toOther": 51.3
        }
    },
    "twoPartyPreferred": {
        "alp": 19106,
        "coalition": 10288,
        "alpPercent": 50.55,
        "coalitionPercent": 27.22
    }
},
  "greenvale": {
    "electorateId": "greenvale",
    "name": "Greenvale",
    "region": "northern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37686,
    "primaryVotes": {
        "ALP": 15628,
        "COALITION": 9568,
        "GRN": 2194,
        "ON": 0,
        "OTH": 10296
    },
    "primaryPercentages": {
        "ALP": 41.5,
        "COALITION": 25.4,
        "GRN": 5.8,
        "ON": 0,
        "OTH": 27.3
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
            "toALP": 25.6,
            "toCoalition": 30.3,
            "toGreens": 6.5,
            "toOneNation": 0,
            "toOther": 37.6
        }
    },
    "twoPartyPreferred": {
        "alp": 19309,
        "coalition": 12709,
        "alpPercent": 51.24,
        "coalitionPercent": 33.72
    }
},
  "bulleen": {
    "electorateId": "bulleen",
    "name": "Bulleen",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42959,
    "primaryVotes": {
        "ALP": 14052,
        "COALITION": 20645,
        "GRN": 4576,
        "ON": 0,
        "OTH": 3686
    },
    "primaryPercentages": {
        "ALP": 32.7,
        "COALITION": 48.1,
        "GRN": 10.7,
        "ON": 0,
        "OTH": 8.6
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
            "toALP": 16,
            "toCoalition": 35.5,
            "toGreens": 24.3,
            "toOneNation": 0,
            "toOther": 24.2
        }
    },
    "twoPartyPreferred": {
        "alp": 14829,
        "coalition": 22374,
        "alpPercent": 34.52,
        "coalitionPercent": 52.08
    }
},
  "croydon": {
    "electorateId": "croydon",
    "name": "Croydon",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45639,
    "primaryVotes": {
        "ALP": 15564,
        "COALITION": 19605,
        "GRN": 4940,
        "ON": 0,
        "OTH": 5530
    },
    "primaryPercentages": {
        "ALP": 34.1,
        "COALITION": 43,
        "GRN": 10.8,
        "ON": 0,
        "OTH": 12.1
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
            "toALP": 76.3,
            "toCoalition": 23.7,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 24.7,
            "toCoalition": 35,
            "toGreens": 25.2,
            "toOneNation": 0,
            "toOther": 15
        }
    },
    "twoPartyPreferred": {
        "alp": 22193,
        "coalition": 23446,
        "alpPercent": 48.63,
        "coalitionPercent": 51.37
    }
},
  "warrandyte": {
    "electorateId": "warrandyte",
    "name": "Warrandyte",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45075,
    "primaryVotes": {
        "ALP": 14946,
        "COALITION": 21344,
        "GRN": 5283,
        "ON": 0,
        "OTH": 3502
    },
    "primaryPercentages": {
        "ALP": 33.2,
        "COALITION": 47.4,
        "GRN": 11.7,
        "ON": 0,
        "OTH": 7.8
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
            "toALP": 13.7,
            "toCoalition": 44.1,
            "toGreens": 29.5,
            "toOneNation": 0,
            "toOther": 12.7
        }
    },
    "twoPartyPreferred": {
        "alp": 15495,
        "coalition": 23112,
        "alpPercent": 34.38,
        "coalitionPercent": 51.27
    }
},
  "ferntree_gully": {
    "electorateId": "ferntree_gully",
    "name": "Ferntree Gully",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41867,
    "primaryVotes": {
        "ALP": 17196,
        "COALITION": 12331,
        "GRN": 6344,
        "ON": 0,
        "OTH": 5996
    },
    "primaryPercentages": {
        "ALP": 41.1,
        "COALITION": 29.5,
        "GRN": 15.2,
        "ON": 0,
        "OTH": 14.3
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
            "toALP": 81.2,
            "toCoalition": 18.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 14.7,
            "toCoalition": 20.5,
            "toGreens": 42.6,
            "toOneNation": 0,
            "toOther": 22.2
        }
    },
    "twoPartyPreferred": {
        "alp": 26146,
        "coalition": 15721,
        "alpPercent": 62.45,
        "coalitionPercent": 37.55
    }
},
  "box_hill": {
    "electorateId": "box_hill",
    "name": "Box Hill",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44356,
    "primaryVotes": {
        "ALP": 18340,
        "COALITION": 15593,
        "GRN": 6267,
        "ON": 0,
        "OTH": 4156
    },
    "primaryPercentages": {
        "ALP": 41.3,
        "COALITION": 35.2,
        "GRN": 14.1,
        "ON": 0,
        "OTH": 9.4
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
            "toALP": 82.2,
            "toCoalition": 17.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 15,
            "toCoalition": 34.3,
            "toGreens": 20.4,
            "toOneNation": 0,
            "toOther": 30.3
        }
    },
    "twoPartyPreferred": {
        "alp": 25383,
        "coalition": 18973,
        "alpPercent": 57.23,
        "coalitionPercent": 42.77
    }
},
  "ringwood": {
    "electorateId": "ringwood",
    "name": "Ringwood",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45753,
    "primaryVotes": {
        "ALP": 17851,
        "COALITION": 15467,
        "GRN": 7105,
        "ON": 0,
        "OTH": 5330
    },
    "primaryPercentages": {
        "ALP": 39,
        "COALITION": 33.8,
        "GRN": 15.5,
        "ON": 0,
        "OTH": 11.6
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
            "toALP": 80.6,
            "toCoalition": 19.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 22.1,
            "toCoalition": 34,
            "toGreens": 23.6,
            "toOneNation": 0,
            "toOther": 20.3
        }
    },
    "twoPartyPreferred": {
        "alp": 26322,
        "coalition": 19431,
        "alpPercent": 57.53,
        "coalitionPercent": 42.47
    }
},
  "bayswater": {
    "electorateId": "bayswater",
    "name": "Bayswater",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42599,
    "primaryVotes": {
        "ALP": 17609,
        "COALITION": 15174,
        "GRN": 3151,
        "ON": 0,
        "OTH": 6665
    },
    "primaryPercentages": {
        "ALP": 41.3,
        "COALITION": 35.6,
        "GRN": 7.4,
        "ON": 0,
        "OTH": 15.6
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
            "toALP": 74.3,
            "toCoalition": 25.7,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.1,
            "toCoalition": 32.4,
            "toGreens": 23.3,
            "toOneNation": 0,
            "toOther": 27.1
        }
    },
    "twoPartyPreferred": {
        "alp": 23101,
        "coalition": 19498,
        "alpPercent": 54.23,
        "coalitionPercent": 45.77
    }
},
  "glen_waverley": {
    "electorateId": "glen_waverley",
    "name": "Glen Waverley",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44667,
    "primaryVotes": {
        "ALP": 18153,
        "COALITION": 17941,
        "GRN": 4279,
        "ON": 0,
        "OTH": 4294
    },
    "primaryPercentages": {
        "ALP": 40.6,
        "COALITION": 40.2,
        "GRN": 9.6,
        "ON": 0,
        "OTH": 9.6
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
            "toALP": 80.6,
            "toCoalition": 19.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16.9,
            "toCoalition": 32.4,
            "toGreens": 29.1,
            "toOneNation": 0,
            "toOther": 21.6
        }
    },
    "twoPartyPreferred": {
        "alp": 23809,
        "coalition": 20858,
        "alpPercent": 53.3,
        "coalitionPercent": 46.7
    }
},
  "ashwood": {
    "electorateId": "ashwood",
    "name": "Ashwood",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44710,
    "primaryVotes": {
        "ALP": 18014,
        "COALITION": 16618,
        "GRN": 6612,
        "ON": 0,
        "OTH": 3466
    },
    "primaryPercentages": {
        "ALP": 40.3,
        "COALITION": 37.2,
        "GRN": 14.8,
        "ON": 0,
        "OTH": 7.8
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
            "toALP": 83.6,
            "toCoalition": 16.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 12.3,
            "toCoalition": 36.3,
            "toGreens": 25,
            "toOneNation": 0,
            "toOther": 26.3
        }
    },
    "twoPartyPreferred": {
        "alp": 25106,
        "coalition": 19604,
        "alpPercent": 56.15,
        "coalitionPercent": 43.85
    }
},
  "eltham": {
    "electorateId": "eltham",
    "name": "Eltham",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43844,
    "primaryVotes": {
        "ALP": 19509,
        "COALITION": 15615,
        "GRN": 5897,
        "ON": 0,
        "OTH": 2823
    },
    "primaryPercentages": {
        "ALP": 44.5,
        "COALITION": 35.6,
        "GRN": 13.4,
        "ON": 0,
        "OTH": 6.4
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
            "toALP": 85,
            "toCoalition": 15,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16.1,
            "toCoalition": 39.4,
            "toGreens": 27.9,
            "toOneNation": 0,
            "toOther": 16.5
        }
    },
    "twoPartyPreferred": {
        "alp": 25870,
        "coalition": 17974,
        "alpPercent": 59,
        "coalitionPercent": 41
    }
},
  "ivanhoe": {
    "electorateId": "ivanhoe",
    "name": "Ivanhoe",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40599,
    "primaryVotes": {
        "ALP": 17333,
        "COALITION": 12566,
        "GRN": 7808,
        "ON": 0,
        "OTH": 2892
    },
    "primaryPercentages": {
        "ALP": 42.7,
        "COALITION": 31,
        "GRN": 19.2,
        "ON": 0,
        "OTH": 7.1
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
            "toALP": 85.2,
            "toCoalition": 14.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.7,
            "toCoalition": 36.9,
            "toGreens": 30.8,
            "toOneNation": 0,
            "toOther": 14.7
        }
    },
    "twoPartyPreferred": {
        "alp": 25476,
        "coalition": 15123,
        "alpPercent": 62.75,
        "coalitionPercent": 37.25
    }
},
  "brighton": {
    "electorateId": "brighton",
    "name": "Brighton",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41196,
    "primaryVotes": {
        "ALP": 10164,
        "COALITION": 18791,
        "GRN": 5680,
        "ON": 0,
        "OTH": 6561
    },
    "primaryPercentages": {
        "ALP": 24.7,
        "COALITION": 45.6,
        "GRN": 13.8,
        "ON": 0,
        "OTH": 15.9
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
            "toALP": 21.5,
            "toCoalition": 24.7,
            "toGreens": 37.4,
            "toOneNation": 0,
            "toOther": 16.4
        }
    },
    "twoPartyPreferred": {
        "alp": 11850,
        "coalition": 20730,
        "alpPercent": 28.76,
        "coalitionPercent": 50.32
    }
},
  "caulfield": {
    "electorateId": "caulfield",
    "name": "Caulfield",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40683,
    "primaryVotes": {
        "ALP": 11301,
        "COALITION": 18088,
        "GRN": 6447,
        "ON": 0,
        "OTH": 4847
    },
    "primaryPercentages": {
        "ALP": 27.8,
        "COALITION": 44.5,
        "GRN": 15.8,
        "ON": 0,
        "OTH": 11.9
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
            "toALP": 82.5,
            "toCoalition": 17.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 21.3,
            "toCoalition": 28.9,
            "toGreens": 36.6,
            "toOneNation": 0,
            "toOther": 13.2
        }
    },
    "twoPartyPreferred": {
        "alp": 19500,
        "coalition": 21183,
        "alpPercent": 47.93,
        "coalitionPercent": 52.07
    }
},
  "hawthorn": {
    "electorateId": "hawthorn",
    "name": "Hawthorn",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44310,
    "primaryVotes": {
        "ALP": 9799,
        "COALITION": 18728,
        "GRN": 4927,
        "ON": 0,
        "OTH": 10856
    },
    "primaryPercentages": {
        "ALP": 22.1,
        "COALITION": 42.3,
        "GRN": 11.1,
        "ON": 0,
        "OTH": 24.5
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
            "toALP": 37,
            "toCoalition": 9.3,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 53.7
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 66.9,
            "toCoalition": 25.8,
            "toGreens": 2.5,
            "toOneNation": 0,
            "toOther": 4.8
        }
    },
    "twoPartyPreferred": {
        "alp": 21383,
        "coalition": 22927,
        "alpPercent": 48.26,
        "coalitionPercent": 51.74
    }
},
  "kew": {
    "electorateId": "kew",
    "name": "Kew",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43592,
    "primaryVotes": {
        "ALP": 9896,
        "COALITION": 19321,
        "GRN": 3612,
        "ON": 0,
        "OTH": 10763
    },
    "primaryPercentages": {
        "ALP": 22.7,
        "COALITION": 44.3,
        "GRN": 8.3,
        "ON": 0,
        "OTH": 24.7
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
            "toALP": 40.7,
            "toCoalition": 11.3,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 47.9
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 65,
            "toCoalition": 28.5,
            "toGreens": 2.4,
            "toOneNation": 0,
            "toOther": 4.1
        }
    },
    "twoPartyPreferred": {
        "alp": 20063,
        "coalition": 23529,
        "alpPercent": 46.02,
        "coalitionPercent": 53.98
    }
},
  "malvern": {
    "electorateId": "malvern",
    "name": "Malvern",
    "region": "southern_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 40801,
    "primaryVotes": {
        "ALP": 10686,
        "COALITION": 21438,
        "GRN": 6390,
        "ON": 0,
        "OTH": 2287
    },
    "primaryPercentages": {
        "ALP": 26.2,
        "COALITION": 52.5,
        "GRN": 15.7,
        "ON": 0,
        "OTH": 5.6
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
    },
    "twoPartyPreferred": {
        "alp": 17000,
        "coalition": 23750,
        "alpPercent": 41.72,
        "coalitionPercent": 58.28
    }
},
  "sandringham": {
    "electorateId": "sandringham",
    "name": "Sandringham",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40512,
    "primaryVotes": {
        "ALP": 10426,
        "COALITION": 18783,
        "GRN": 5949,
        "ON": 0,
        "OTH": 5354
    },
    "primaryPercentages": {
        "ALP": 25.7,
        "COALITION": 46.4,
        "GRN": 14.7,
        "ON": 0,
        "OTH": 13.2
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
            "toALP": 22.2,
            "toCoalition": 31,
            "toGreens": 31.7,
            "toOneNation": 0,
            "toOther": 15.1
        }
    },
    "twoPartyPreferred": {
        "alp": 11825,
        "coalition": 20737,
        "alpPercent": 29.19,
        "coalitionPercent": 51.19
    }
},
  "prahran": {
    "electorateId": "prahran",
    "name": "Prahran",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39243,
    "primaryVotes": {
        "ALP": 10421,
        "COALITION": 12198,
        "GRN": 14286,
        "ON": 0,
        "OTH": 2338
    },
    "primaryPercentages": {
        "ALP": 26.6,
        "COALITION": 31.1,
        "GRN": 36.4,
        "ON": 0,
        "OTH": 6
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
            "toALP": 15.2,
            "toCoalition": 32.3,
            "toGreens": 40.4,
            "toOneNation": 0,
            "toOther": 12.1
        }
    },
    "twoPartyPreferred": {
        "alp": 24334,
        "coalition": 14909,
        "alpPercent": 62,
        "coalitionPercent": 37.99
    }
},
  "albert_park": {
    "electorateId": "albert_park",
    "name": "Albert Park",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39110,
    "primaryVotes": {
        "ALP": 14254,
        "COALITION": 11659,
        "GRN": 8178,
        "ON": 0,
        "OTH": 5019
    },
    "primaryPercentages": {
        "ALP": 36.4,
        "COALITION": 29.8,
        "GRN": 20.9,
        "ON": 0,
        "OTH": 12.8
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
            "toALP": 83.8,
            "toCoalition": 16.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 19,
            "toCoalition": 30.6,
            "toGreens": 31.5,
            "toOneNation": 0,
            "toOther": 18.9
        }
    },
    "twoPartyPreferred": {
        "alp": 23916,
        "coalition": 15194,
        "alpPercent": 61.15,
        "coalitionPercent": 38.85
    }
},
  "bentleigh": {
    "electorateId": "bentleigh",
    "name": "Bentleigh",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45120,
    "primaryVotes": {
        "ALP": 20656,
        "COALITION": 16401,
        "GRN": 4845,
        "ON": 0,
        "OTH": 3218
    },
    "primaryPercentages": {
        "ALP": 45.8,
        "COALITION": 36.3,
        "GRN": 10.7,
        "ON": 0,
        "OTH": 7.1
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
            "toALP": 81,
            "toCoalition": 19,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.2,
            "toCoalition": 36.7,
            "toGreens": 31.4,
            "toOneNation": 0,
            "toOther": 14.7
        }
    },
    "twoPartyPreferred": {
        "alp": 26188,
        "coalition": 18932,
        "alpPercent": 58.04,
        "coalitionPercent": 41.96
    }
},
  "oakleigh": {
    "electorateId": "oakleigh",
    "name": "Oakleigh",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43910,
    "primaryVotes": {
        "ALP": 19778,
        "COALITION": 12848,
        "GRN": 7278,
        "ON": 0,
        "OTH": 4006
    },
    "primaryPercentages": {
        "ALP": 45,
        "COALITION": 29.3,
        "GRN": 16.6,
        "ON": 0,
        "OTH": 9.1
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
            "toALP": 84,
            "toCoalition": 16,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 15.7,
            "toCoalition": 32.2,
            "toGreens": 23.5,
            "toOneNation": 0,
            "toOther": 28.7
        }
    },
    "twoPartyPreferred": {
        "alp": 27876,
        "coalition": 16034,
        "alpPercent": 63.48,
        "coalitionPercent": 36.52
    }
},
  "mordialloc": {
    "electorateId": "mordialloc",
    "name": "Mordialloc",
    "region": "southern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44059,
    "primaryVotes": {
        "ALP": 19398,
        "COALITION": 13829,
        "GRN": 4526,
        "ON": 0,
        "OTH": 6306
    },
    "primaryPercentages": {
        "ALP": 44,
        "COALITION": 31.4,
        "GRN": 10.3,
        "ON": 0,
        "OTH": 14.3
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
            "toALP": 76.8,
            "toCoalition": 23.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 18.6,
            "toCoalition": 38.8,
            "toGreens": 20,
            "toOneNation": 0,
            "toOther": 22.6
        }
    },
    "twoPartyPreferred": {
        "alp": 25640,
        "coalition": 18419,
        "alpPercent": 58.19,
        "coalitionPercent": 41.81
    }
},
  "footscray": {
    "electorateId": "footscray",
    "name": "Footscray",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40340,
    "primaryVotes": {
        "ALP": 17387,
        "COALITION": 7214,
        "GRN": 9045,
        "ON": 0,
        "OTH": 6694
    },
    "primaryPercentages": {
        "ALP": 43.1,
        "COALITION": 17.9,
        "GRN": 22.4,
        "ON": 0,
        "OTH": 16.6
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
            "toALP": 37,
            "toCoalition": 0,
            "toGreens": 63,
            "toOneNation": 0,
            "toOther": 0
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
            "toALP": 17.7,
            "toCoalition": 16.8,
            "toGreens": 53.1,
            "toOneNation": 0,
            "toOther": 12.3
        }
    },
    "twoPartyPreferred": {
        "alp": 21880,
        "coalition": 18460,
        "alpPercent": 54.24,
        "coalitionPercent": 45.8
    }
},
  "kororoit": {
    "electorateId": "kororoit",
    "name": "Kororoit",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40373,
    "primaryVotes": {
        "ALP": 17468,
        "COALITION": 9801,
        "GRN": 2650,
        "ON": 0,
        "OTH": 10454
    },
    "primaryPercentages": {
        "ALP": 43.3,
        "COALITION": 24.3,
        "GRN": 6.6,
        "ON": 0,
        "OTH": 25.9
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
            "toALP": 42.8,
            "toCoalition": 16.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 40.9
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 25.3,
            "toCoalition": 21.4,
            "toGreens": 5.5,
            "toOneNation": 0,
            "toOther": 47.7
        }
    },
    "twoPartyPreferred": {
        "alp": 21452,
        "coalition": 12533,
        "alpPercent": 53.13,
        "coalitionPercent": 31.04
    }
},
  "laverton": {
    "electorateId": "laverton",
    "name": "Laverton",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37137,
    "primaryVotes": {
        "ALP": 17026,
        "COALITION": 8233,
        "GRN": 3496,
        "ON": 0,
        "OTH": 8382
    },
    "primaryPercentages": {
        "ALP": 45.8,
        "COALITION": 22.2,
        "GRN": 9.4,
        "ON": 0,
        "OTH": 22.6
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
            "toALP": 20.7,
            "toCoalition": 18.5,
            "toGreens": 35.1,
            "toOneNation": 0,
            "toOther": 25.7
        }
    },
    "twoPartyPreferred": {
        "alp": 19364,
        "coalition": 10321,
        "alpPercent": 52.14,
        "coalitionPercent": 27.79
    }
},
  "st_albans": {
    "electorateId": "st_albans",
    "name": "St Albans",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 35716,
    "primaryVotes": {
        "ALP": 15094,
        "COALITION": 9066,
        "GRN": 2416,
        "ON": 0,
        "OTH": 9140
    },
    "primaryPercentages": {
        "ALP": 42.3,
        "COALITION": 25.4,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 25.6
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
            "toALP": 71.6,
            "toCoalition": 28.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 20.3,
            "toCoalition": 31.8,
            "toGreens": 22.1,
            "toOneNation": 0,
            "toOther": 25.8
        }
    },
    "twoPartyPreferred": {
        "alp": 21274,
        "coalition": 14442,
        "alpPercent": 59.56,
        "coalitionPercent": 40.44
    }
},
  "sydenham": {
    "electorateId": "sydenham",
    "name": "Sydenham",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43665,
    "primaryVotes": {
        "ALP": 18978,
        "COALITION": 12661,
        "GRN": 2547,
        "ON": 0,
        "OTH": 9479
    },
    "primaryPercentages": {
        "ALP": 43.5,
        "COALITION": 29,
        "GRN": 5.8,
        "ON": 0,
        "OTH": 21.7
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
            "toALP": 55.8,
            "toCoalition": 18.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 25.6
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16.8,
            "toCoalition": 15.2,
            "toGreens": 24.5,
            "toOneNation": 0,
            "toOther": 43.5
        }
    },
    "twoPartyPreferred": {
        "alp": 22648,
        "coalition": 14584,
        "alpPercent": 51.87,
        "coalitionPercent": 33.4
    }
},
  "tarneit": {
    "electorateId": "tarneit",
    "name": "Tarneit",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 38978,
    "primaryVotes": {
        "ALP": 18173,
        "COALITION": 10438,
        "GRN": 2883,
        "ON": 0,
        "OTH": 7484
    },
    "primaryPercentages": {
        "ALP": 46.6,
        "COALITION": 26.8,
        "GRN": 7.4,
        "ON": 0,
        "OTH": 19.2
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
            "toALP": 21.9,
            "toCoalition": 19.8,
            "toGreens": 21.4,
            "toOneNation": 0,
            "toOther": 36.9
        }
    },
    "twoPartyPreferred": {
        "alp": 19649,
        "coalition": 11774,
        "alpPercent": 50.41,
        "coalitionPercent": 30.21
    }
},
  "williamstown": {
    "electorateId": "williamstown",
    "name": "Williamstown",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 38974,
    "primaryVotes": {
        "ALP": 16173,
        "COALITION": 10928,
        "GRN": 6013,
        "ON": 0,
        "OTH": 5860
    },
    "primaryPercentages": {
        "ALP": 41.5,
        "COALITION": 28,
        "GRN": 15.4,
        "ON": 0,
        "OTH": 15
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
            "toALP": 85.9,
            "toCoalition": 14.1,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 18.2,
            "toCoalition": 28.4,
            "toGreens": 30.9,
            "toOneNation": 0,
            "toOther": 22.4
        }
    },
    "twoPartyPreferred": {
        "alp": 24726,
        "coalition": 14248,
        "alpPercent": 63.44,
        "coalitionPercent": 36.56
    }
},
  "point_cook": {
    "electorateId": "point_cook",
    "name": "Point Cook",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39099,
    "primaryVotes": {
        "ALP": 15657,
        "COALITION": 9651,
        "GRN": 2657,
        "ON": 0,
        "OTH": 11134
    },
    "primaryPercentages": {
        "ALP": 40,
        "COALITION": 24.7,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 28.5
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
            "toALP": 55.7,
            "toCoalition": 44.3,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 19.1,
            "toCoalition": 21,
            "toGreens": 28.5,
            "toOneNation": 0,
            "toOther": 31.4
        }
    },
    "twoPartyPreferred": {
        "alp": 22810,
        "coalition": 16289,
        "alpPercent": 58.34,
        "coalitionPercent": 41.66
    }
},
  "werribee": {
    "electorateId": "werribee",
    "name": "Werribee",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 38603,
    "primaryVotes": {
        "ALP": 17512,
        "COALITION": 9779,
        "GRN": 2613,
        "ON": 0,
        "OTH": 8699
    },
    "primaryPercentages": {
        "ALP": 45.4,
        "COALITION": 25.3,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 22.5
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
            "toALP": 18.2,
            "toCoalition": 28.1,
            "toGreens": 19.7,
            "toOneNation": 0,
            "toOther": 33.9
        }
    },
    "twoPartyPreferred": {
        "alp": 19912,
        "coalition": 13483,
        "alpPercent": 51.58,
        "coalitionPercent": 34.93
    }
},
  "melton": {
    "electorateId": "melton",
    "name": "Melton",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37619,
    "primaryVotes": {
        "ALP": 14193,
        "COALITION": 9155,
        "GRN": 1711,
        "ON": 0,
        "OTH": 12560
    },
    "primaryPercentages": {
        "ALP": 37.7,
        "COALITION": 24.3,
        "GRN": 4.5,
        "ON": 0,
        "OTH": 33.4
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
            "toALP": 53.3,
            "toCoalition": 10,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 36.7
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 24,
            "toCoalition": 37,
            "toGreens": 4.1,
            "toOneNation": 0,
            "toOther": 35
        }
    },
    "twoPartyPreferred": {
        "alp": 20538,
        "coalition": 17081,
        "alpPercent": 54.59,
        "coalitionPercent": 45.41
    }
},
  "niddrie": {
    "electorateId": "niddrie",
    "name": "Niddrie",
    "region": "western_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42242,
    "primaryVotes": {
        "ALP": 18567,
        "COALITION": 14344,
        "GRN": 3117,
        "ON": 0,
        "OTH": 6214
    },
    "primaryPercentages": {
        "ALP": 44,
        "COALITION": 34,
        "GRN": 7.4,
        "ON": 0,
        "OTH": 14.7
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
            "toALP": 71.5,
            "toCoalition": 28.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 23.2,
            "toCoalition": 30.7,
            "toGreens": 19.8,
            "toOneNation": 0,
            "toOther": 26.3
        }
    },
    "twoPartyPreferred": {
        "alp": 23949,
        "coalition": 18293,
        "alpPercent": 56.69,
        "coalitionPercent": 43.31
    }
},
  "rowville": {
    "electorateId": "rowville",
    "name": "Rowville",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43369,
    "primaryVotes": {
        "ALP": 14283,
        "COALITION": 17600,
        "GRN": 3055,
        "ON": 0,
        "OTH": 8431
    },
    "primaryPercentages": {
        "ALP": 32.9,
        "COALITION": 40.6,
        "GRN": 7,
        "ON": 0,
        "OTH": 19.4
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
            "toALP": 66.6,
            "toCoalition": 14.6,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 18.9
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 29.9,
            "toCoalition": 45.9,
            "toGreens": 5.9,
            "toOneNation": 0,
            "toOther": 18.3
        }
    },
    "twoPartyPreferred": {
        "alp": 20095,
        "coalition": 23274,
        "alpPercent": 46.33,
        "coalitionPercent": 53.67
    }
},
  "berwick": {
    "electorateId": "berwick",
    "name": "Berwick",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44289,
    "primaryVotes": {
        "ALP": 15874,
        "COALITION": 20031,
        "GRN": 4297,
        "ON": 0,
        "OTH": 4087
    },
    "primaryPercentages": {
        "ALP": 35.8,
        "COALITION": 45.2,
        "GRN": 9.7,
        "ON": 0,
        "OTH": 9.2
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
            "toALP": 11.7,
            "toCoalition": 40.2,
            "toGreens": 24.1,
            "toOneNation": 0,
            "toOther": 24
        }
    },
    "twoPartyPreferred": {
        "alp": 16503,
        "coalition": 22192,
        "alpPercent": 37.26,
        "coalitionPercent": 50.11
    }
},
  "carrum": {
    "electorateId": "carrum",
    "name": "Carrum",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43300,
    "primaryVotes": {
        "ALP": 21586,
        "COALITION": 13141,
        "GRN": 3282,
        "ON": 0,
        "OTH": 5291
    },
    "primaryPercentages": {
        "ALP": 49.9,
        "COALITION": 30.3,
        "GRN": 7.6,
        "ON": 0,
        "OTH": 12.2
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
            "toALP": 8.1,
            "toCoalition": 10.8,
            "toGreens": 6,
            "toOneNation": 0,
            "toOther": 75.2
        }
    },
    "twoPartyPreferred": {
        "alp": 21666,
        "coalition": 13247,
        "alpPercent": 50.04,
        "coalitionPercent": 30.59
    }
},
  "cranbourne": {
    "electorateId": "cranbourne",
    "name": "Cranbourne",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40822,
    "primaryVotes": {
        "ALP": 18853,
        "COALITION": 11230,
        "GRN": 2282,
        "ON": 0,
        "OTH": 8457
    },
    "primaryPercentages": {
        "ALP": 46.2,
        "COALITION": 27.5,
        "GRN": 5.6,
        "ON": 0,
        "OTH": 20.7
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
            "toALP": 56.3,
            "toCoalition": 12.3,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 31.4
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.9,
            "toCoalition": 19,
            "toGreens": 13.3,
            "toOneNation": 0,
            "toOther": 49.8
        }
    },
    "twoPartyPreferred": {
        "alp": 21931,
        "coalition": 12973,
        "alpPercent": 53.72,
        "coalitionPercent": 31.78
    }
},
  "dandenong": {
    "electorateId": "dandenong",
    "name": "Dandenong",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 39507,
    "primaryVotes": {
        "ALP": 21677,
        "COALITION": 8475,
        "GRN": 3215,
        "ON": 0,
        "OTH": 6140
    },
    "primaryPercentages": {
        "ALP": 54.9,
        "COALITION": 21.5,
        "GRN": 8.1,
        "ON": 0,
        "OTH": 15.5
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
    },
    "twoPartyPreferred": {
        "alp": 27390,
        "coalition": 12245,
        "alpPercent": 69.11,
        "coalitionPercent": 30.89
    }
},
  "frankston": {
    "electorateId": "frankston",
    "name": "Frankston",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39941,
    "primaryVotes": {
        "ALP": 16595,
        "COALITION": 11762,
        "GRN": 5060,
        "ON": 0,
        "OTH": 6524
    },
    "primaryPercentages": {
        "ALP": 41.5,
        "COALITION": 29.4,
        "GRN": 12.7,
        "ON": 0,
        "OTH": 16.3
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
            "toALP": 78.5,
            "toCoalition": 0,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 21.5
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 9.5,
            "toCoalition": 0,
            "toGreens": 23.5,
            "toOneNation": 0,
            "toOther": 67
        }
    },
    "twoPartyPreferred": {
        "alp": 23429,
        "coalition": 16512,
        "alpPercent": 58.66,
        "coalitionPercent": 41.34
    }
},
  "mulgrave": {
    "electorateId": "mulgrave",
    "name": "Mulgrave",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 37971,
    "primaryVotes": {
        "ALP": 19365,
        "COALITION": 6528,
        "GRN": 1930,
        "ON": 0,
        "OTH": 10148
    },
    "primaryPercentages": {
        "ALP": 51,
        "COALITION": 17.2,
        "GRN": 5.1,
        "ON": 0,
        "OTH": 26.7
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
    },
    "twoPartyPreferred": {
        "alp": 22976,
        "coalition": 15191,
        "alpPercent": 60.2,
        "coalitionPercent": 39.8
    }
},
  "narre_warren_n": {
    "electorateId": "narre_warren_n",
    "name": "Narre Warren North",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41370,
    "primaryVotes": {
        "ALP": 19350,
        "COALITION": 11291,
        "GRN": 2809,
        "ON": 0,
        "OTH": 7920
    },
    "primaryPercentages": {
        "ALP": 46.8,
        "COALITION": 27.3,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 19.1
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
            "toALP": 60.6,
            "toCoalition": 16.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 22.8
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 15.9,
            "toCoalition": 20.5,
            "toGreens": 8.5,
            "toOneNation": 0,
            "toOther": 55
        }
    },
    "twoPartyPreferred": {
        "alp": 22764,
        "coalition": 13537,
        "alpPercent": 55.03,
        "coalitionPercent": 32.72
    }
},
  "narre_warren_s": {
    "electorateId": "narre_warren_s",
    "name": "Narre Warren South",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42859,
    "primaryVotes": {
        "ALP": 20562,
        "COALITION": 12280,
        "GRN": 2836,
        "ON": 0,
        "OTH": 7181
    },
    "primaryPercentages": {
        "ALP": 48,
        "COALITION": 28.7,
        "GRN": 6.6,
        "ON": 0,
        "OTH": 16.8
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
            "toALP": 59.3,
            "toCoalition": 13.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 27.2
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 9.7,
            "toCoalition": 19.3,
            "toGreens": 15.1,
            "toOneNation": 0,
            "toOther": 55.9
        }
    },
    "twoPartyPreferred": {
        "alp": 23247,
        "coalition": 13815,
        "alpPercent": 54.24,
        "coalitionPercent": 32.23
    }
},
  "keysborough": {
    "electorateId": "keysborough",
    "name": "Keysborough",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 39980,
    "primaryVotes": {
        "ALP": 21531,
        "COALITION": 9154,
        "GRN": 2116,
        "ON": 0,
        "OTH": 7179
    },
    "primaryPercentages": {
        "ALP": 53.9,
        "COALITION": 22.9,
        "GRN": 5.3,
        "ON": 0,
        "OTH": 18
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
    },
    "twoPartyPreferred": {
        "alp": 26664,
        "coalition": 13474,
        "alpPercent": 66.43,
        "coalitionPercent": 33.57
    }
},
  "clarinda": {
    "electorateId": "clarinda",
    "name": "Clarinda",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40564,
    "primaryVotes": {
        "ALP": 18441,
        "COALITION": 11593,
        "GRN": 3227,
        "ON": 0,
        "OTH": 7303
    },
    "primaryPercentages": {
        "ALP": 45.5,
        "COALITION": 28.6,
        "GRN": 8,
        "ON": 0,
        "OTH": 18
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
            "toALP": 66.2,
            "toCoalition": 15.6,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 18.3
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17,
            "toCoalition": 14,
            "toGreens": 15.6,
            "toOneNation": 0,
            "toOther": 53.4
        }
    },
    "twoPartyPreferred": {
        "alp": 21954,
        "coalition": 12921,
        "alpPercent": 54.12,
        "coalitionPercent": 31.85
    }
},
  "benalla": {
    "electorateId": "benalla",
    "name": "Benalla",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41135,
    "primaryVotes": {
        "ALP": 5375,
        "COALITION": 17658,
        "GRN": 1592,
        "ON": 0,
        "OTH": 16510
    },
    "primaryPercentages": {
        "ALP": 13.1,
        "COALITION": 42.9,
        "GRN": 3.9,
        "ON": 0,
        "OTH": 40.1
    },
    "transferFlows": {
        "ALP": {
            "toALP": 0,
            "toCoalition": 25.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 74.5
        },
        "COALITION": {
            "toALP": 39.1,
            "toCoalition": 0,
            "toGreens": 25,
            "toOneNation": 0,
            "toOther": 35.9
        },
        "GRN": {
            "toALP": 29.9,
            "toCoalition": 11.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 58.4
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 8,
            "toCoalition": 31,
            "toGreens": 15.5,
            "toOneNation": 0,
            "toOther": 45.5
        }
    },
    "twoPartyPreferred": {
        "alp": 20179,
        "coalition": 20956,
        "alpPercent": 49.1,
        "coalitionPercent": 50.94
    }
},
  "euroa": {
    "electorateId": "euroa",
    "name": "Euroa",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42242,
    "primaryVotes": {
        "ALP": 12840,
        "COALITION": 22723,
        "GRN": 2245,
        "ON": 0,
        "OTH": 4434
    },
    "primaryPercentages": {
        "ALP": 30.4,
        "COALITION": 53.8,
        "GRN": 5.3,
        "ON": 0,
        "OTH": 10.5
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
            "toALP": 13,
            "toCoalition": 87,
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
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 15.2,
            "toCoalition": 54.9,
            "toGreens": 7.2,
            "toOneNation": 0,
            "toOther": 22.6
        }
    },
    "twoPartyPreferred": {
        "alp": 16926,
        "coalition": 25316,
        "alpPercent": 40.07,
        "coalitionPercent": 59.93
    }
},
  "mildura": {
    "electorateId": "mildura",
    "name": "Mildura",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 38140,
    "primaryVotes": {
        "ALP": 2483,
        "COALITION": 17159,
        "GRN": 894,
        "ON": 0,
        "OTH": 17604
    },
    "primaryPercentages": {
        "ALP": 6.5,
        "COALITION": 45,
        "GRN": 2.3,
        "ON": 0,
        "OTH": 46.2
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
            "toCoalition": 77.1,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 22.9
        },
        "GRN": {
            "toALP": 24.9,
            "toCoalition": 18.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 56.8
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 8.3,
            "toCoalition": 44.1,
            "toGreens": 3,
            "toOneNation": 0,
            "toOther": 44.6
        }
    },
    "twoPartyPreferred": {
        "alp": 18620,
        "coalition": 19520,
        "alpPercent": 48.8,
        "coalitionPercent": 51.18
    }
},
  "murray_plains": {
    "electorateId": "murray_plains",
    "name": "Murray Plains",
    "region": "northern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 40191,
    "primaryVotes": {
        "ALP": 7543,
        "COALITION": 24831,
        "GRN": 1560,
        "ON": 0,
        "OTH": 6257
    },
    "primaryPercentages": {
        "ALP": 18.8,
        "COALITION": 61.8,
        "GRN": 3.9,
        "ON": 0,
        "OTH": 15.6
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
    },
    "twoPartyPreferred": {
        "alp": 10919,
        "coalition": 29354,
        "alpPercent": 27.11,
        "coalitionPercent": 72.89
    }
},
  "ovens_valley": {
    "electorateId": "ovens_valley",
    "name": "Ovens Valley",
    "region": "northern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 40390,
    "primaryVotes": {
        "ALP": 8369,
        "COALITION": 21057,
        "GRN": 3625,
        "ON": 0,
        "OTH": 7339
    },
    "primaryPercentages": {
        "ALP": 20.7,
        "COALITION": 52.1,
        "GRN": 9,
        "ON": 0,
        "OTH": 18.2
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
    },
    "twoPartyPreferred": {
        "alp": 12959,
        "coalition": 27495,
        "alpPercent": 32.03,
        "coalitionPercent": 67.97
    }
},
  "shepparton": {
    "electorateId": "shepparton",
    "name": "Shepparton",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41301,
    "primaryVotes": {
        "ALP": 3285,
        "COALITION": 21733,
        "GRN": 1056,
        "ON": 0,
        "OTH": 15227
    },
    "primaryPercentages": {
        "ALP": 8,
        "COALITION": 52.6,
        "GRN": 2.6,
        "ON": 0,
        "OTH": 36.9
    },
    "transferFlows": {
        "ALP": {
            "toALP": 0,
            "toCoalition": 16.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 83.6
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
            "toCoalition": 6.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 58.1
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 13.5,
            "toCoalition": 14.8,
            "toGreens": 6.8,
            "toOneNation": 0,
            "toOther": 64.9
        }
    },
    "twoPartyPreferred": {
        "alp": 17846,
        "coalition": 23455,
        "alpPercent": 43.2,
        "coalitionPercent": 56.79
    }
},
  "swan_hill": {
    "electorateId": "swan_hill",
    "name": "Swan Hill",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42399,
    "primaryVotes": {
        "ALP": 12284,
        "COALITION": 20119,
        "GRN": 4753,
        "ON": 0,
        "OTH": 5243
    },
    "primaryPercentages": {
        "ALP": 29,
        "COALITION": 47.5,
        "GRN": 11.2,
        "ON": 0,
        "OTH": 12.4
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
            "toALP": 12.1,
            "toCoalition": 33.3,
            "toGreens": 24.5,
            "toOneNation": 0,
            "toOther": 30.1
        }
    },
    "twoPartyPreferred": {
        "alp": 13192,
        "coalition": 22615,
        "alpPercent": 31.11,
        "coalitionPercent": 53.34
    }
},
  "bendigo_east": {
    "electorateId": "bendigo_east",
    "name": "Bendigo East",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45568,
    "primaryVotes": {
        "ALP": 22010,
        "COALITION": 12478,
        "GRN": 3944,
        "ON": 2597,
        "OTH": 4539
    },
    "primaryPercentages": {
        "ALP": 48.3,
        "COALITION": 27.4,
        "GRN": 8.7,
        "ON": 5.7,
        "OTH": 10
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
            "toALP": 15.4,
            "toCoalition": 18.9,
            "toGreens": 19.2,
            "toOneNation": 34.8,
            "toOther": 11.7
        }
    },
    "twoPartyPreferred": {
        "alp": 22802,
        "coalition": 13450,
        "alpPercent": 50.04,
        "coalitionPercent": 29.52
    }
},
  "bendigo_west": {
    "electorateId": "bendigo_west",
    "name": "Bendigo West",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40248,
    "primaryVotes": {
        "ALP": 18704,
        "COALITION": 10057,
        "GRN": 4634,
        "ON": 0,
        "OTH": 6853
    },
    "primaryPercentages": {
        "ALP": 46.5,
        "COALITION": 25,
        "GRN": 11.5,
        "ON": 0,
        "OTH": 17
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
            "toALP": 17.3,
            "toCoalition": 32.5,
            "toGreens": 20.3,
            "toOneNation": 0,
            "toOther": 29.8
        }
    },
    "twoPartyPreferred": {
        "alp": 20396,
        "coalition": 13233,
        "alpPercent": 50.68,
        "coalitionPercent": 32.88
    }
},
  "macedon": {
    "electorateId": "macedon",
    "name": "Macedon",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41589,
    "primaryVotes": {
        "ALP": 17234,
        "COALITION": 12463,
        "GRN": 5214,
        "ON": 1511,
        "OTH": 5167
    },
    "primaryPercentages": {
        "ALP": 41.4,
        "COALITION": 30,
        "GRN": 12.5,
        "ON": 3.6,
        "OTH": 12.4
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
            "toALP": 17.3,
            "toCoalition": 21.2,
            "toGreens": 22.6,
            "toOneNation": 26.4,
            "toOther": 12.5
        }
    },
    "twoPartyPreferred": {
        "alp": 24762,
        "coalition": 16827,
        "alpPercent": 59.54,
        "coalitionPercent": 40.46
    }
},
  "yan_yean": {
    "electorateId": "yan_yean",
    "name": "Yan Yean",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39419,
    "primaryVotes": {
        "ALP": 16328,
        "COALITION": 13361,
        "GRN": 2537,
        "ON": 0,
        "OTH": 7193
    },
    "primaryPercentages": {
        "ALP": 41.4,
        "COALITION": 33.9,
        "GRN": 6.4,
        "ON": 0,
        "OTH": 18.2
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
            "toALP": 61.8,
            "toCoalition": 12.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 25.8
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.5,
            "toCoalition": 17.6,
            "toGreens": 13.8,
            "toOneNation": 0,
            "toOther": 51.1
        }
    },
    "twoPartyPreferred": {
        "alp": 19771,
        "coalition": 15059,
        "alpPercent": 50.16,
        "coalitionPercent": 38.2
    }
},
  "lowan": {
    "electorateId": "lowan",
    "name": "Lowan",
    "region": "western_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 43297,
    "primaryVotes": {
        "ALP": 8554,
        "COALITION": 25482,
        "GRN": 2575,
        "ON": 0,
        "OTH": 6686
    },
    "primaryPercentages": {
        "ALP": 19.8,
        "COALITION": 58.9,
        "GRN": 5.9,
        "ON": 0,
        "OTH": 15.4
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
    },
    "twoPartyPreferred": {
        "alp": 12288,
        "coalition": 30991,
        "alpPercent": 28.39,
        "coalitionPercent": 71.61
    }
},
  "polwarth": {
    "electorateId": "polwarth",
    "name": "Polwarth",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 46002,
    "primaryVotes": {
        "ALP": 13484,
        "COALITION": 19540,
        "GRN": 7661,
        "ON": 0,
        "OTH": 5317
    },
    "primaryPercentages": {
        "ALP": 29.3,
        "COALITION": 42.5,
        "GRN": 16.7,
        "ON": 0,
        "OTH": 11.6
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
            "toALP": 82.6,
            "toCoalition": 17.4,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16.9,
            "toCoalition": 40.1,
            "toGreens": 22.1,
            "toOneNation": 0,
            "toOther": 20.8
        }
    },
    "twoPartyPreferred": {
        "alp": 22179,
        "coalition": 23823,
        "alpPercent": 48.21,
        "coalitionPercent": 51.79
    }
},
  "sw_coast": {
    "electorateId": "sw_coast",
    "name": "South-West Coast",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45496,
    "primaryVotes": {
        "ALP": 9640,
        "COALITION": 19517,
        "GRN": 2457,
        "ON": 0,
        "OTH": 13882
    },
    "primaryPercentages": {
        "ALP": 21.2,
        "COALITION": 42.9,
        "GRN": 5.4,
        "ON": 0,
        "OTH": 30.5
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
            "toALP": 43.4,
            "toCoalition": 13,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 43.6
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 40.1,
            "toCoalition": 31.9,
            "toGreens": 2,
            "toOneNation": 0,
            "toOther": 26
        }
    },
    "twoPartyPreferred": {
        "alp": 19086,
        "coalition": 26410,
        "alpPercent": 41.95,
        "coalitionPercent": 58.05
    }
},
  "portland": {
    "electorateId": "portland",
    "name": "Portland Coast",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37706,
    "primaryVotes": {
        "ALP": 16253,
        "COALITION": 11895,
        "GRN": 2459,
        "ON": 0,
        "OTH": 7099
    },
    "primaryPercentages": {
        "ALP": 43.1,
        "COALITION": 31.5,
        "GRN": 6.5,
        "ON": 0,
        "OTH": 18.8
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
            "toALP": 72.2,
            "toCoalition": 27.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17,
            "toCoalition": 33.7,
            "toGreens": 23.3,
            "toOneNation": 0,
            "toOther": 25.9
        }
    },
    "twoPartyPreferred": {
        "alp": 21271,
        "coalition": 16435,
        "alpPercent": 56.41,
        "coalitionPercent": 43.59
    }
},
  "ballarat_east": {
    "electorateId": "ballarat_east",
    "name": "Ballarat East",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45247,
    "primaryVotes": {
        "ALP": 18531,
        "COALITION": 14320,
        "GRN": 4887,
        "ON": 0,
        "OTH": 7509
    },
    "primaryPercentages": {
        "ALP": 41,
        "COALITION": 31.6,
        "GRN": 10.8,
        "ON": 0,
        "OTH": 16.6
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
            "toALP": 74.9,
            "toCoalition": 25.1,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.1,
            "toCoalition": 28.9,
            "toGreens": 21.1,
            "toOneNation": 0,
            "toOther": 32.9
        }
    },
    "twoPartyPreferred": {
        "alp": 25869,
        "coalition": 19378,
        "alpPercent": 57.17,
        "coalitionPercent": 42.83
    }
},
  "ballarat_west": {
    "electorateId": "ballarat_west",
    "name": "Ballarat West",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42175,
    "primaryVotes": {
        "ALP": 20059,
        "COALITION": 12548,
        "GRN": 4386,
        "ON": 0,
        "OTH": 5182
    },
    "primaryPercentages": {
        "ALP": 47.6,
        "COALITION": 29.8,
        "GRN": 10.4,
        "ON": 0,
        "OTH": 12.3
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
            "toALP": 20.9,
            "toCoalition": 34.3,
            "toGreens": 24.3,
            "toOneNation": 0,
            "toOther": 20.4
        }
    },
    "twoPartyPreferred": {
        "alp": 21423,
        "coalition": 14783,
        "alpPercent": 50.8,
        "coalitionPercent": 35.05
    }
},
  "bellarine": {
    "electorateId": "bellarine",
    "name": "Bellarine",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 47153,
    "primaryVotes": {
        "ALP": 20103,
        "COALITION": 15617,
        "GRN": 5537,
        "ON": 0,
        "OTH": 5896
    },
    "primaryPercentages": {
        "ALP": 42.6,
        "COALITION": 33.1,
        "GRN": 11.7,
        "ON": 0,
        "OTH": 12.5
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
            "toALP": 78,
            "toCoalition": 22,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 19.1,
            "toCoalition": 27.9,
            "toGreens": 24.3,
            "toOneNation": 0,
            "toOther": 28.6
        }
    },
    "twoPartyPreferred": {
        "alp": 27567,
        "coalition": 19586,
        "alpPercent": 58.46,
        "coalitionPercent": 41.54
    }
},
  "geelong": {
    "electorateId": "geelong",
    "name": "Geelong",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 44762,
    "primaryVotes": {
        "ALP": 20754,
        "COALITION": 12194,
        "GRN": 6849,
        "ON": 0,
        "OTH": 4965
    },
    "primaryPercentages": {
        "ALP": 46.4,
        "COALITION": 27.2,
        "GRN": 15.3,
        "ON": 0,
        "OTH": 11.1
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
            "toALP": 82.4,
            "toCoalition": 17.6,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16,
            "toCoalition": 33.5,
            "toGreens": 31.2,
            "toOneNation": 0,
            "toOther": 19.4
        }
    },
    "twoPartyPreferred": {
        "alp": 28965,
        "coalition": 15797,
        "alpPercent": 64.71,
        "coalitionPercent": 35.29
    }
},
  "lara": {
    "electorateId": "lara",
    "name": "Lara",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 39521,
    "primaryVotes": {
        "ALP": 19635,
        "COALITION": 8460,
        "GRN": 4473,
        "ON": 0,
        "OTH": 6953
    },
    "primaryPercentages": {
        "ALP": 49.7,
        "COALITION": 21.4,
        "GRN": 11.3,
        "ON": 0,
        "OTH": 17.6
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
            "toALP": 11.9,
            "toCoalition": 8.7,
            "toGreens": 26.9,
            "toOneNation": 0,
            "toOther": 52.5
        }
    },
    "twoPartyPreferred": {
        "alp": 19882,
        "coalition": 8641,
        "alpPercent": 50.31,
        "coalitionPercent": 21.86
    }
},
  "south_barwon": {
    "electorateId": "south_barwon",
    "name": "South Barwon",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45184,
    "primaryVotes": {
        "ALP": 19969,
        "COALITION": 14516,
        "GRN": 5719,
        "ON": 0,
        "OTH": 4980
    },
    "primaryPercentages": {
        "ALP": 44.2,
        "COALITION": 32.1,
        "GRN": 12.7,
        "ON": 0,
        "OTH": 11
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
            "toALP": 80,
            "toCoalition": 20,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.7,
            "toCoalition": 32.8,
            "toGreens": 24.4,
            "toOneNation": 0,
            "toOther": 25
        }
    },
    "twoPartyPreferred": {
        "alp": 27020,
        "coalition": 18164,
        "alpPercent": 59.8,
        "coalitionPercent": 40.2
    }
},
  "ripon": {
    "electorateId": "ripon",
    "name": "Ripon",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42341,
    "primaryVotes": {
        "ALP": 16321,
        "COALITION": 15305,
        "GRN": 2524,
        "ON": 0,
        "OTH": 8191
    },
    "primaryPercentages": {
        "ALP": 38.5,
        "COALITION": 36.1,
        "GRN": 6,
        "ON": 0,
        "OTH": 19.3
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
            "toALP": 71.9,
            "toCoalition": 11.1,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 17
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 32.5,
            "toCoalition": 36.5,
            "toGreens": 6.3,
            "toOneNation": 0,
            "toOther": 24.7
        }
    },
    "twoPartyPreferred": {
        "alp": 22438,
        "coalition": 19903,
        "alpPercent": 52.99,
        "coalitionPercent": 47.01
    }
},
  "evelyn": {
    "electorateId": "evelyn",
    "name": "Evelyn",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43665,
    "primaryVotes": {
        "ALP": 14277,
        "COALITION": 20385,
        "GRN": 4052,
        "ON": 0,
        "OTH": 4951
    },
    "primaryPercentages": {
        "ALP": 32.7,
        "COALITION": 46.7,
        "GRN": 9.3,
        "ON": 0,
        "OTH": 11.3
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
            "toALP": 17.7,
            "toCoalition": 37.4,
            "toGreens": 25.3,
            "toOneNation": 0,
            "toOther": 19.6
        }
    },
    "twoPartyPreferred": {
        "alp": 15370,
        "coalition": 22686,
        "alpPercent": 35.2,
        "coalitionPercent": 51.95
    }
},
  "narracan": {
    "electorateId": "narracan",
    "name": "Narracan",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 37205,
    "primaryVotes": {
        "ALP": 0,
        "COALITION": 16741,
        "GRN": 4132,
        "ON": 2246,
        "OTH": 14086
    },
    "primaryPercentages": {
        "ALP": 0,
        "COALITION": 45,
        "GRN": 11.1,
        "ON": 6,
        "OTH": 37.9
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
    },
    "twoPartyPreferred": {
        "alp": 17975,
        "coalition": 19230,
        "alpPercent": 48.3,
        "coalitionPercent": 51.69
    }
},
  "nepean": {
    "electorateId": "nepean",
    "name": "Nepean",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 40766,
    "primaryVotes": {
        "ALP": 13308,
        "COALITION": 19614,
        "GRN": 3576,
        "ON": 0,
        "OTH": 4268
    },
    "primaryPercentages": {
        "ALP": 32.6,
        "COALITION": 48.1,
        "GRN": 8.8,
        "ON": 0,
        "OTH": 10.5
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
            "toALP": 13.3,
            "toCoalition": 21.5,
            "toGreens": 18.7,
            "toOneNation": 0,
            "toOther": 46.6
        }
    },
    "twoPartyPreferred": {
        "alp": 13919,
        "coalition": 20603,
        "alpPercent": 34.14,
        "coalitionPercent": 50.54
    }
},
  "mornington": {
    "electorateId": "mornington",
    "name": "Mornington",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42062,
    "primaryVotes": {
        "ALP": 9246,
        "COALITION": 17910,
        "GRN": 2677,
        "ON": 0,
        "OTH": 12229
    },
    "primaryPercentages": {
        "ALP": 22,
        "COALITION": 42.6,
        "GRN": 6.4,
        "ON": 0,
        "OTH": 29.1
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
            "toALP": 39.1,
            "toCoalition": 0,
            "toGreens": 25,
            "toOneNation": 0,
            "toOther": 35.9
        },
        "GRN": {
            "toALP": 38.3,
            "toCoalition": 11.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 50.5
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 5.7,
            "toCoalition": 38.2,
            "toGreens": 13.3,
            "toOneNation": 0,
            "toOther": 42.7
        }
    },
    "twoPartyPreferred": {
        "alp": 20736,
        "coalition": 21326,
        "alpPercent": 49.3,
        "coalitionPercent": 50.7
    }
},
  "gippsland_east": {
    "electorateId": "gippsland_east",
    "name": "Gippsland East",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 42212,
    "primaryVotes": {
        "ALP": 7191,
        "COALITION": 26737,
        "GRN": 2691,
        "ON": 0,
        "OTH": 5593
    },
    "primaryPercentages": {
        "ALP": 17,
        "COALITION": 63.3,
        "GRN": 6.4,
        "ON": 0,
        "OTH": 13.2
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
    },
    "twoPartyPreferred": {
        "alp": 11027,
        "coalition": 31259,
        "alpPercent": 26.08,
        "coalitionPercent": 73.92
    }
},
  "gippsland_south": {
    "electorateId": "gippsland_south",
    "name": "Gippsland South",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 42363,
    "primaryVotes": {
        "ALP": 9920,
        "COALITION": 22566,
        "GRN": 3538,
        "ON": 0,
        "OTH": 6339
    },
    "primaryPercentages": {
        "ALP": 23.4,
        "COALITION": 53.3,
        "GRN": 8.4,
        "ON": 0,
        "OTH": 15
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
    },
    "twoPartyPreferred": {
        "alp": 14723,
        "coalition": 27645,
        "alpPercent": 34.75,
        "coalitionPercent": 65.25
    }
},
  "morwell": {
    "electorateId": "morwell",
    "name": "Morwell",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 43261,
    "primaryVotes": {
        "ALP": 13601,
        "COALITION": 16612,
        "GRN": 1830,
        "ON": 2648,
        "OTH": 8570
    },
    "primaryPercentages": {
        "ALP": 31.4,
        "COALITION": 38.4,
        "GRN": 4.2,
        "ON": 6.1,
        "OTH": 19.8
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
            "toALP": 11.3,
            "toCoalition": 88.7,
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
            "toALP": 20.5,
            "toCoalition": 24.2,
            "toGreens": 4.1,
            "toOneNation": 31.2,
            "toOther": 20
        }
    },
    "twoPartyPreferred": {
        "alp": 19720,
        "coalition": 23541,
        "alpPercent": 45.58,
        "coalitionPercent": 54.42
    }
},
  "bass": {
    "electorateId": "bass",
    "name": "Bass",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41404,
    "primaryVotes": {
        "ALP": 13478,
        "COALITION": 17988,
        "GRN": 3369,
        "ON": 0,
        "OTH": 6569
    },
    "primaryPercentages": {
        "ALP": 32.6,
        "COALITION": 43.4,
        "GRN": 8.1,
        "ON": 0,
        "OTH": 15.9
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
            "toALP": 31.2,
            "toCoalition": 68.8,
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
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 14.7,
            "toCoalition": 39.5,
            "toGreens": 18.6,
            "toOneNation": 0,
            "toOther": 27.3
        }
    },
    "twoPartyPreferred": {
        "alp": 20803,
        "coalition": 20601,
        "alpPercent": 50.24,
        "coalitionPercent": 49.76
    }
},
  "hastings": {
    "electorateId": "hastings",
    "name": "Hastings",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41232,
    "primaryVotes": {
        "ALP": 15361,
        "COALITION": 16415,
        "GRN": 4118,
        "ON": 0,
        "OTH": 5338
    },
    "primaryPercentages": {
        "ALP": 37.3,
        "COALITION": 39.8,
        "GRN": 10,
        "ON": 0,
        "OTH": 12.9
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
            "toALP": 77.8,
            "toCoalition": 22.2,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 16,
            "toCoalition": 32.4,
            "toGreens": 26.4,
            "toOneNation": 0,
            "toOther": 25.2
        }
    },
    "twoPartyPreferred": {
        "alp": 21174,
        "coalition": 20058,
        "alpPercent": 51.35,
        "coalitionPercent": 48.65
    }
},
  "monbulk": {
    "electorateId": "monbulk",
    "name": "Monbulk",
    "region": "eastern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41797,
    "primaryVotes": {
        "ALP": 15071,
        "COALITION": 12327,
        "GRN": 6255,
        "ON": 0,
        "OTH": 8144
    },
    "primaryPercentages": {
        "ALP": 36.1,
        "COALITION": 29.5,
        "GRN": 15,
        "ON": 0,
        "OTH": 19.5
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
            "toALP": 78.2,
            "toCoalition": 21.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 13.3,
            "toCoalition": 29.3,
            "toGreens": 29.3,
            "toOneNation": 0,
            "toOther": 28.1
        }
    },
    "twoPartyPreferred": {
        "alp": 24056,
        "coalition": 17741,
        "alpPercent": 57.55,
        "coalitionPercent": 42.45
    }
},
  "pakenham": {
    "electorateId": "pakenham",
    "name": "Pakenham",
    "region": "eastern_vic",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 38867,
    "primaryVotes": {
        "ALP": 13151,
        "COALITION": 12605,
        "GRN": 2571,
        "ON": 1321,
        "OTH": 9219
    },
    "primaryPercentages": {
        "ALP": 33.8,
        "COALITION": 32.4,
        "GRN": 6.6,
        "ON": 3.4,
        "OTH": 23.7
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
    },
    "twoPartyPreferred": {
        "alp": 19587,
        "coalition": 19280,
        "alpPercent": 50.39,
        "coalitionPercent": 49.61
    }
},
  "eureka": {
    "electorateId": "eureka",
    "name": "Eureka",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45247,
    "primaryVotes": {
        "ALP": 18531,
        "COALITION": 14320,
        "GRN": 4887,
        "ON": 0,
        "OTH": 7509
    },
    "primaryPercentages": {
        "ALP": 41,
        "COALITION": 31.6,
        "GRN": 10.8,
        "ON": 0,
        "OTH": 16.6
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
            "toALP": 74.9,
            "toCoalition": 25.1,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17.1,
            "toCoalition": 28.9,
            "toGreens": 21.1,
            "toOneNation": 0,
            "toOther": 32.9
        }
    },
    "twoPartyPreferred": {
        "alp": 25869,
        "coalition": 19378,
        "alpPercent": 57.17,
        "coalitionPercent": 42.83
    }
},
  "wendouree": {
    "electorateId": "wendouree",
    "name": "Wendouree",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42175,
    "primaryVotes": {
        "ALP": 20059,
        "COALITION": 12548,
        "GRN": 4386,
        "ON": 0,
        "OTH": 5182
    },
    "primaryPercentages": {
        "ALP": 47.6,
        "COALITION": 29.8,
        "GRN": 10.4,
        "ON": 0,
        "OTH": 12.3
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
            "toALP": 20.9,
            "toCoalition": 34.3,
            "toGreens": 24.3,
            "toOneNation": 0,
            "toOther": 20.4
        }
    },
    "twoPartyPreferred": {
        "alp": 21423,
        "coalition": 14783,
        "alpPercent": 50.8,
        "coalitionPercent": 35.05
    }
},
  "south_west_coast": {
    "electorateId": "south_west_coast",
    "name": "South West Coast",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 45496,
    "primaryVotes": {
        "ALP": 9640,
        "COALITION": 19517,
        "GRN": 2457,
        "ON": 0,
        "OTH": 13882
    },
    "primaryPercentages": {
        "ALP": 21.2,
        "COALITION": 42.9,
        "GRN": 5.4,
        "ON": 0,
        "OTH": 30.5
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
            "toALP": 43.4,
            "toCoalition": 13,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 43.6
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 40.1,
            "toCoalition": 31.9,
            "toGreens": 2,
            "toOneNation": 0,
            "toOther": 26
        }
    },
    "twoPartyPreferred": {
        "alp": 19086,
        "coalition": 26410,
        "alpPercent": 41.95,
        "coalitionPercent": 58.05
    }
},
  "narre_warren_north": {
    "electorateId": "narre_warren_north",
    "name": "Narre Warren North",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41370,
    "primaryVotes": {
        "ALP": 19350,
        "COALITION": 11291,
        "GRN": 2809,
        "ON": 0,
        "OTH": 7920
    },
    "primaryPercentages": {
        "ALP": 46.8,
        "COALITION": 27.3,
        "GRN": 6.8,
        "ON": 0,
        "OTH": 19.1
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
            "toALP": 60.6,
            "toCoalition": 16.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 22.8
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 15.9,
            "toCoalition": 20.5,
            "toGreens": 8.5,
            "toOneNation": 0,
            "toOther": 55
        }
    },
    "twoPartyPreferred": {
        "alp": 22764,
        "coalition": 13537,
        "alpPercent": 55.03,
        "coalitionPercent": 32.72
    }
},
  "narre_warren_south": {
    "electorateId": "narre_warren_south",
    "name": "Narre Warren South",
    "region": "se_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42859,
    "primaryVotes": {
        "ALP": 20562,
        "COALITION": 12280,
        "GRN": 2836,
        "ON": 0,
        "OTH": 7181
    },
    "primaryPercentages": {
        "ALP": 48,
        "COALITION": 28.7,
        "GRN": 6.6,
        "ON": 0,
        "OTH": 16.8
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
            "toALP": 59.3,
            "toCoalition": 13.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 27.2
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 9.7,
            "toCoalition": 19.3,
            "toGreens": 15.1,
            "toOneNation": 0,
            "toOther": 55.9
        }
    },
    "twoPartyPreferred": {
        "alp": 23247,
        "coalition": 13815,
        "alpPercent": 54.24,
        "coalitionPercent": 32.23
    }
},
  "benambra": {
    "electorateId": "benambra",
    "name": "Benambra",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41135,
    "primaryVotes": {
        "ALP": 5375,
        "COALITION": 17658,
        "GRN": 1592,
        "ON": 0,
        "OTH": 16510
    },
    "primaryPercentages": {
        "ALP": 13.1,
        "COALITION": 42.9,
        "GRN": 3.9,
        "ON": 0,
        "OTH": 40.1
    },
    "transferFlows": {
        "ALP": {
            "toALP": 0,
            "toCoalition": 25.5,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 74.5
        },
        "COALITION": {
            "toALP": 39.1,
            "toCoalition": 0,
            "toGreens": 25,
            "toOneNation": 0,
            "toOther": 35.9
        },
        "GRN": {
            "toALP": 29.9,
            "toCoalition": 11.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 58.4
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 8,
            "toCoalition": 31,
            "toGreens": 15.5,
            "toOneNation": 0,
            "toOther": 45.5
        }
    },
    "twoPartyPreferred": {
        "alp": 20179,
        "coalition": 20956,
        "alpPercent": 49.1,
        "coalitionPercent": 50.94
    }
},
  "eildon": {
    "electorateId": "eildon",
    "name": "Eildon",
    "region": "northern_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 42399,
    "primaryVotes": {
        "ALP": 12284,
        "COALITION": 20119,
        "GRN": 4753,
        "ON": 0,
        "OTH": 5243
    },
    "primaryPercentages": {
        "ALP": 29,
        "COALITION": 47.5,
        "GRN": 11.2,
        "ON": 0,
        "OTH": 12.4
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
            "toALP": 12.1,
            "toCoalition": 33.3,
            "toGreens": 24.5,
            "toOneNation": 0,
            "toOther": 30.1
        }
    },
    "twoPartyPreferred": {
        "alp": 13192,
        "coalition": 22615,
        "alpPercent": 31.11,
        "coalitionPercent": 53.34
    }
},
  "essendon": {
    "electorateId": "essendon",
    "name": "Essendon",
    "region": "eastern_metro",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 41867,
    "primaryVotes": {
        "ALP": 17196,
        "COALITION": 12331,
        "GRN": 6344,
        "ON": 0,
        "OTH": 5996
    },
    "primaryPercentages": {
        "ALP": 41.1,
        "COALITION": 29.5,
        "GRN": 15.2,
        "ON": 0,
        "OTH": 14.3
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
            "toALP": 81.2,
            "toCoalition": 18.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 14.7,
            "toCoalition": 20.5,
            "toGreens": 42.6,
            "toOneNation": 0,
            "toOther": 22.2
        }
    },
    "twoPartyPreferred": {
        "alp": 26146,
        "coalition": 15721,
        "alpPercent": 62.45,
        "coalitionPercent": 37.55
    }
},
  "kalkallo": {
    "electorateId": "kalkallo",
    "name": "Kalkallo",
    "region": "se_metro",
    "hasOfficialDistribution": false,
    "totalFormalVotes": 39980,
    "primaryVotes": {
        "ALP": 21531,
        "COALITION": 9154,
        "GRN": 2116,
        "ON": 0,
        "OTH": 7179
    },
    "primaryPercentages": {
        "ALP": 53.9,
        "COALITION": 22.9,
        "GRN": 5.3,
        "ON": 0,
        "OTH": 18
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
    },
    "twoPartyPreferred": {
        "alp": 26664,
        "coalition": 13474,
        "alpPercent": 66.43,
        "coalitionPercent": 33.57
    }
},
  "sunbury": {
    "electorateId": "sunbury",
    "name": "Sunbury",
    "region": "western_vic",
    "hasOfficialDistribution": true,
    "totalFormalVotes": 37706,
    "primaryVotes": {
        "ALP": 16253,
        "COALITION": 11895,
        "GRN": 2459,
        "ON": 0,
        "OTH": 7099
    },
    "primaryPercentages": {
        "ALP": 43.1,
        "COALITION": 31.5,
        "GRN": 6.5,
        "ON": 0,
        "OTH": 18.8
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
            "toALP": 72.2,
            "toCoalition": 27.8,
            "toGreens": 0,
            "toOneNation": 0,
            "toOther": 0
        },
        "ON": {
            "toALP": 19.3,
            "toCoalition": 72.5,
            "toGreens": 8.2,
            "toOneNation": 0,
            "toOther": 0
        },
        "OTH": {
            "toALP": 17,
            "toCoalition": 33.7,
            "toGreens": 23.3,
            "toOneNation": 0,
            "toOther": 25.9
        }
    },
    "twoPartyPreferred": {
        "alp": 21271,
        "coalition": 16435,
        "alpPercent": 56.41,
        "coalitionPercent": 43.59
    }
},
};
