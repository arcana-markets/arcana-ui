export type ArcanaVaults = {
  "version": "0.1.0",
  "name": "arcana_vaults",
  "instructions": [
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultBaseTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultQuoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cycleDurationInSeconds",
          "type": "u64"
        },
        {
          "name": "downtimeInSeconds",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositFunds",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositReceipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawAllFunds",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositReceipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "refreshQuotesOnOpenbookV2",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrdersAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventHeap",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openbookProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bidOrderArgs",
          "type": {
            "defined": "PlaceOrderArgs"
          }
        },
        {
          "name": "askOrderArgs",
          "type": {
            "defined": "PlaceOrderArgs"
          }
        },
        {
          "name": "cancelOnlyMode",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "depositReceipt",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "baseTokenLiquidityShares",
            "type": "u64"
          },
          {
            "name": "quoteTokenLiquidityShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "unifiedVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "marketIdentifier",
            "type": "publicKey"
          },
          {
            "name": "baseVault",
            "type": "publicKey"
          },
          {
            "name": "quoteVault",
            "type": "publicKey"
          },
          {
            "name": "baseLiquidityShares",
            "type": "u64"
          },
          {
            "name": "quoteLiquidityShares",
            "type": "u64"
          },
          {
            "name": "downtimeStartTimestamp",
            "type": "u64"
          },
          {
            "name": "downtimeEndTimestamp",
            "type": "u64"
          },
          {
            "name": "cycleDurationInSeconds",
            "type": "u64"
          },
          {
            "name": "downtimeInSeconds",
            "type": "u64"
          },
          {
            "name": "lastUpdateSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PlaceOrderArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "side",
            "type": {
              "defined": "Side"
            }
          },
          {
            "name": "priceLots",
            "type": "i64"
          },
          {
            "name": "maxBaseLots",
            "type": "i64"
          },
          {
            "name": "maxQuoteLotsIncludingFees",
            "type": "i64"
          },
          {
            "name": "clientOrderId",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "PlaceOrderType"
            }
          },
          {
            "name": "expiryTimestamp",
            "type": "u64"
          },
          {
            "name": "selfTradeBehavior",
            "type": {
              "defined": "SelfTradeBehavior"
            }
          },
          {
            "name": "limit",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SelfTradeBehavior",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "DecrementTake"
          },
          {
            "name": "CancelProvide"
          },
          {
            "name": "AbortTransaction"
          }
        ]
      }
    },
    {
      "name": "PlaceOrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Limit"
          },
          {
            "name": "ImmediateOrCancel"
          },
          {
            "name": "PostOnly"
          },
          {
            "name": "Market"
          },
          {
            "name": "PostOnlySlide"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PhoenixHeaderError",
      "msg": "Phoenix market header deserialization error"
    },
    {
      "code": 6001,
      "name": "InvalidPhoenixProgram",
      "msg": "Phoenix program id invalid"
    },
    {
      "code": 6002,
      "name": "PhoenixMarketError",
      "msg": "Phoenix market deserialization error"
    },
    {
      "code": 6003,
      "name": "PhoenixVaultSeatRetired",
      "msg": "Phoenix vault seat Retired"
    },
    {
      "code": 6004,
      "name": "VaultFundsNotEmpty",
      "msg": "Vault funds not empty"
    },
    {
      "code": 6005,
      "name": "DepositWithdrawDuringUptime",
      "msg": "Deposit/Withdraw only enabled during downtime period"
    },
    {
      "code": 6006,
      "name": "AmountCannotBeZero",
      "msg": "Deposit/Withdraw amount cannot be zero"
    },
    {
      "code": 6007,
      "name": "RefreshQuotesDuringDowntime",
      "msg": "Cannot refresh quotes during downtime period"
    },
    {
      "code": 6008,
      "name": "DepositRatioCheckFail",
      "msg": "Deposit ratio check failed"
    },
    {
      "code": 6009,
      "name": "InvalidVaultOwner",
      "msg": "Current signer not vault owner"
    }
  ]
};

export const IDL: ArcanaVaults = {
  "version": "0.1.0",
  "name": "arcana_vaults",
  "instructions": [
    {
      "name": "initializeVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultBaseTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultQuoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "cycleDurationInSeconds",
          "type": "u64"
        },
        {
          "name": "downtimeInSeconds",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositFunds",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositReceipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawAllFunds",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketIdentifier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositReceipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "refreshQuotesOnOpenbookV2",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrdersAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventHeap",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openbookProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bidOrderArgs",
          "type": {
            "defined": "PlaceOrderArgs"
          }
        },
        {
          "name": "askOrderArgs",
          "type": {
            "defined": "PlaceOrderArgs"
          }
        },
        {
          "name": "cancelOnlyMode",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "depositReceipt",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "baseTokenLiquidityShares",
            "type": "u64"
          },
          {
            "name": "quoteTokenLiquidityShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "unifiedVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "marketIdentifier",
            "type": "publicKey"
          },
          {
            "name": "baseVault",
            "type": "publicKey"
          },
          {
            "name": "quoteVault",
            "type": "publicKey"
          },
          {
            "name": "baseLiquidityShares",
            "type": "u64"
          },
          {
            "name": "quoteLiquidityShares",
            "type": "u64"
          },
          {
            "name": "downtimeStartTimestamp",
            "type": "u64"
          },
          {
            "name": "downtimeEndTimestamp",
            "type": "u64"
          },
          {
            "name": "cycleDurationInSeconds",
            "type": "u64"
          },
          {
            "name": "downtimeInSeconds",
            "type": "u64"
          },
          {
            "name": "lastUpdateSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PlaceOrderArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "side",
            "type": {
              "defined": "Side"
            }
          },
          {
            "name": "priceLots",
            "type": "i64"
          },
          {
            "name": "maxBaseLots",
            "type": "i64"
          },
          {
            "name": "maxQuoteLotsIncludingFees",
            "type": "i64"
          },
          {
            "name": "clientOrderId",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "PlaceOrderType"
            }
          },
          {
            "name": "expiryTimestamp",
            "type": "u64"
          },
          {
            "name": "selfTradeBehavior",
            "type": {
              "defined": "SelfTradeBehavior"
            }
          },
          {
            "name": "limit",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SelfTradeBehavior",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "DecrementTake"
          },
          {
            "name": "CancelProvide"
          },
          {
            "name": "AbortTransaction"
          }
        ]
      }
    },
    {
      "name": "PlaceOrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Limit"
          },
          {
            "name": "ImmediateOrCancel"
          },
          {
            "name": "PostOnly"
          },
          {
            "name": "Market"
          },
          {
            "name": "PostOnlySlide"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PhoenixHeaderError",
      "msg": "Phoenix market header deserialization error"
    },
    {
      "code": 6001,
      "name": "InvalidPhoenixProgram",
      "msg": "Phoenix program id invalid"
    },
    {
      "code": 6002,
      "name": "PhoenixMarketError",
      "msg": "Phoenix market deserialization error"
    },
    {
      "code": 6003,
      "name": "PhoenixVaultSeatRetired",
      "msg": "Phoenix vault seat Retired"
    },
    {
      "code": 6004,
      "name": "VaultFundsNotEmpty",
      "msg": "Vault funds not empty"
    },
    {
      "code": 6005,
      "name": "DepositWithdrawDuringUptime",
      "msg": "Deposit/Withdraw only enabled during downtime period"
    },
    {
      "code": 6006,
      "name": "AmountCannotBeZero",
      "msg": "Deposit/Withdraw amount cannot be zero"
    },
    {
      "code": 6007,
      "name": "RefreshQuotesDuringDowntime",
      "msg": "Cannot refresh quotes during downtime period"
    },
    {
      "code": 6008,
      "name": "DepositRatioCheckFail",
      "msg": "Deposit ratio check failed"
    },
    {
      "code": 6009,
      "name": "InvalidVaultOwner",
      "msg": "Current signer not vault owner"
    }
  ]
};
