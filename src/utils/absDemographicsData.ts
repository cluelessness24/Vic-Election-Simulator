/**
 * Official ABS 2021 Census State Electoral Division Data for Victoria
 * Source: Australian Bureau of Statistics (ABS) 2021 General Community Profile (GCP)
 */

import { DemographicData } from "./demographics";

export const ABS_2021_CENSUS_DEMOGRAPHICS: Record<string, DemographicData> = {
  "albert_park": {
    "age": {
      "under20": 13.2,
      "twentyTo34": 32.2,
      "thirtyFiveTo54": 30.9,
      "fiftyFivePlus": 23.7,
      "median": 37
    },
    "gender": {
      "male": 49.4,
      "female": 50.6
    },
    "religion": {
      "christianity": 33.7,
      "noReligion": 48.2,
      "islam": 2.1,
      "hinduism": 3.5,
      "buddhism": 2.7,
      "other": 9.8
    },
    "homeOwnership": {
      "ownedOutright": 20.9,
      "mortgage": 23.4,
      "rented": 55.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 2076,
      "ranges": {
        "low": 21.9,
        "mid": 45.6,
        "high": 32.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 51,
      "diplomaCertificate": 18.6,
      "highSchoolOrBelow": 30.4
    }
  },
  "laverton": {
    "age": {
      "under20": 28.9,
      "twentyTo34": 19.4,
      "thirtyFiveTo54": 32.8,
      "fiftyFivePlus": 18.9,
      "median": 35
    },
    "gender": {
      "male": 49.6,
      "female": 50.4
    },
    "religion": {
      "christianity": 40.1,
      "noReligion": 30.9,
      "islam": 5.7,
      "hinduism": 11.4,
      "buddhism": 3.2,
      "other": 8.7
    },
    "homeOwnership": {
      "ownedOutright": 24.9,
      "mortgage": 44.1,
      "rented": 31.1,
      "other": 0
    },
    "income": {
      "medianWeekly": 2123,
      "ranges": {
        "low": 21.5,
        "mid": 48.2,
        "high": 30.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 34.8,
      "diplomaCertificate": 24.4,
      "highSchoolOrBelow": 40.9
    }
  },
  "bass": {
    "age": {
      "under20": 27.1,
      "twentyTo34": 20.2,
      "thirtyFiveTo54": 25.9,
      "fiftyFivePlus": 26.8,
      "median": 36
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 37.6,
      "noReligion": 39.2,
      "islam": 3.2,
      "hinduism": 4.7,
      "buddhism": 3.4,
      "other": 11.8
    },
    "homeOwnership": {
      "ownedOutright": 30.2,
      "mortgage": 46.6,
      "rented": 23.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 1604,
      "ranges": {
        "low": 30.6,
        "mid": 52.8,
        "high": 16.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 21.1,
      "diplomaCertificate": 33,
      "highSchoolOrBelow": 45.9
    }
  },
  "bayswater": {
    "age": {
      "under20": 22.8,
      "twentyTo34": 19.6,
      "thirtyFiveTo54": 28.4,
      "fiftyFivePlus": 29.2,
      "median": 39
    },
    "gender": {
      "male": 48.9,
      "female": 51.1
    },
    "religion": {
      "christianity": 38.7,
      "noReligion": 46.7,
      "islam": 0.9,
      "hinduism": 2.9,
      "buddhism": 3.1,
      "other": 7.6
    },
    "homeOwnership": {
      "ownedOutright": 32.5,
      "mortgage": 42.2,
      "rented": 25.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1738,
      "ranges": {
        "low": 27.6,
        "mid": 50.9,
        "high": 21.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 26.4,
      "diplomaCertificate": 30.8,
      "highSchoolOrBelow": 42.9
    }
  },
  "bellarine": {
    "age": {
      "under20": 21.8,
      "twentyTo34": 13,
      "thirtyFiveTo54": 23.6,
      "fiftyFivePlus": 41.6,
      "median": 48
    },
    "gender": {
      "male": 48.1,
      "female": 51.9
    },
    "religion": {
      "christianity": 45.7,
      "noReligion": 45.9,
      "islam": 0.3,
      "hinduism": 0.3,
      "buddhism": 0.6,
      "other": 7.3
    },
    "homeOwnership": {
      "ownedOutright": 46.1,
      "mortgage": 35.6,
      "rented": 18.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1535,
      "ranges": {
        "low": 32.7,
        "mid": 46.8,
        "high": 20.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 23.9,
      "diplomaCertificate": 33.3,
      "highSchoolOrBelow": 42.7
    }
  },
  "benalla": {
    "age": {
      "under20": 24.8,
      "twentyTo34": 16.6,
      "thirtyFiveTo54": 24.5,
      "fiftyFivePlus": 34,
      "median": 42
    },
    "gender": {
      "male": 49.2,
      "female": 50.8
    },
    "religion": {
      "christianity": 44.8,
      "noReligion": 45.1,
      "islam": 0.3,
      "hinduism": 0.8,
      "buddhism": 0.7,
      "other": 8.4
    },
    "homeOwnership": {
      "ownedOutright": 37.4,
      "mortgage": 36.7,
      "rented": 25.8,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1471,
      "ranges": {
        "low": 33.5,
        "mid": 50.8,
        "high": 15.7
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 17.7,
      "diplomaCertificate": 35.5,
      "highSchoolOrBelow": 46.9
    }
  },
  "bendigo_east": {
    "age": {
      "under20": 25.8,
      "twentyTo34": 19,
      "thirtyFiveTo54": 24.2,
      "fiftyFivePlus": 31,
      "median": 39
    },
    "gender": {
      "male": 48.4,
      "female": 51.6
    },
    "religion": {
      "christianity": 43.3,
      "noReligion": 47,
      "islam": 0.6,
      "hinduism": 0.7,
      "buddhism": 1.1,
      "other": 7.2
    },
    "homeOwnership": {
      "ownedOutright": 35.6,
      "mortgage": 38.6,
      "rented": 25.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1557,
      "ranges": {
        "low": 31.8,
        "mid": 50.2,
        "high": 18
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 21.6,
      "diplomaCertificate": 32,
      "highSchoolOrBelow": 46.4
    }
  },
  "bendigo_west": {
    "age": {
      "under20": 22,
      "twentyTo34": 17.3,
      "thirtyFiveTo54": 24.4,
      "fiftyFivePlus": 36.4,
      "median": 43
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 37.1,
      "noReligion": 50.6,
      "islam": 0.5,
      "hinduism": 0.6,
      "buddhism": 1.3,
      "other": 9.8
    },
    "homeOwnership": {
      "ownedOutright": 39.1,
      "mortgage": 34.5,
      "rented": 26.3,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1318,
      "ranges": {
        "low": 39,
        "mid": 47.3,
        "high": 13.7
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 20.9,
      "diplomaCertificate": 30.4,
      "highSchoolOrBelow": 48.8
    }
  },
  "bentleigh": {
    "age": {
      "under20": 25.8,
      "twentyTo34": 16.6,
      "thirtyFiveTo54": 30.5,
      "fiftyFivePlus": 27.1,
      "median": 40
    },
    "gender": {
      "male": 48.6,
      "female": 51.4
    },
    "religion": {
      "christianity": 39.6,
      "noReligion": 40.5,
      "islam": 0.7,
      "hinduism": 3.3,
      "buddhism": 2.2,
      "other": 13.7
    },
    "homeOwnership": {
      "ownedOutright": 34.4,
      "mortgage": 37.7,
      "rented": 27.9,
      "other": 0
    },
    "income": {
      "medianWeekly": 2191,
      "ranges": {
        "low": 24.2,
        "mid": 39.7,
        "high": 36.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 40.8,
      "diplomaCertificate": 22.1,
      "highSchoolOrBelow": 37.1
    }
  },
  "box_hill": {
    "age": {
      "under20": 21.2,
      "twentyTo34": 22.5,
      "thirtyFiveTo54": 26.7,
      "fiftyFivePlus": 29.6,
      "median": 39
    },
    "gender": {
      "male": 48.1,
      "female": 51.9
    },
    "religion": {
      "christianity": 36.7,
      "noReligion": 46.4,
      "islam": 1.4,
      "hinduism": 3.2,
      "buddhism": 5.2,
      "other": 7.1
    },
    "homeOwnership": {
      "ownedOutright": 36.5,
      "mortgage": 30.2,
      "rented": 33.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1836,
      "ranges": {
        "low": 28.7,
        "mid": 41.8,
        "high": 29.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 44.7,
      "diplomaCertificate": 18.7,
      "highSchoolOrBelow": 36.6
    }
  },
  "brighton": {
    "age": {
      "under20": 22.4,
      "twentyTo34": 15.9,
      "thirtyFiveTo54": 28.7,
      "fiftyFivePlus": 33,
      "median": 44
    },
    "gender": {
      "male": 47.6,
      "female": 52.4
    },
    "religion": {
      "christianity": 40.7,
      "noReligion": 45.3,
      "islam": 0.7,
      "hinduism": 0.8,
      "buddhism": 1.3,
      "other": 11.2
    },
    "homeOwnership": {
      "ownedOutright": 37.8,
      "mortgage": 30.8,
      "rented": 31.4,
      "other": 0
    },
    "income": {
      "medianWeekly": 2425,
      "ranges": {
        "low": 20.3,
        "mid": 36.7,
        "high": 43.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 47.7,
      "diplomaCertificate": 18.4,
      "highSchoolOrBelow": 33.9
    }
  },
  "broadmeadows": {
    "age": {
      "under20": 27.1,
      "twentyTo34": 24,
      "thirtyFiveTo54": 25,
      "fiftyFivePlus": 23.9,
      "median": 34
    },
    "gender": {
      "male": 50.8,
      "female": 49.2
    },
    "religion": {
      "christianity": 33.1,
      "noReligion": 12.7,
      "islam": 38.6,
      "hinduism": 3.8,
      "buddhism": 2.1,
      "other": 9.7
    },
    "homeOwnership": {
      "ownedOutright": 31.6,
      "mortgage": 35.2,
      "rented": 33.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 1281,
      "ranges": {
        "low": 39.9,
        "mid": 47.5,
        "high": 12.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 18.7,
      "diplomaCertificate": 20.5,
      "highSchoolOrBelow": 60.9
    }
  },
  "brunswick": {
    "age": {
      "under20": 15.5,
      "twentyTo34": 34.7,
      "thirtyFiveTo54": 29.1,
      "fiftyFivePlus": 20.6,
      "median": 34
    },
    "gender": {
      "male": 47.9,
      "female": 52.1
    },
    "religion": {
      "christianity": 30.3,
      "noReligion": 56.3,
      "islam": 3.5,
      "hinduism": 1.6,
      "buddhism": 1.9,
      "other": 6.3
    },
    "homeOwnership": {
      "ownedOutright": 24.9,
      "mortgage": 27.8,
      "rented": 47.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 2036,
      "ranges": {
        "low": 23.2,
        "mid": 46.1,
        "high": 30.7
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 51.9,
      "diplomaCertificate": 17.3,
      "highSchoolOrBelow": 30.9
    }
  },
  "bulleen": {
    "age": {
      "under20": 20.5,
      "twentyTo34": 17.8,
      "thirtyFiveTo54": 25.6,
      "fiftyFivePlus": 36.1,
      "median": 44
    },
    "gender": {
      "male": 48.2,
      "female": 51.8
    },
    "religion": {
      "christianity": 48.2,
      "noReligion": 35.3,
      "islam": 3.4,
      "hinduism": 1.9,
      "buddhism": 4.7,
      "other": 6.5
    },
    "homeOwnership": {
      "ownedOutright": 45.5,
      "mortgage": 31.7,
      "rented": 22.8,
      "other": 0
    },
    "income": {
      "medianWeekly": 1816,
      "ranges": {
        "low": 29.1,
        "mid": 42.9,
        "high": 28
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 38.3,
      "diplomaCertificate": 20.7,
      "highSchoolOrBelow": 41
    }
  },
  "bundoora": {
    "age": {
      "under20": 21.7,
      "twentyTo34": 22.6,
      "thirtyFiveTo54": 26.8,
      "fiftyFivePlus": 28.8,
      "median": 38
    },
    "gender": {
      "male": 49.9,
      "female": 50.1
    },
    "religion": {
      "christianity": 47.8,
      "noReligion": 35.8,
      "islam": 3.4,
      "hinduism": 3.2,
      "buddhism": 3.2,
      "other": 6.6
    },
    "homeOwnership": {
      "ownedOutright": 37.4,
      "mortgage": 36,
      "rented": 26.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 1754,
      "ranges": {
        "low": 28.9,
        "mid": 46.9,
        "high": 24.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 30.1,
      "diplomaCertificate": 25.8,
      "highSchoolOrBelow": 44.1
    }
  },
  "ballarat_east": {
    "age": {
      "under20": 25.2,
      "twentyTo34": 18.6,
      "thirtyFiveTo54": 25.7,
      "fiftyFivePlus": 30.5,
      "median": 39
    },
    "gender": {
      "male": 49.3,
      "female": 50.7
    },
    "religion": {
      "christianity": 40.8,
      "noReligion": 48.9,
      "islam": 0.5,
      "hinduism": 0.8,
      "buddhism": 0.6,
      "other": 8.4
    },
    "homeOwnership": {
      "ownedOutright": 34.9,
      "mortgage": 41.4,
      "rented": 23.6,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1487,
      "ranges": {
        "low": 33.4,
        "mid": 49.5,
        "high": 17
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 20.2,
      "diplomaCertificate": 32.8,
      "highSchoolOrBelow": 47.1
    }
  },
  "ashwood": {
    "age": {
      "under20": 23.2,
      "twentyTo34": 21.9,
      "thirtyFiveTo54": 26.7,
      "fiftyFivePlus": 28.3,
      "median": 38
    },
    "gender": {
      "male": 48.4,
      "female": 51.6
    },
    "religion": {
      "christianity": 40.7,
      "noReligion": 43.1,
      "islam": 1.5,
      "hinduism": 3.5,
      "buddhism": 4.4,
      "other": 6.8
    },
    "homeOwnership": {
      "ownedOutright": 35.6,
      "mortgage": 34.2,
      "rented": 30.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 2155,
      "ranges": {
        "low": 25.7,
        "mid": 37.6,
        "high": 36.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 46.7,
      "diplomaCertificate": 18,
      "highSchoolOrBelow": 35.4
    }
  },
  "carrum": {
    "age": {
      "under20": 23.8,
      "twentyTo34": 18.6,
      "thirtyFiveTo54": 28.9,
      "fiftyFivePlus": 28.7,
      "median": 39
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 40.4,
      "noReligion": 47.9,
      "islam": 1.2,
      "hinduism": 1.6,
      "buddhism": 1.6,
      "other": 7.3
    },
    "homeOwnership": {
      "ownedOutright": 29.4,
      "mortgage": 45.3,
      "rented": 25.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1744,
      "ranges": {
        "low": 28.1,
        "mid": 50.6,
        "high": 21.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 19.7,
      "diplomaCertificate": 34.3,
      "highSchoolOrBelow": 46
    }
  },
  "caulfield": {
    "age": {
      "under20": 21.2,
      "twentyTo34": 24.9,
      "thirtyFiveTo54": 26.9,
      "fiftyFivePlus": 27,
      "median": 37
    },
    "gender": {
      "male": 48.4,
      "female": 51.6
    },
    "religion": {
      "christianity": 22.4,
      "noReligion": 35.5,
      "islam": 0.7,
      "hinduism": 3.4,
      "buddhism": 1.5,
      "other": 36.5
    },
    "homeOwnership": {
      "ownedOutright": 30.4,
      "mortgage": 29.8,
      "rented": 39.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2135,
      "ranges": {
        "low": 22.6,
        "mid": 42.6,
        "high": 34.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 49.5,
      "diplomaCertificate": 18.5,
      "highSchoolOrBelow": 32
    }
  },
  "clarinda": {
    "age": {
      "under20": 19.9,
      "twentyTo34": 26.6,
      "thirtyFiveTo54": 25.8,
      "fiftyFivePlus": 27.7,
      "median": 37
    },
    "gender": {
      "male": 50.5,
      "female": 49.5
    },
    "religion": {
      "christianity": 39.2,
      "noReligion": 29.5,
      "islam": 4.3,
      "hinduism": 7.7,
      "buddhism": 9.6,
      "other": 9.8
    },
    "homeOwnership": {
      "ownedOutright": 34.9,
      "mortgage": 30.6,
      "rented": 34.4,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1686,
      "ranges": {
        "low": 31.1,
        "mid": 46.1,
        "high": 22.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 32.2,
      "diplomaCertificate": 20.5,
      "highSchoolOrBelow": 47.3
    }
  },
  "cranbourne": {
    "age": {
      "under20": 31.4,
      "twentyTo34": 23,
      "thirtyFiveTo54": 29.1,
      "fiftyFivePlus": 16.5,
      "median": 32
    },
    "gender": {
      "male": 49.7,
      "female": 50.3
    },
    "religion": {
      "christianity": 35.6,
      "noReligion": 29.2,
      "islam": 9.1,
      "hinduism": 8.3,
      "buddhism": 4.5,
      "other": 13.2
    },
    "homeOwnership": {
      "ownedOutright": 16.8,
      "mortgage": 57.9,
      "rented": 25.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1920,
      "ranges": {
        "low": 20.9,
        "mid": 59.2,
        "high": 20
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 21.6,
      "diplomaCertificate": 31.3,
      "highSchoolOrBelow": 47
    }
  },
  "croydon": {
    "age": {
      "under20": 23.4,
      "twentyTo34": 19.2,
      "thirtyFiveTo54": 26.8,
      "fiftyFivePlus": 30.6,
      "median": 39
    },
    "gender": {
      "male": 47.9,
      "female": 52.1
    },
    "religion": {
      "christianity": 43.7,
      "noReligion": 46,
      "islam": 0.7,
      "hinduism": 1.7,
      "buddhism": 1.8,
      "other": 6.2
    },
    "homeOwnership": {
      "ownedOutright": 34.4,
      "mortgage": 42.3,
      "rented": 23.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1780,
      "ranges": {
        "low": 28.5,
        "mid": 48,
        "high": 23.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 26.9,
      "diplomaCertificate": 30.7,
      "highSchoolOrBelow": 42.4
    }
  },
  "dandenong": {
    "age": {
      "under20": 23.7,
      "twentyTo34": 24.8,
      "thirtyFiveTo54": 26.1,
      "fiftyFivePlus": 25.3,
      "median": 35
    },
    "gender": {
      "male": 51.7,
      "female": 48.3
    },
    "religion": {
      "christianity": 34.7,
      "noReligion": 17.6,
      "islam": 23.4,
      "hinduism": 6.1,
      "buddhism": 6.3,
      "other": 11.9
    },
    "homeOwnership": {
      "ownedOutright": 28.4,
      "mortgage": 32.2,
      "rented": 39.5,
      "other": 0
    },
    "income": {
      "medianWeekly": 1358,
      "ranges": {
        "low": 36.8,
        "mid": 50,
        "high": 13.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 18.8,
      "diplomaCertificate": 23.8,
      "highSchoolOrBelow": 57.4
    }
  },
  "euroa": {
    "age": {
      "under20": 21.1,
      "twentyTo34": 15.1,
      "thirtyFiveTo54": 23.3,
      "fiftyFivePlus": 40.5,
      "median": 47
    },
    "gender": {
      "male": 50.3,
      "female": 49.7
    },
    "religion": {
      "christianity": 45,
      "noReligion": 42.6,
      "islam": 0.4,
      "hinduism": 0.3,
      "buddhism": 0.7,
      "other": 10.9
    },
    "homeOwnership": {
      "ownedOutright": 45.3,
      "mortgage": 36.3,
      "rented": 18.3,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1302,
      "ranges": {
        "low": 39.3,
        "mid": 46.6,
        "high": 14
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 13.2,
      "diplomaCertificate": 32.6,
      "highSchoolOrBelow": 54.2
    }
  },
  "eltham": {
    "age": {
      "under20": 25.2,
      "twentyTo34": 14.1,
      "thirtyFiveTo54": 28,
      "fiftyFivePlus": 32.7,
      "median": 43
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 44.1,
      "noReligion": 48.3,
      "islam": 0.8,
      "hinduism": 0.7,
      "buddhism": 1.1,
      "other": 4.9
    },
    "homeOwnership": {
      "ownedOutright": 42.8,
      "mortgage": 44.8,
      "rented": 12.4,
      "other": 0
    },
    "income": {
      "medianWeekly": 2302,
      "ranges": {
        "low": 20.3,
        "mid": 42.8,
        "high": 36.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 35,
      "diplomaCertificate": 28.3,
      "highSchoolOrBelow": 36.7
    }
  },
  "niddrie": {
    "age": {
      "under20": 22.6,
      "twentyTo34": 16.8,
      "thirtyFiveTo54": 27.2,
      "fiftyFivePlus": 33.3,
      "median": 42
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 64,
      "noReligion": 24.5,
      "islam": 2.4,
      "hinduism": 1.5,
      "buddhism": 2.5,
      "other": 5.1
    },
    "homeOwnership": {
      "ownedOutright": 45.2,
      "mortgage": 33.9,
      "rented": 20.9,
      "other": 0
    },
    "income": {
      "medianWeekly": 1923,
      "ranges": {
        "low": 28.3,
        "mid": 42.2,
        "high": 29.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 27.6,
      "diplomaCertificate": 25.6,
      "highSchoolOrBelow": 46.8
    }
  },
  "evelyn": {
    "age": {
      "under20": 25.2,
      "twentyTo34": 19.4,
      "thirtyFiveTo54": 26.5,
      "fiftyFivePlus": 28.9,
      "median": 38
    },
    "gender": {
      "male": 49.2,
      "female": 50.8
    },
    "religion": {
      "christianity": 42.5,
      "noReligion": 49.7,
      "islam": 0.4,
      "hinduism": 0.7,
      "buddhism": 1,
      "other": 5.8
    },
    "homeOwnership": {
      "ownedOutright": 34.8,
      "mortgage": 49.7,
      "rented": 15.5,
      "other": 0
    },
    "income": {
      "medianWeekly": 1964,
      "ranges": {
        "low": 24.8,
        "mid": 50.6,
        "high": 24.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 19.5,
      "diplomaCertificate": 36.5,
      "highSchoolOrBelow": 44
    }
  },
  "ferntree_gully": {
    "age": {
      "under20": 22.7,
      "twentyTo34": 18,
      "thirtyFiveTo54": 27,
      "fiftyFivePlus": 32.3,
      "median": 41
    },
    "gender": {
      "male": 48.6,
      "female": 51.4
    },
    "religion": {
      "christianity": 42.2,
      "noReligion": 41.2,
      "islam": 1.3,
      "hinduism": 4.1,
      "buddhism": 4.7,
      "other": 6.6
    },
    "homeOwnership": {
      "ownedOutright": 37.5,
      "mortgage": 40.5,
      "rented": 22,
      "other": 0
    },
    "income": {
      "medianWeekly": 1809,
      "ranges": {
        "low": 27.6,
        "mid": 48.3,
        "high": 24.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 30.1,
      "diplomaCertificate": 28,
      "highSchoolOrBelow": 41.8
    }
  },
  "footscray": {
    "age": {
      "under20": 19.1,
      "twentyTo34": 29.8,
      "thirtyFiveTo54": 28.5,
      "fiftyFivePlus": 22.5,
      "median": 35
    },
    "gender": {
      "male": 50.6,
      "female": 49.3
    },
    "religion": {
      "christianity": 35.2,
      "noReligion": 36.1,
      "islam": 6,
      "hinduism": 3.9,
      "buddhism": 10.3,
      "other": 8.6
    },
    "homeOwnership": {
      "ownedOutright": 24.9,
      "mortgage": 32.4,
      "rented": 42.8,
      "other": 0
    },
    "income": {
      "medianWeekly": 1738,
      "ranges": {
        "low": 28.6,
        "mid": 48.2,
        "high": 23.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 34.1,
      "diplomaCertificate": 20,
      "highSchoolOrBelow": 45.9
    }
  },
  "glen_waverley": {
    "age": {
      "under20": 23.4,
      "twentyTo34": 18.8,
      "thirtyFiveTo54": 27.2,
      "fiftyFivePlus": 30.6,
      "median": 40
    },
    "gender": {
      "male": 49.2,
      "female": 50.8
    },
    "religion": {
      "christianity": 33.8,
      "noReligion": 38.8,
      "islam": 2.4,
      "hinduism": 8.8,
      "buddhism": 9.2,
      "other": 6.9
    },
    "homeOwnership": {
      "ownedOutright": 42.5,
      "mortgage": 30.6,
      "rented": 26.9,
      "other": 0
    },
    "income": {
      "medianWeekly": 2000,
      "ranges": {
        "low": 26.4,
        "mid": 42.3,
        "high": 31.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 44.7,
      "diplomaCertificate": 18.1,
      "highSchoolOrBelow": 37.1
    }
  },
  "frankston": {
    "age": {
      "under20": 22.9,
      "twentyTo34": 19.3,
      "thirtyFiveTo54": 26.6,
      "fiftyFivePlus": 31.2,
      "median": 40
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 37.1,
      "noReligion": 50.9,
      "islam": 0.7,
      "hinduism": 0.6,
      "buddhism": 1.1,
      "other": 9.6
    },
    "homeOwnership": {
      "ownedOutright": 29.7,
      "mortgage": 36.1,
      "rented": 34.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 1466,
      "ranges": {
        "low": 34.9,
        "mid": 47.2,
        "high": 18
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 20.2,
      "diplomaCertificate": 32.5,
      "highSchoolOrBelow": 47.4
    }
  },
  "geelong": {
    "age": {
      "under20": 21.4,
      "twentyTo34": 22.8,
      "thirtyFiveTo54": 25.4,
      "fiftyFivePlus": 30.4,
      "median": 39
    },
    "gender": {
      "male": 48.2,
      "female": 51.8
    },
    "religion": {
      "christianity": 42.7,
      "noReligion": 46.2,
      "islam": 1.2,
      "hinduism": 1.6,
      "buddhism": 1.1,
      "other": 7.3
    },
    "homeOwnership": {
      "ownedOutright": 32.5,
      "mortgage": 31.5,
      "rented": 36,
      "other": 0
    },
    "income": {
      "medianWeekly": 1526,
      "ranges": {
        "low": 33.6,
        "mid": 45.3,
        "high": 21.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 29.6,
      "diplomaCertificate": 28.9,
      "highSchoolOrBelow": 41.5
    }
  },
  "pakenham": {
    "age": {
      "under20": 27.5,
      "twentyTo34": 20.6,
      "thirtyFiveTo54": 27.3,
      "fiftyFivePlus": 24.6,
      "median": 36
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 39.8,
      "noReligion": 44,
      "islam": 2.5,
      "hinduism": 2.7,
      "buddhism": 2.6,
      "other": 8.4
    },
    "homeOwnership": {
      "ownedOutright": 27.9,
      "mortgage": 51.1,
      "rented": 21,
      "other": 0
    },
    "income": {
      "medianWeekly": 1986,
      "ranges": {
        "low": 22.1,
        "mid": 52.8,
        "high": 25.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22.3,
      "diplomaCertificate": 34.2,
      "highSchoolOrBelow": 43.5
    }
  },
  "berwick": {
    "age": {
      "under20": 27.5,
      "twentyTo34": 20.6,
      "thirtyFiveTo54": 27.3,
      "fiftyFivePlus": 24.6,
      "median": 36
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 39.8,
      "noReligion": 44,
      "islam": 2.5,
      "hinduism": 2.7,
      "buddhism": 2.6,
      "other": 8.4
    },
    "homeOwnership": {
      "ownedOutright": 27.9,
      "mortgage": 51.1,
      "rented": 21,
      "other": 0
    },
    "income": {
      "medianWeekly": 1986,
      "ranges": {
        "low": 22.1,
        "mid": 52.8,
        "high": 25.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22.3,
      "diplomaCertificate": 34.2,
      "highSchoolOrBelow": 43.5
    }
  },
  "gippsland_east": {
    "age": {
      "under20": 20.8,
      "twentyTo34": 13.4,
      "thirtyFiveTo54": 21.1,
      "fiftyFivePlus": 44.6,
      "median": 50
    },
    "gender": {
      "male": 49.3,
      "female": 50.7
    },
    "religion": {
      "christianity": 40.8,
      "noReligion": 47.9,
      "islam": 0.2,
      "hinduism": 0.2,
      "buddhism": 0.7,
      "other": 10.1
    },
    "homeOwnership": {
      "ownedOutright": 50.2,
      "mortgage": 31.1,
      "rented": 18.6,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1155,
      "ranges": {
        "low": 44.3,
        "mid": 45.3,
        "high": 10.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 13.5,
      "diplomaCertificate": 33.5,
      "highSchoolOrBelow": 53
    }
  },
  "gippsland_south": {
    "age": {
      "under20": 21.9,
      "twentyTo34": 14.3,
      "thirtyFiveTo54": 23.6,
      "fiftyFivePlus": 40.2,
      "median": 47
    },
    "gender": {
      "male": 50.1,
      "female": 49.9
    },
    "religion": {
      "christianity": 40.1,
      "noReligion": 48.1,
      "islam": 0.2,
      "hinduism": 0.4,
      "buddhism": 0.6,
      "other": 10.5
    },
    "homeOwnership": {
      "ownedOutright": 47.6,
      "mortgage": 33.8,
      "rented": 18.5,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1248,
      "ranges": {
        "low": 41.2,
        "mid": 44.8,
        "high": 14
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 15.4,
      "diplomaCertificate": 32.5,
      "highSchoolOrBelow": 52.1
    }
  },
  "hastings": {
    "age": {
      "under20": 24.8,
      "twentyTo34": 18.6,
      "thirtyFiveTo54": 25.6,
      "fiftyFivePlus": 31,
      "median": 40
    },
    "gender": {
      "male": 49.4,
      "female": 50.6
    },
    "religion": {
      "christianity": 38.5,
      "noReligion": 53.5,
      "islam": 0.3,
      "hinduism": 0.1,
      "buddhism": 0.7,
      "other": 6.8
    },
    "homeOwnership": {
      "ownedOutright": 34.5,
      "mortgage": 48.2,
      "rented": 17.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1713,
      "ranges": {
        "low": 29.2,
        "mid": 50.3,
        "high": 20.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 14.2,
      "diplomaCertificate": 38.1,
      "highSchoolOrBelow": 47.6
    }
  },
  "hawthorn": {
    "age": {
      "under20": 21,
      "twentyTo34": 24.8,
      "thirtyFiveTo54": 26.1,
      "fiftyFivePlus": 28.1,
      "median": 38
    },
    "gender": {
      "male": 47.8,
      "female": 52.2
    },
    "religion": {
      "christianity": 39.1,
      "noReligion": 47.2,
      "islam": 1.2,
      "hinduism": 2.8,
      "buddhism": 2.6,
      "other": 7.1
    },
    "homeOwnership": {
      "ownedOutright": 34.8,
      "mortgage": 28.4,
      "rented": 36.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2313,
      "ranges": {
        "low": 19.6,
        "mid": 40.6,
        "high": 39.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 55.6,
      "diplomaCertificate": 15.4,
      "highSchoolOrBelow": 29
    }
  },
  "ivanhoe": {
    "age": {
      "under20": 22.6,
      "twentyTo34": 19.9,
      "thirtyFiveTo54": 27.6,
      "fiftyFivePlus": 29.9,
      "median": 40
    },
    "gender": {
      "male": 48.4,
      "female": 51.6
    },
    "religion": {
      "christianity": 43,
      "noReligion": 42.9,
      "islam": 3.4,
      "hinduism": 2.3,
      "buddhism": 2.1,
      "other": 6.3
    },
    "homeOwnership": {
      "ownedOutright": 35.6,
      "mortgage": 33,
      "rented": 31.4,
      "other": 0
    },
    "income": {
      "medianWeekly": 2055,
      "ranges": {
        "low": 25.1,
        "mid": 42.3,
        "high": 32.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 42.8,
      "diplomaCertificate": 21.2,
      "highSchoolOrBelow": 36
    }
  },
  "kew": {
    "age": {
      "under20": 24.2,
      "twentyTo34": 17.6,
      "thirtyFiveTo54": 26,
      "fiftyFivePlus": 32.2,
      "median": 42
    },
    "gender": {
      "male": 48.2,
      "female": 51.8
    },
    "religion": {
      "christianity": 43,
      "noReligion": 42.8,
      "islam": 1.2,
      "hinduism": 2.6,
      "buddhism": 4.2,
      "other": 6.2
    },
    "homeOwnership": {
      "ownedOutright": 44.2,
      "mortgage": 31.1,
      "rented": 24.6,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2412,
      "ranges": {
        "low": 20.7,
        "mid": 37.4,
        "high": 41.9
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 49.8,
      "diplomaCertificate": 15.8,
      "highSchoolOrBelow": 34.4
    }
  },
  "keysborough": {
    "age": {
      "under20": 24,
      "twentyTo34": 21.8,
      "thirtyFiveTo54": 27.2,
      "fiftyFivePlus": 27.1,
      "median": 37
    },
    "gender": {
      "male": 49.8,
      "female": 50.2
    },
    "religion": {
      "christianity": 35.9,
      "noReligion": 25.5,
      "islam": 6.8,
      "hinduism": 3.8,
      "buddhism": 19.9,
      "other": 8.1
    },
    "homeOwnership": {
      "ownedOutright": 35.9,
      "mortgage": 40.5,
      "rented": 23.6,
      "other": 0
    },
    "income": {
      "medianWeekly": 1737,
      "ranges": {
        "low": 28.7,
        "mid": 49.2,
        "high": 22.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22.8,
      "diplomaCertificate": 21.9,
      "highSchoolOrBelow": 55.3
    }
  },
  "kororoit": {
    "age": {
      "under20": 28.6,
      "twentyTo34": 22.3,
      "thirtyFiveTo54": 29.9,
      "fiftyFivePlus": 19.2,
      "median": 34
    },
    "gender": {
      "male": 50.6,
      "female": 49.4
    },
    "religion": {
      "christianity": 46.1,
      "noReligion": 18.6,
      "islam": 8.1,
      "hinduism": 5.4,
      "buddhism": 8.9,
      "other": 12.9
    },
    "homeOwnership": {
      "ownedOutright": 26.7,
      "mortgage": 51.3,
      "rented": 22,
      "other": 0
    },
    "income": {
      "medianWeekly": 1864,
      "ranges": {
        "low": 25,
        "mid": 52.4,
        "high": 22.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 23.3,
      "diplomaCertificate": 23.6,
      "highSchoolOrBelow": 53.1
    }
  },
  "lara": {
    "age": {
      "under20": 23.7,
      "twentyTo34": 21.7,
      "thirtyFiveTo54": 25.3,
      "fiftyFivePlus": 29.3,
      "median": 38
    },
    "gender": {
      "male": 49.7,
      "female": 50.3
    },
    "religion": {
      "christianity": 44.4,
      "noReligion": 39.2,
      "islam": 3.2,
      "hinduism": 1.3,
      "buddhism": 1.3,
      "other": 10.6
    },
    "homeOwnership": {
      "ownedOutright": 33.5,
      "mortgage": 33.8,
      "rented": 32.6,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1408,
      "ranges": {
        "low": 36.3,
        "mid": 47.6,
        "high": 16.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 15.3,
      "diplomaCertificate": 30,
      "highSchoolOrBelow": 54.8
    }
  },
  "lowan": {
    "age": {
      "under20": 22.4,
      "twentyTo34": 15.3,
      "thirtyFiveTo54": 22.2,
      "fiftyFivePlus": 40.1,
      "median": 46
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 49.3,
      "noReligion": 40.6,
      "islam": 0.3,
      "hinduism": 0.5,
      "buddhism": 0.5,
      "other": 8.8
    },
    "homeOwnership": {
      "ownedOutright": 50.3,
      "mortgage": 30.2,
      "rented": 19.5,
      "other": 0
    },
    "income": {
      "medianWeekly": 1268,
      "ranges": {
        "low": 40.2,
        "mid": 47,
        "high": 12.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 14,
      "diplomaCertificate": 31.5,
      "highSchoolOrBelow": 54.4
    }
  },
  "macedon": {
    "age": {
      "under20": 24.5,
      "twentyTo34": 12.4,
      "thirtyFiveTo54": 27.9,
      "fiftyFivePlus": 35.3,
      "median": 45
    },
    "gender": {
      "male": 49.3,
      "female": 50.7
    },
    "religion": {
      "christianity": 40.3,
      "noReligion": 50.2,
      "islam": 0.3,
      "hinduism": 0.3,
      "buddhism": 0.7,
      "other": 8.2
    },
    "homeOwnership": {
      "ownedOutright": 42.2,
      "mortgage": 44.5,
      "rented": 13.2,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1883,
      "ranges": {
        "low": 26.8,
        "mid": 45,
        "high": 28.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 26.9,
      "diplomaCertificate": 31,
      "highSchoolOrBelow": 42.1
    }
  },
  "malvern": {
    "age": {
      "under20": 20.1,
      "twentyTo34": 22.5,
      "thirtyFiveTo54": 26,
      "fiftyFivePlus": 31.3,
      "median": 40
    },
    "gender": {
      "male": 47.3,
      "female": 52.6
    },
    "religion": {
      "christianity": 42.7,
      "noReligion": 39.6,
      "islam": 0.9,
      "hinduism": 2.9,
      "buddhism": 2.1,
      "other": 11.8
    },
    "homeOwnership": {
      "ownedOutright": 37.3,
      "mortgage": 29.1,
      "rented": 33.6,
      "other": 0
    },
    "income": {
      "medianWeekly": 2386,
      "ranges": {
        "low": 20.2,
        "mid": 38,
        "high": 41.9
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 51.9,
      "diplomaCertificate": 16.2,
      "highSchoolOrBelow": 32
    }
  },
  "melbourne": {
    "age": {
      "under20": 11.6,
      "twentyTo34": 52.7,
      "thirtyFiveTo54": 22.5,
      "fiftyFivePlus": 13.1,
      "median": 30
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 22.4,
      "noReligion": 50.8,
      "islam": 3.9,
      "hinduism": 5.7,
      "buddhism": 6.4,
      "other": 10.8
    },
    "homeOwnership": {
      "ownedOutright": 14.5,
      "mortgage": 16.4,
      "rented": 69.1,
      "other": 0
    },
    "income": {
      "medianWeekly": 1609,
      "ranges": {
        "low": 31.1,
        "mid": 46.8,
        "high": 22
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 53.7,
      "diplomaCertificate": 14.2,
      "highSchoolOrBelow": 32.2
    }
  },
  "melton": {
    "age": {
      "under20": 30.1,
      "twentyTo34": 21.6,
      "thirtyFiveTo54": 26.8,
      "fiftyFivePlus": 21.5,
      "median": 34
    },
    "gender": {
      "male": 49.1,
      "female": 50.9
    },
    "religion": {
      "christianity": 43.9,
      "noReligion": 34.5,
      "islam": 4.4,
      "hinduism": 3.1,
      "buddhism": 1.3,
      "other": 12.9
    },
    "homeOwnership": {
      "ownedOutright": 24.8,
      "mortgage": 48.1,
      "rented": 27.1,
      "other": 0
    },
    "income": {
      "medianWeekly": 1581,
      "ranges": {
        "low": 30,
        "mid": 53.7,
        "high": 16.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 16,
      "diplomaCertificate": 32.1,
      "highSchoolOrBelow": 51.9
    }
  },
  "mildura": {
    "age": {
      "under20": 23.8,
      "twentyTo34": 18.7,
      "thirtyFiveTo54": 24.1,
      "fiftyFivePlus": 33.3,
      "median": 41
    },
    "gender": {
      "male": 49.7,
      "female": 50.3
    },
    "religion": {
      "christianity": 43.6,
      "noReligion": 40.6,
      "islam": 2.1,
      "hinduism": 0.7,
      "buddhism": 2.5,
      "other": 10.6
    },
    "homeOwnership": {
      "ownedOutright": 38.8,
      "mortgage": 32.9,
      "rented": 28.2,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1324,
      "ranges": {
        "low": 38.3,
        "mid": 48.5,
        "high": 13.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 12.2,
      "diplomaCertificate": 28.5,
      "highSchoolOrBelow": 59.2
    }
  },
  "mill_park": {
    "age": {
      "under20": 25.5,
      "twentyTo34": 21.3,
      "thirtyFiveTo54": 28.1,
      "fiftyFivePlus": 25.1,
      "median": 37
    },
    "gender": {
      "male": 49.4,
      "female": 50.6
    },
    "religion": {
      "christianity": 52.6,
      "noReligion": 22.8,
      "islam": 7.9,
      "hinduism": 5.2,
      "buddhism": 2.5,
      "other": 9.1
    },
    "homeOwnership": {
      "ownedOutright": 30.7,
      "mortgage": 46.2,
      "rented": 23,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1849,
      "ranges": {
        "low": 24.4,
        "mid": 53.5,
        "high": 22.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22.5,
      "diplomaCertificate": 28.2,
      "highSchoolOrBelow": 49.3
    }
  },
  "monbulk": {
    "age": {
      "under20": 25.1,
      "twentyTo34": 16,
      "thirtyFiveTo54": 28.3,
      "fiftyFivePlus": 30.7,
      "median": 41
    },
    "gender": {
      "male": 49.8,
      "female": 50.2
    },
    "religion": {
      "christianity": 35.4,
      "noReligion": 56.7,
      "islam": 0.2,
      "hinduism": 0.3,
      "buddhism": 1,
      "other": 6.4
    },
    "homeOwnership": {
      "ownedOutright": 37.2,
      "mortgage": 52.4,
      "rented": 10.4,
      "other": 0
    },
    "income": {
      "medianWeekly": 2111,
      "ranges": {
        "low": 23,
        "mid": 46.9,
        "high": 30.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 26.6,
      "diplomaCertificate": 34.5,
      "highSchoolOrBelow": 38.9
    }
  },
  "mordialloc": {
    "age": {
      "under20": 24.6,
      "twentyTo34": 15.8,
      "thirtyFiveTo54": 30,
      "fiftyFivePlus": 29.7,
      "median": 41
    },
    "gender": {
      "male": 48,
      "female": 52
    },
    "religion": {
      "christianity": 45.5,
      "noReligion": 44.7,
      "islam": 0.9,
      "hinduism": 1.4,
      "buddhism": 1.4,
      "other": 6.1
    },
    "homeOwnership": {
      "ownedOutright": 35.3,
      "mortgage": 41.7,
      "rented": 23,
      "other": 0
    },
    "income": {
      "medianWeekly": 2048,
      "ranges": {
        "low": 25.4,
        "mid": 43.1,
        "high": 31.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 31.5,
      "diplomaCertificate": 28.7,
      "highSchoolOrBelow": 39.9
    }
  },
  "mornington": {
    "age": {
      "under20": 24.4,
      "twentyTo34": 10.8,
      "thirtyFiveTo54": 25.8,
      "fiftyFivePlus": 39,
      "median": 47
    },
    "gender": {
      "male": 47.6,
      "female": 52.4
    },
    "religion": {
      "christianity": 44.8,
      "noReligion": 47.8,
      "islam": 0.1,
      "hinduism": 0.3,
      "buddhism": 0.6,
      "other": 6.4
    },
    "homeOwnership": {
      "ownedOutright": 44.7,
      "mortgage": 40,
      "rented": 15.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1900,
      "ranges": {
        "low": 28.2,
        "mid": 41.8,
        "high": 30
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 26.6,
      "diplomaCertificate": 31,
      "highSchoolOrBelow": 42.5
    }
  },
  "morwell": {
    "age": {
      "under20": 23.7,
      "twentyTo34": 18.4,
      "thirtyFiveTo54": 23.7,
      "fiftyFivePlus": 34.2,
      "median": 41
    },
    "gender": {
      "male": 48.8,
      "female": 51.2
    },
    "religion": {
      "christianity": 40.2,
      "noReligion": 48.1,
      "islam": 0.8,
      "hinduism": 0.5,
      "buddhism": 0.7,
      "other": 9.7
    },
    "homeOwnership": {
      "ownedOutright": 39.1,
      "mortgage": 36.5,
      "rented": 24.3,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1329,
      "ranges": {
        "low": 39.2,
        "mid": 45.3,
        "high": 15.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 13.2,
      "diplomaCertificate": 33.9,
      "highSchoolOrBelow": 52.9
    }
  },
  "mulgrave": {
    "age": {
      "under20": 21.3,
      "twentyTo34": 20,
      "thirtyFiveTo54": 26,
      "fiftyFivePlus": 32.8,
      "median": 41
    },
    "gender": {
      "male": 49.9,
      "female": 50.1
    },
    "religion": {
      "christianity": 44.6,
      "noReligion": 27.1,
      "islam": 5.8,
      "hinduism": 4.9,
      "buddhism": 8.9,
      "other": 8.8
    },
    "homeOwnership": {
      "ownedOutright": 40.6,
      "mortgage": 33.8,
      "rented": 25.6,
      "other": 0
    },
    "income": {
      "medianWeekly": 1647,
      "ranges": {
        "low": 31.5,
        "mid": 46.1,
        "high": 22.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 30.4,
      "diplomaCertificate": 22.4,
      "highSchoolOrBelow": 47.2
    }
  },
  "murray_plains": {
    "age": {
      "under20": 23,
      "twentyTo34": 15.6,
      "thirtyFiveTo54": 22.5,
      "fiftyFivePlus": 38.8,
      "median": 45
    },
    "gender": {
      "male": 49.3,
      "female": 50.7
    },
    "religion": {
      "christianity": 47.9,
      "noReligion": 40.8,
      "islam": 0.8,
      "hinduism": 0.4,
      "buddhism": 0.7,
      "other": 9.3
    },
    "homeOwnership": {
      "ownedOutright": 45.2,
      "mortgage": 32.2,
      "rented": 22.5,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1270,
      "ranges": {
        "low": 40.6,
        "mid": 47.3,
        "high": 12.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 11.6,
      "diplomaCertificate": 30.8,
      "highSchoolOrBelow": 57.6
    }
  },
  "swan_hill": {
    "age": {
      "under20": 23,
      "twentyTo34": 15.6,
      "thirtyFiveTo54": 22.5,
      "fiftyFivePlus": 38.8,
      "median": 45
    },
    "gender": {
      "male": 49.3,
      "female": 50.7
    },
    "religion": {
      "christianity": 47.9,
      "noReligion": 40.8,
      "islam": 0.8,
      "hinduism": 0.4,
      "buddhism": 0.7,
      "other": 9.3
    },
    "homeOwnership": {
      "ownedOutright": 45.2,
      "mortgage": 32.2,
      "rented": 22.5,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1270,
      "ranges": {
        "low": 40.6,
        "mid": 47.3,
        "high": 12.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 11.6,
      "diplomaCertificate": 30.8,
      "highSchoolOrBelow": 57.6
    }
  },
  "narracan": {
    "age": {
      "under20": 24.4,
      "twentyTo34": 17.2,
      "thirtyFiveTo54": 23.5,
      "fiftyFivePlus": 34.9,
      "median": 42
    },
    "gender": {
      "male": 48.9,
      "female": 51.1
    },
    "religion": {
      "christianity": 42.2,
      "noReligion": 47.7,
      "islam": 0.3,
      "hinduism": 0.3,
      "buddhism": 0.7,
      "other": 8.7
    },
    "homeOwnership": {
      "ownedOutright": 40.2,
      "mortgage": 39.6,
      "rented": 20.1,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1431,
      "ranges": {
        "low": 36,
        "mid": 47.5,
        "high": 16.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 15.3,
      "diplomaCertificate": 34.9,
      "highSchoolOrBelow": 49.8
    }
  },
  "narre_warren_n": {
    "age": {
      "under20": 24.9,
      "twentyTo34": 21.3,
      "thirtyFiveTo54": 25.9,
      "fiftyFivePlus": 27.8,
      "median": 37
    },
    "gender": {
      "male": 49.7,
      "female": 50.3
    },
    "religion": {
      "christianity": 43.5,
      "noReligion": 27.5,
      "islam": 12.4,
      "hinduism": 3.3,
      "buddhism": 4.6,
      "other": 8.7
    },
    "homeOwnership": {
      "ownedOutright": 31.9,
      "mortgage": 45.7,
      "rented": 22.4,
      "other": 0
    },
    "income": {
      "medianWeekly": 1780,
      "ranges": {
        "low": 26.2,
        "mid": 53,
        "high": 20.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 20.7,
      "diplomaCertificate": 29.3,
      "highSchoolOrBelow": 50
    }
  },
  "narre_warren_s": {
    "age": {
      "under20": 30.3,
      "twentyTo34": 20.5,
      "thirtyFiveTo54": 29.5,
      "fiftyFivePlus": 19.6,
      "median": 34
    },
    "gender": {
      "male": 50.2,
      "female": 49.8
    },
    "religion": {
      "christianity": 39.7,
      "noReligion": 27.4,
      "islam": 13.1,
      "hinduism": 5.4,
      "buddhism": 6.1,
      "other": 8.3
    },
    "homeOwnership": {
      "ownedOutright": 22.8,
      "mortgage": 54,
      "rented": 23.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 2010,
      "ranges": {
        "low": 20.2,
        "mid": 54.9,
        "high": 24.9
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 21.5,
      "diplomaCertificate": 28.9,
      "highSchoolOrBelow": 49.6
    }
  },
  "nepean": {
    "age": {
      "under20": 18.5,
      "twentyTo34": 12,
      "thirtyFiveTo54": 22.2,
      "fiftyFivePlus": 47.3,
      "median": 52
    },
    "gender": {
      "male": 48.6,
      "female": 51.4
    },
    "religion": {
      "christianity": 41.8,
      "noReligion": 47.2,
      "islam": 0.2,
      "hinduism": 0.2,
      "buddhism": 0.7,
      "other": 9.8
    },
    "homeOwnership": {
      "ownedOutright": 48.8,
      "mortgage": 29.9,
      "rented": 21.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 1376,
      "ranges": {
        "low": 36.9,
        "mid": 45,
        "high": 18.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 20.9,
      "diplomaCertificate": 31.3,
      "highSchoolOrBelow": 47.8
    }
  },
  "northcote": {
    "age": {
      "under20": 19.6,
      "twentyTo34": 25.2,
      "thirtyFiveTo54": 31.6,
      "fiftyFivePlus": 23.7,
      "median": 37
    },
    "gender": {
      "male": 47.6,
      "female": 52.4
    },
    "religion": {
      "christianity": 32.2,
      "noReligion": 57.3,
      "islam": 1.5,
      "hinduism": 1,
      "buddhism": 1.8,
      "other": 6.3
    },
    "homeOwnership": {
      "ownedOutright": 29.1,
      "mortgage": 31.2,
      "rented": 39.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 2120,
      "ranges": {
        "low": 23.6,
        "mid": 41.9,
        "high": 34.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 50.2,
      "diplomaCertificate": 17.4,
      "highSchoolOrBelow": 32.4
    }
  },
  "oakleigh": {
    "age": {
      "under20": 19.3,
      "twentyTo34": 30.6,
      "thirtyFiveTo54": 26.3,
      "fiftyFivePlus": 23.8,
      "median": 35
    },
    "gender": {
      "male": 49.7,
      "female": 50.3
    },
    "religion": {
      "christianity": 38.9,
      "noReligion": 37.9,
      "islam": 2.1,
      "hinduism": 7.1,
      "buddhism": 4.4,
      "other": 9.7
    },
    "homeOwnership": {
      "ownedOutright": 29.2,
      "mortgage": 30.7,
      "rented": 40.1,
      "other": 0
    },
    "income": {
      "medianWeekly": 1873,
      "ranges": {
        "low": 27.1,
        "mid": 45,
        "high": 27.9
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 44,
      "diplomaCertificate": 19.3,
      "highSchoolOrBelow": 36.7
    }
  },
  "ovens_valley": {
    "age": {
      "under20": 22.2,
      "twentyTo34": 14.1,
      "thirtyFiveTo54": 23.3,
      "fiftyFivePlus": 40.3,
      "median": 47
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 48.8,
      "noReligion": 40.7,
      "islam": 0.5,
      "hinduism": 0.5,
      "buddhism": 0.9,
      "other": 8.6
    },
    "homeOwnership": {
      "ownedOutright": 45.6,
      "mortgage": 32.3,
      "rented": 22,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1286,
      "ranges": {
        "low": 40.2,
        "mid": 46.5,
        "high": 13.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 15.4,
      "diplomaCertificate": 32.4,
      "highSchoolOrBelow": 52.2
    }
  },
  "pascoe_vale": {
    "age": {
      "under20": 21.4,
      "twentyTo34": 25.8,
      "thirtyFiveTo54": 29.1,
      "fiftyFivePlus": 23.6,
      "median": 36
    },
    "gender": {
      "male": 48.9,
      "female": 51.1
    },
    "religion": {
      "christianity": 41.2,
      "noReligion": 34.5,
      "islam": 9.7,
      "hinduism": 5.2,
      "buddhism": 2.4,
      "other": 7.1
    },
    "homeOwnership": {
      "ownedOutright": 31,
      "mortgage": 35.3,
      "rented": 33.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 1947,
      "ranges": {
        "low": 25.9,
        "mid": 46.4,
        "high": 27.7
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 35.6,
      "diplomaCertificate": 22.6,
      "highSchoolOrBelow": 41.8
    }
  },
  "polwarth": {
    "age": {
      "under20": 23.5,
      "twentyTo34": 15,
      "thirtyFiveTo54": 24.1,
      "fiftyFivePlus": 37.3,
      "median": 45
    },
    "gender": {
      "male": 50.2,
      "female": 49.8
    },
    "religion": {
      "christianity": 43.9,
      "noReligion": 46.3,
      "islam": 0.3,
      "hinduism": 0.2,
      "buddhism": 0.5,
      "other": 8.8
    },
    "homeOwnership": {
      "ownedOutright": 46.2,
      "mortgage": 37,
      "rented": 16.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1440,
      "ranges": {
        "low": 35.1,
        "mid": 47.9,
        "high": 17.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 17.5,
      "diplomaCertificate": 32.3,
      "highSchoolOrBelow": 50.3
    }
  },
  "prahran": {
    "age": {
      "under20": 10.5,
      "twentyTo34": 39.1,
      "thirtyFiveTo54": 28,
      "fiftyFivePlus": 22.4,
      "median": 35
    },
    "gender": {
      "male": 48.4,
      "female": 51.6
    },
    "religion": {
      "christianity": 30.2,
      "noReligion": 50.6,
      "islam": 1.5,
      "hinduism": 2.3,
      "buddhism": 2.4,
      "other": 13.1
    },
    "homeOwnership": {
      "ownedOutright": 19.7,
      "mortgage": 22,
      "rented": 58.2,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2042,
      "ranges": {
        "low": 21.4,
        "mid": 47.8,
        "high": 30.8
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 53.5,
      "diplomaCertificate": 17.3,
      "highSchoolOrBelow": 29.2
    }
  },
  "preston": {
    "age": {
      "under20": 19.4,
      "twentyTo34": 25.7,
      "thirtyFiveTo54": 29.3,
      "fiftyFivePlus": 25.5,
      "median": 37
    },
    "gender": {
      "male": 49.2,
      "female": 50.8
    },
    "religion": {
      "christianity": 41.3,
      "noReligion": 37.9,
      "islam": 6,
      "hinduism": 3.7,
      "buddhism": 3.2,
      "other": 8
    },
    "homeOwnership": {
      "ownedOutright": 29.8,
      "mortgage": 30.2,
      "rented": 39.9,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1623,
      "ranges": {
        "low": 32,
        "mid": 47.1,
        "high": 20.9
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 32.3,
      "diplomaCertificate": 22.8,
      "highSchoolOrBelow": 44.8
    }
  },
  "richmond": {
    "age": {
      "under20": 13,
      "twentyTo34": 38.1,
      "thirtyFiveTo54": 28.6,
      "fiftyFivePlus": 20.4,
      "median": 34
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 25.6,
      "noReligion": 59,
      "islam": 2.6,
      "hinduism": 0.8,
      "buddhism": 3.7,
      "other": 8.3
    },
    "homeOwnership": {
      "ownedOutright": 19.3,
      "mortgage": 24.9,
      "rented": 55.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2267,
      "ranges": {
        "low": 20.9,
        "mid": 41.6,
        "high": 37.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 55.6,
      "diplomaCertificate": 15.8,
      "highSchoolOrBelow": 28.6
    }
  },
  "ringwood": {
    "age": {
      "under20": 23.4,
      "twentyTo34": 20.3,
      "thirtyFiveTo54": 29.5,
      "fiftyFivePlus": 26.8,
      "median": 38
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 41,
      "noReligion": 44.4,
      "islam": 1.5,
      "hinduism": 2.9,
      "buddhism": 3.5,
      "other": 6.7
    },
    "homeOwnership": {
      "ownedOutright": 32.4,
      "mortgage": 36.9,
      "rented": 30.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 1888,
      "ranges": {
        "low": 26.5,
        "mid": 45.8,
        "high": 27.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 37.4,
      "diplomaCertificate": 24.9,
      "highSchoolOrBelow": 37.6
    }
  },
  "ripon": {
    "age": {
      "under20": 21.4,
      "twentyTo34": 14.8,
      "thirtyFiveTo54": 23.2,
      "fiftyFivePlus": 40.5,
      "median": 47
    },
    "gender": {
      "male": 50.5,
      "female": 49.5
    },
    "religion": {
      "christianity": 42.5,
      "noReligion": 44.7,
      "islam": 0.4,
      "hinduism": 0.5,
      "buddhism": 0.6,
      "other": 11.3
    },
    "homeOwnership": {
      "ownedOutright": 48,
      "mortgage": 33.8,
      "rented": 18.1,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1166,
      "ranges": {
        "low": 44,
        "mid": 45,
        "high": 11
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 13,
      "diplomaCertificate": 30.9,
      "highSchoolOrBelow": 56.1
    }
  },
  "rowville": {
    "age": {
      "under20": 23.8,
      "twentyTo34": 18.1,
      "thirtyFiveTo54": 27.9,
      "fiftyFivePlus": 30.1,
      "median": 41
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 47.4,
      "noReligion": 36.9,
      "islam": 2.3,
      "hinduism": 3.4,
      "buddhism": 4.6,
      "other": 5.5
    },
    "homeOwnership": {
      "ownedOutright": 37.3,
      "mortgage": 47,
      "rented": 15.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 2198,
      "ranges": {
        "low": 21.1,
        "mid": 46.6,
        "high": 32.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 27.7,
      "diplomaCertificate": 29.2,
      "highSchoolOrBelow": 43.1
    }
  },
  "sandringham": {
    "age": {
      "under20": 23,
      "twentyTo34": 14.8,
      "thirtyFiveTo54": 28.4,
      "fiftyFivePlus": 33.8,
      "median": 44
    },
    "gender": {
      "male": 47.6,
      "female": 52.4
    },
    "religion": {
      "christianity": 44,
      "noReligion": 46.6,
      "islam": 0.8,
      "hinduism": 1,
      "buddhism": 1.2,
      "other": 6.5
    },
    "homeOwnership": {
      "ownedOutright": 38.8,
      "mortgage": 36,
      "rented": 25.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 2220,
      "ranges": {
        "low": 23.3,
        "mid": 38.7,
        "high": 38
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 41.3,
      "diplomaCertificate": 23.3,
      "highSchoolOrBelow": 35.5
    }
  },
  "shepparton": {
    "age": {
      "under20": 25.2,
      "twentyTo34": 18.3,
      "thirtyFiveTo54": 24,
      "fiftyFivePlus": 32.4,
      "median": 40
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 45.6,
      "noReligion": 35.2,
      "islam": 5.8,
      "hinduism": 1.3,
      "buddhism": 1,
      "other": 11.1
    },
    "homeOwnership": {
      "ownedOutright": 37.5,
      "mortgage": 35.4,
      "rented": 27,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1373,
      "ranges": {
        "low": 36.9,
        "mid": 48.8,
        "high": 14.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 14.4,
      "diplomaCertificate": 29.4,
      "highSchoolOrBelow": 56.3
    }
  },
  "south_barwon": {
    "age": {
      "under20": 26.1,
      "twentyTo34": 21.2,
      "thirtyFiveTo54": 26.3,
      "fiftyFivePlus": 26.4,
      "median": 36
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 41.9,
      "noReligion": 47.9,
      "islam": 1,
      "hinduism": 1.5,
      "buddhism": 1,
      "other": 6.7
    },
    "homeOwnership": {
      "ownedOutright": 32.9,
      "mortgage": 43.5,
      "rented": 23.5,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2051,
      "ranges": {
        "low": 23.1,
        "mid": 48.5,
        "high": 28.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 31.1,
      "diplomaCertificate": 30.9,
      "highSchoolOrBelow": 38
    }
  },
  "sw_coast": {
    "age": {
      "under20": 23.3,
      "twentyTo34": 16,
      "thirtyFiveTo54": 24.4,
      "fiftyFivePlus": 36.3,
      "median": 44
    },
    "gender": {
      "male": 48.8,
      "female": 51.2
    },
    "religion": {
      "christianity": 46.2,
      "noReligion": 44.2,
      "islam": 0.2,
      "hinduism": 0.4,
      "buddhism": 0.7,
      "other": 8.3
    },
    "homeOwnership": {
      "ownedOutright": 42.1,
      "mortgage": 34.2,
      "rented": 23.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 1408,
      "ranges": {
        "low": 36,
        "mid": 48.7,
        "high": 15.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 17.2,
      "diplomaCertificate": 31.9,
      "highSchoolOrBelow": 50.9
    }
  },
  "portland": {
    "age": {
      "under20": 23.3,
      "twentyTo34": 16,
      "thirtyFiveTo54": 24.4,
      "fiftyFivePlus": 36.3,
      "median": 44
    },
    "gender": {
      "male": 48.8,
      "female": 51.2
    },
    "religion": {
      "christianity": 46.2,
      "noReligion": 44.2,
      "islam": 0.2,
      "hinduism": 0.4,
      "buddhism": 0.7,
      "other": 8.3
    },
    "homeOwnership": {
      "ownedOutright": 42.1,
      "mortgage": 34.2,
      "rented": 23.7,
      "other": 0
    },
    "income": {
      "medianWeekly": 1408,
      "ranges": {
        "low": 36,
        "mid": 48.7,
        "high": 15.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 17.2,
      "diplomaCertificate": 31.9,
      "highSchoolOrBelow": 50.9
    }
  },
  "st_albans": {
    "age": {
      "under20": 21.3,
      "twentyTo34": 24.6,
      "thirtyFiveTo54": 25,
      "fiftyFivePlus": 29,
      "median": 37
    },
    "gender": {
      "male": 50.3,
      "female": 49.7
    },
    "religion": {
      "christianity": 43.1,
      "noReligion": 22.2,
      "islam": 5.8,
      "hinduism": 3.6,
      "buddhism": 13.7,
      "other": 11.6
    },
    "homeOwnership": {
      "ownedOutright": 38.3,
      "mortgage": 29.1,
      "rented": 32.5,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1331,
      "ranges": {
        "low": 38.9,
        "mid": 46.9,
        "high": 14.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 18.9,
      "diplomaCertificate": 21.2,
      "highSchoolOrBelow": 59.8
    }
  },
  "point_cook": {
    "age": {
      "under20": 24,
      "twentyTo34": 20.7,
      "thirtyFiveTo54": 26.7,
      "fiftyFivePlus": 28.6,
      "median": 38
    },
    "gender": {
      "male": 49.2,
      "female": 50.8
    },
    "religion": {
      "christianity": 51.6,
      "noReligion": 36.1,
      "islam": 2.4,
      "hinduism": 1.5,
      "buddhism": 1.5,
      "other": 6.9
    },
    "homeOwnership": {
      "ownedOutright": 32.9,
      "mortgage": 45.5,
      "rented": 21.6,
      "other": 0
    },
    "income": {
      "medianWeekly": 1812,
      "ranges": {
        "low": 26.9,
        "mid": 51,
        "high": 22.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 18.8,
      "diplomaCertificate": 33.4,
      "highSchoolOrBelow": 47.8
    }
  },
  "sydenham": {
    "age": {
      "under20": 27.5,
      "twentyTo34": 20.2,
      "thirtyFiveTo54": 29.5,
      "fiftyFivePlus": 22.8,
      "median": 36
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 58.8,
      "noReligion": 18.1,
      "islam": 6.5,
      "hinduism": 4,
      "buddhism": 4.2,
      "other": 8.4
    },
    "homeOwnership": {
      "ownedOutright": 32.5,
      "mortgage": 50.7,
      "rented": 16.7,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2107,
      "ranges": {
        "low": 21.2,
        "mid": 50.3,
        "high": 28.5
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22.9,
      "diplomaCertificate": 27.5,
      "highSchoolOrBelow": 49.6
    }
  },
  "tarneit": {
    "age": {
      "under20": 31.5,
      "twentyTo34": 25.7,
      "thirtyFiveTo54": 29.6,
      "fiftyFivePlus": 13.2,
      "median": 31
    },
    "gender": {
      "male": 51.3,
      "female": 48.7
    },
    "religion": {
      "christianity": 31.3,
      "noReligion": 16.7,
      "islam": 14.6,
      "hinduism": 17.1,
      "buddhism": 2.5,
      "other": 17.9
    },
    "homeOwnership": {
      "ownedOutright": 17,
      "mortgage": 53.3,
      "rented": 29.8,
      "other": 0
    },
    "income": {
      "medianWeekly": 2023,
      "ranges": {
        "low": 18.9,
        "mid": 57,
        "high": 24.1
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 34.1,
      "diplomaCertificate": 24.3,
      "highSchoolOrBelow": 41.6
    }
  },
  "thomastown": {
    "age": {
      "under20": 25.8,
      "twentyTo34": 23,
      "thirtyFiveTo54": 27.2,
      "fiftyFivePlus": 24,
      "median": 35
    },
    "gender": {
      "male": 50.1,
      "female": 49.8
    },
    "religion": {
      "christianity": 44.6,
      "noReligion": 15.3,
      "islam": 15.3,
      "hinduism": 7.8,
      "buddhism": 4.7,
      "other": 12.4
    },
    "homeOwnership": {
      "ownedOutright": 33.7,
      "mortgage": 39.5,
      "rented": 26.8,
      "other": 0
    },
    "income": {
      "medianWeekly": 1516,
      "ranges": {
        "low": 32.4,
        "mid": 52.3,
        "high": 15.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 22,
      "diplomaCertificate": 23.7,
      "highSchoolOrBelow": 54.3
    }
  },
  "warrandyte": {
    "age": {
      "under20": 24.4,
      "twentyTo34": 15.1,
      "thirtyFiveTo54": 27.2,
      "fiftyFivePlus": 33.3,
      "median": 43
    },
    "gender": {
      "male": 48.7,
      "female": 51.3
    },
    "religion": {
      "christianity": 44.5,
      "noReligion": 40.9,
      "islam": 3.2,
      "hinduism": 1.7,
      "buddhism": 3.7,
      "other": 6
    },
    "homeOwnership": {
      "ownedOutright": 44.1,
      "mortgage": 39,
      "rented": 16.8,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2134,
      "ranges": {
        "low": 24.2,
        "mid": 41.2,
        "high": 34.6
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 37.8,
      "diplomaCertificate": 23.2,
      "highSchoolOrBelow": 39
    }
  },
  "ballarat_west": {
    "age": {
      "under20": 24.2,
      "twentyTo34": 19.5,
      "thirtyFiveTo54": 24.2,
      "fiftyFivePlus": 32.1,
      "median": 40
    },
    "gender": {
      "male": 47.8,
      "female": 52.2
    },
    "religion": {
      "christianity": 43,
      "noReligion": 46.7,
      "islam": 0.6,
      "hinduism": 1.2,
      "buddhism": 0.8,
      "other": 7.6
    },
    "homeOwnership": {
      "ownedOutright": 34.9,
      "mortgage": 31.3,
      "rented": 33.8,
      "other": 0
    },
    "income": {
      "medianWeekly": 1416,
      "ranges": {
        "low": 35.3,
        "mid": 47.6,
        "high": 17.2
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 24.2,
      "diplomaCertificate": 29.1,
      "highSchoolOrBelow": 46.7
    }
  },
  "werribee": {
    "age": {
      "under20": 28.2,
      "twentyTo34": 23.9,
      "thirtyFiveTo54": 27.7,
      "fiftyFivePlus": 20.2,
      "median": 34
    },
    "gender": {
      "male": 49.5,
      "female": 50.5
    },
    "religion": {
      "christianity": 41.7,
      "noReligion": 29,
      "islam": 5.4,
      "hinduism": 9.7,
      "buddhism": 2.5,
      "other": 11.7
    },
    "homeOwnership": {
      "ownedOutright": 23.1,
      "mortgage": 44.7,
      "rented": 32.2,
      "other": 0
    },
    "income": {
      "medianWeekly": 1746,
      "ranges": {
        "low": 26,
        "mid": 54.3,
        "high": 19.7
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 24.1,
      "diplomaCertificate": 28.6,
      "highSchoolOrBelow": 47.4
    }
  },
  "williamstown": {
    "age": {
      "under20": 24.2,
      "twentyTo34": 19.1,
      "thirtyFiveTo54": 31.7,
      "fiftyFivePlus": 25,
      "median": 38
    },
    "gender": {
      "male": 49,
      "female": 51
    },
    "religion": {
      "christianity": 39.3,
      "noReligion": 46.6,
      "islam": 4.5,
      "hinduism": 1.1,
      "buddhism": 2.3,
      "other": 6.1
    },
    "homeOwnership": {
      "ownedOutright": 30.9,
      "mortgage": 37.4,
      "rented": 31.6,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 2315,
      "ranges": {
        "low": 22.7,
        "mid": 38.3,
        "high": 39
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 40,
      "diplomaCertificate": 22.3,
      "highSchoolOrBelow": 37.7
    }
  },
  "yan_yean": {
    "age": {
      "under20": 30.5,
      "twentyTo34": 20.1,
      "thirtyFiveTo54": 29.4,
      "fiftyFivePlus": 20,
      "median": 34
    },
    "gender": {
      "male": 49.4,
      "female": 50.6
    },
    "religion": {
      "christianity": 44.2,
      "noReligion": 39.1,
      "islam": 2.8,
      "hinduism": 4,
      "buddhism": 1.6,
      "other": 8.3
    },
    "homeOwnership": {
      "ownedOutright": 23.8,
      "mortgage": 56.9,
      "rented": 19.3,
      "other": 0
    },
    "income": {
      "medianWeekly": 2116,
      "ranges": {
        "low": 19.3,
        "mid": 53.4,
        "high": 27.3
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 23.4,
      "diplomaCertificate": 34.3,
      "highSchoolOrBelow": 42.3
    }
  },
  "greenvale": {
    "age": {
      "under20": 31.4,
      "twentyTo34": 24.3,
      "thirtyFiveTo54": 28.1,
      "fiftyFivePlus": 16.2,
      "median": 32
    },
    "gender": {
      "male": 50.1,
      "female": 49.9
    },
    "religion": {
      "christianity": 44.3,
      "noReligion": 14.6,
      "islam": 17.2,
      "hinduism": 6.9,
      "buddhism": 3,
      "other": 14
    },
    "homeOwnership": {
      "ownedOutright": 18.9,
      "mortgage": 58.1,
      "rented": 22.9,
      "other": 0.1
    },
    "income": {
      "medianWeekly": 1890,
      "ranges": {
        "low": 21.6,
        "mid": 56.9,
        "high": 21.4
      }
    },
    "education": {
      "bachelorDegreeOrHigher": 23.2,
      "diplomaCertificate": 26.9,
      "highSchoolOrBelow": 50
    }
  }
};
