// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAnchorWallet, useConnection, AnchorWallet } from "@solana/wallet-adapter-react"
import { AnchorProvider, setProvider,  } from "@coral-xyz/anchor"
import { useMemo } from "react";

export function useProvider() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet()

  const provider = useMemo(() => new AnchorProvider(connection, wallet as AnchorWallet, {}), [connection, wallet]);
  // const provider = new AnchorProvider(connection, wallet, {})
  setProvider(provider);
  return provider;
}
