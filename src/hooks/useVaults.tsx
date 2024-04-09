import { useEffect, useState } from "react";
import { useArcanaVaults } from "@/contexts/ArcanaVaultsContext";
import { PublicKey } from "@solana/web3.js";

// Example PublicKey values - replace these with your actual keys
const BASE_PUBLIC_KEY = new PublicKey("YourBasePublicKeyHere");
const QUOTE_PUBLIC_KEY = new PublicKey("YourQuotePublicKeyHere");
const MARKET_IDENTIFIER = new PublicKey("YourMarketIdentifierHere");

export const useVaults = () => {
    const { loadVaults, vaults } = useArcanaVaults() || {};

    useEffect(() => {
      if (loadVaults) {
        loadVaults(BASE_PUBLIC_KEY, QUOTE_PUBLIC_KEY, MARKET_IDENTIFIER);
      }
    }, [loadVaults]);

    return vaults;
};
