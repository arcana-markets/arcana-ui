import { useEffect, useState } from "react";
import { useArcanaVaults } from "@/contexts/ArcanaVaultsContext";
import { PublicKey } from "@solana/web3.js";

// Example PublicKey values - replace these with your actual keys
const BASE_PUBLIC_KEY = new PublicKey("bzSvVHBjJFE3jDNJ5fhgNG23HZBW2jDUWHUaYLYdbv5");
const QUOTE_PUBLIC_KEY = new PublicKey("HrXSsRa3zKsAPNkdu9ZSsZvQXAfuZejvcCb2K3wox3Gz");
const MARKET_IDENTIFIER = new PublicKey("DsPZZf8jvwiciCyze5XSEYSKUoR5ExziCS6F2S5FFca8");

export const useVaults = () => {
    const { loadVaults, vaults } = useArcanaVaults() || {};

    useEffect(() => {
      if (loadVaults) {
        loadVaults(BASE_PUBLIC_KEY, QUOTE_PUBLIC_KEY, MARKET_IDENTIFIER);
      }
    }, [loadVaults]);

    return vaults;
};
