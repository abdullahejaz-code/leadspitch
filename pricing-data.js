/* LeadsPitch pricing configuration
 * Single source of truth for every price, badge, strike-through price and Whop plan ID.
 * Edit with the local pricing editor (pricing-admin.html). That file is gitignored and
 * refuses to run on any public host, so it never reaches the live site.
 * Applied at runtime by pricing-apply.js -- no page regeneration required.
 */
window.LP_PRICING = {
  "industries": {
    "accounting-finance": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_Kl8EV5U6fxGXN"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_FZIXCJHW8E0Cz"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_XeaKRTtwCqHZc"
        },
        "business": {
          "name": "Business",
          "vol": "65K",
          "price": "$329.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_HUtmdH3lzvGnn"
        }
      }
    },
    "agencies-business": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_nAfRyWgBLPUGR"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_7lQdttPlCVPjT"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_3sP56E6iEeyrP"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$599.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_LDvgfXk9GIy3U"
        },
        "scale": {
          "name": "Scale",
          "vol": "200k",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "For Scaling",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_wn6DX7FUgu7CX"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "300K",
          "price": "$1,499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_CkJzlt32zgUCU"
        }
      }
    },
    "automotive": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_Cu3F9t93BukgK"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_hR7mjOUxc8F6t"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_pBDfqlXAXsXdo"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_hu9ZU6e0UECtq"
        },
        "scale": {
          "name": "Scale",
          "vol": "200k",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Massive Volume",
          "badgeTip": "For high-volume data across a wide audience.",
          "featured": false,
          "planId": "plan_cym5Kt7UNLrPl"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "300K",
          "price": "$1,499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_aEJf73xKt4igl"
        }
      }
    },
    "beauty-wellness": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_hmiPPHfCuoFES"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_fRYKIPQCp1y7B"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_gvnuFaCL4KARR"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_QJBO3labbblD0"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "160K",
          "price": "$799.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_bUc6UHgQA9TBT"
        }
      }
    },
    "clinics": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5,000",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Freelancers",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_UyqaxhhOeZJbG"
        },
        "growth": {
          "name": "Growth",
          "vol": "25,000",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Agencies & Growing Campaigns",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_ND7Ee33dJFeHu"
        },
        "professional": {
          "name": "Professional",
          "vol": "50,000",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Sales Teams & Large Campaigns",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_9EReD9jkX2RbA"
        },
        "business": {
          "name": "Business",
          "vol": "100,000",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Enterprise Outreach",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_cPJy4Q4EsCW8p"
        }
      }
    },
    "construction": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_4016VESqCmBfG"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_W8waYmfC8Dk5h"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_RTk0RLBUBJ2mE"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_GmPSYV2Oetev6"
        },
        "scale": {
          "name": "Scale",
          "vol": "200K",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Enterprise Ready",
          "badgeTip": "Ready for enterprise-scale outreach and integrations.",
          "featured": false,
          "planId": "plan_SORdfInzkB3Qt"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "350K",
          "price": "$1,599.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_S8REQ5hVMCoxT"
        }
      }
    },
    "dentists": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Solo outreach",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_ujCgorFTIT12O"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Agencies & marketers",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_nnOkSiUmcaj1B"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Sales teams",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_8vGKTKyWnI3KP"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete dental database",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_0YBRcmjccogXz"
        }
      }
    },
    "education": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_kMjdnOSXKhGqD"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_V6HKj416jPjel"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_ErkQqGSiYMD2a"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_0vE0wYXnJGXME"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "175K",
          "price": "$699.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_o0gy4HHXJvW8s"
        }
      }
    },
    "events-leisure": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_rQGK7oEwVAUY1"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_Jsdjhlr4EoV0n"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_Ol8Q9Ons3d3bH"
        },
        "business": {
          "name": "Business",
          "vol": "110K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_SALSxQPpqpXEZ"
        }
      }
    },
    "food-beverage": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_lFpGgxKnvWr8b"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_ndKq3UlhuOB6M"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_jwlcTHlCbwphB"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_1sCGEBxSkFqZ3"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "170K",
          "price": "$799.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_ZnHpu2j2usvzX"
        }
      }
    },
    "home-services": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_rYOE7Pa1IwtEX"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_fNNqudcMlAfUS"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_VK3Mh1DEZaAJh"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_29buO0Nuxi5AY"
        },
        "scale": {
          "name": "Scale",
          "vol": "200K",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Growing Enterprise",
          "badgeTip": "For high-volume data across a wide audience.",
          "featured": false,
          "planId": "plan_u7qkytrQyD4O3"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "300K",
          "price": "$1,499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Enterprise Ready",
          "badgeTip": "Ready for enterprise-scale outreach and integrations.",
          "featured": false,
          "planId": "plan_cSbkrBP0VNNfm"
        },
        "complete-database": {
          "name": "Complete Database",
          "vol": "430K+",
          "price": "$1,999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Coverage",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_FvQ4t6j8p9bxl"
        }
      }
    },
    "hotels-hospitality": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_RNOO9E7FfPV3d"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Level Up",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_etAl1Y5sjlREF"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_6ALX0u0p5tZ1H"
        },
        "business": {
          "name": "Business",
          "vol": "75K",
          "price": "$329.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_yoU0XHohrynoD"
        }
      }
    },
    "legal": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_blFovqQUkQlgO"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_axHYteeaF6X31"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_9PQiFOoZGAMHI"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$599.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_0crzreWdanZmf"
        },
        "scale": {
          "name": "Scale",
          "vol": "200k",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Covarage",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_o3q9ey76HaitS"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "300K",
          "price": "$1,429.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_SHLvXWJZcuRKQ"
        }
      }
    },
    "logistics": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_KnDso3aEfemUP"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_Cl6ge8GnVX7r0"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_sHrsVW9guBIaV"
        },
        "business": {
          "name": "Business",
          "vol": "85K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_aZszGE9qHLc4M"
        }
      }
    },
    "real-estate": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "1,000",
          "price": "$29.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_1xeQn9BxBQy6H"
        },
        "growth": {
          "name": "Growth",
          "vol": "2,500",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Great Value",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_k5KCXjTYEJ5tT"
        },
        "professional": {
          "name": "Professional",
          "vol": "5,000",
          "price": "$99.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_1S7ufkiT91vAh"
        },
        "business": {
          "name": "Business",
          "vol": "10,000",
          "price": "$149.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_WwQZaGAU9sAwZ"
        },
        "scale": {
          "name": "Scale",
          "vol": "25,000",
          "price": "$259.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_gFmnytXJab25o"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "50,000",
          "price": "$399.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Coverage",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_i9dflQdPIbgw4"
        }
      }
    },
    "restaurants-cafes": {
      "plans": {
        "starter": {
          "name": "Starter",
          "vol": "5K",
          "price": "$49.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Entry Plan",
          "badgeTip": "A small, affordable sample to test the quality of the dataset.",
          "featured": false,
          "planId": "plan_mMF0oShgEGSQ8"
        },
        "growth": {
          "name": "Growth",
          "vol": "25K",
          "price": "$179.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Most Popular",
          "badgeTip": "The tier most buyers choose — the best balance of price and volume.",
          "featured": true,
          "planId": "plan_KUWsYxK9okQIJ"
        },
        "professional": {
          "name": "Professional",
          "vol": "50K",
          "price": "$299.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Best Value",
          "badgeTip": "The best per-record price for most dataset sizes.",
          "featured": true,
          "planId": "plan_fG1BGh7hVvOzP"
        },
        "business": {
          "name": "Business",
          "vol": "100K",
          "price": "$499.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "High Volume",
          "badgeTip": "Built for larger datasets and sustained data volume.",
          "featured": false,
          "planId": "plan_luUtDGUArZ6PD"
        },
        "enterprise": {
          "name": "Enterprise",
          "vol": "200K",
          "price": "$999.99",
          "wasPrice": "",
          "badgeOn": true,
          "badge": "Complete Database",
          "badgeTip": "Every verified record we currently have for this industry.",
          "featured": false,
          "planId": "plan_ocxXLHcwhISGX"
        }
      }
    }
  },
  "bundles": {
    "starter-duo": {
      "name": "Starter Duo Pack",
      "save": "$100",
      "tiers": {
        "5k": {
          "price": "$79",
          "wasPrice": "",
          "planId": "plan_pa1W11zZOlnur"
        },
        "25k": {
          "price": "$299",
          "wasPrice": "",
          "planId": "plan_xayb8cL86uwWd"
        },
        "50k": {
          "price": "$499",
          "wasPrice": "",
          "planId": "plan_GOujg0WhjvMu3"
        }
      }
    },
    "healthcare-wellness": {
      "name": "Healthcare & Wellness Pack",
      "save": "$200",
      "tiers": {
        "5k": {
          "price": "$119",
          "wasPrice": "",
          "planId": "plan_jXy1ZlO5l6TcK"
        },
        "25k": {
          "price": "$429",
          "wasPrice": "",
          "planId": "plan_6lmHM90X3Umy4"
        },
        "50k": {
          "price": "$699",
          "wasPrice": "",
          "planId": "plan_FhskaTVegQ4rO"
        }
      }
    },
    "real-estate-property": {
      "name": "Real Estate & Property Pack",
      "save": "$70",
      "tiers": {
        "5k": {
          "price": "$139",
          "wasPrice": "",
          "planId": "plan_IQJOItoAnyUS5"
        },
        "25k": {
          "price": "$499",
          "wasPrice": "",
          "planId": "plan_Q0KmxoQlNBs2j"
        },
        "50k": {
          "price": "$829",
          "wasPrice": "",
          "planId": "plan_qonxYDoFFjM2r"
        }
      }
    },
    "professional-services": {
      "name": "Professional Services Pack",
      "save": "$70",
      "tiers": {
        "5k": {
          "price": "$139",
          "wasPrice": "",
          "planId": "plan_79rDxSo35wYFt"
        },
        "25k": {
          "price": "$499",
          "wasPrice": "",
          "planId": "plan_tbxF5LC6aDf5x"
        },
        "50k": {
          "price": "$829",
          "wasPrice": "",
          "planId": "plan_JuDx5EnzLqwTf"
        }
      }
    },
    "ecommerce-growth": {
      "name": "E-commerce & Growth Pack",
      "save": "$200",
      "tiers": {
        "5k": {
          "price": "$119",
          "wasPrice": "",
          "planId": "plan_Zq7rsVu3XN79k"
        },
        "25k": {
          "price": "$429",
          "wasPrice": "",
          "planId": "plan_Q3YqRzfdM7hj3"
        },
        "50k": {
          "price": "$699",
          "wasPrice": "",
          "planId": "plan_7hwzboPBsTIBi"
        }
      }
    },
    "trades-services": {
      "name": "Trades & Services Pack",
      "save": "$250",
      "tiers": {
        "5k": {
          "price": "$159",
          "wasPrice": "",
          "planId": "plan_a17sf40GB4sSq"
        },
        "25k": {
          "price": "$579",
          "wasPrice": "",
          "planId": "plan_s8ai146OhdlBs"
        },
        "50k": {
          "price": "$949",
          "wasPrice": "",
          "planId": "plan_UDVIHrsM4EPZz"
        }
      }
    },
    "hospitality-leisure": {
      "name": "Hospitality & Leisure Pack",
      "save": "$300",
      "tiers": {
        "5k": {
          "price": "$149",
          "wasPrice": "",
          "planId": "plan_ygqz0vFsjxwcr"
        },
        "25k": {
          "price": "$549",
          "wasPrice": "",
          "planId": "plan_HGQxn8uJQeVvt"
        },
        "50k": {
          "price": "$899",
          "wasPrice": "",
          "planId": "plan_qQaXtvMLSuWNa"
        }
      }
    },
    "premium-high-ticket": {
      "name": "Premium High-Ticket Pack",
      "save": "$250",
      "tiers": {
        "5k": {
          "price": "$199",
          "wasPrice": "",
          "planId": "plan_ft4tybCPjJLmX"
        },
        "25k": {
          "price": "$749",
          "wasPrice": "",
          "planId": "plan_1eHcyozlhMQKT"
        },
        "50k": {
          "price": "$1,249",
          "wasPrice": "",
          "planId": "plan_cj1q71o9E3UCt"
        }
      }
    },
    "local-business": {
      "name": "Local Business Pack",
      "save": "$300",
      "tiers": {
        "5k": {
          "price": "$249",
          "wasPrice": "",
          "planId": "plan_h4Fmt2aBvClcu"
        },
        "25k": {
          "price": "$899",
          "wasPrice": "",
          "planId": "plan_1sGv0yL2wDjxH"
        },
        "50k": {
          "price": "$1,499",
          "wasPrice": "",
          "planId": "plan_CcZS2C0ZnayaD"
        }
      }
    },
    "ultimate-local": {
      "name": "Ultimate Local Domination",
      "save": "$700",
      "tiers": {
        "5k": {
          "price": "$279",
          "wasPrice": "",
          "planId": "plan_4WA6zwoGOKYXx"
        },
        "25k": {
          "price": "$999",
          "wasPrice": "",
          "planId": "plan_v9DKFQz6VqKPa"
        },
        "50k": {
          "price": "$1,699",
          "wasPrice": "",
          "planId": "plan_xT3Fjhem1lnrK"
        }
      }
    },
    "all-industry": {
      "name": "All-Industry Domination",
      "save": "$1,800",
      "tiers": {
        "5k": {
          "price": "$599",
          "wasPrice": "",
          "planId": "plan_5zuWegWTFoKO8"
        },
        "25k": {
          "price": "$1,999",
          "wasPrice": "",
          "planId": "plan_RqlSlFod3fdse"
        },
        "50k": {
          "price": "$2,500",
          "wasPrice": "",
          "planId": "plan_X1oLU4JIVRuYE"
        }
      }
    }
  },
  "home": {
    "single": {
      "price": "$15.98",
      "wasPrice": "",
      "unit": "per dataset",
      "badgeOn": true,
      "badge": "20% OFF"
    },
    "bundles": {
      "price": "Save up to $1,800",
      "badgeOn": true,
      "badge": "Best value"
    }
  }
};
