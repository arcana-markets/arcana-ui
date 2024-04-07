import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, type Message, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { ARCANA_PROGRAM_ID } from '@/utils/constants';
import { IDL as ArcanaVaultsIDL } from '@/utils/idl/arcana_vaults';
import { useProvider } from '@/hooks/useProvider';
import { BN } from "bn.js";
import { getAssociatedTokenAddressSync  } from "@solana/spl-token";
import * as spl from "@solana/spl-token";
import { findPda } from "../utils/idl/util";


interface Vault {
  address: string;
  owner: PublicKey;
  balance: number;
}

interface ArcanaVaultsInterface {
  vaults: Vault[] | undefined;
  initializeVault: (
    cycleDurationInSeconds: number, downtimeInSeconds: number,
    base: PublicKey, quote: PublicKey, marketIdentifier: PublicKey) => Promise<void>;
  closeVault: (vaultAddress: PublicKey) => Promise<void>;
  depositFunds: (vaultAddress: PublicKey, amount: number) => Promise<void>;
  withdrawAllFunds: (vaultAddress: PublicKey) => Promise<void>;
  loadVaults: (base: PublicKey, quote: PublicKey, marketIdentifier: PublicKey) => Promise<void>;
}

// Context and Hook
export const arcanaVaultsContext = createContext<ArcanaVaultsInterface | null>(null);
export const useArcanaVaults = () => useContext(arcanaVaultsContext) ?? throwError();

export const ArcanaVaultsProvider = ({ children }: { children: React.ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  // const { publicKey, signTransaction } = useWallet();
  const provider = useProvider();
  const program = new Program(ArcanaVaultsIDL, ARCANA_PROGRAM_ID, provider);

  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);


  const loadVaults = useCallback(async (
    base: PublicKey,
    quote: PublicKey,
    marketIdentifier: PublicKey
  ) => {
    if (!wallet?.publicKey) return;
    // Implement logic to fetch and set vaults for the logged-in user
    // This may involve calling a program method or querying a Solana account directly
    const vaultPDA = findPda(
      [
        Buffer.from("unified-vault"),
        wallet?.publicKey.toBuffer(), // user wallet publicKey
        marketIdentifier.toBuffer(),
      ],
      program.programId
    );
    const vault_base_token_account = getAssociatedTokenAddressSync(base,vaultPDA,true);
    const vault_quote_token_account = getAssociatedTokenAddressSync(quote, vaultPDA, true);

    const baseInfo = await connection.getTokenAccountBalance(vault_base_token_account)
    const quoteInfo = await connection.getTokenAccountBalance(vault_quote_token_account)

    console.log(baseInfo.value.uiAmount);
    console.log(quoteInfo.value.uiAmount);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);

  const initializeVault = useCallback(async (
    cycleDurationInSeconds: number,
    downtimeInSeconds: number,
    base: PublicKey,
    quote: PublicKey,
    marketIdentifier: PublicKey) => {
    if (!wallet?.publicKey) return;
    try {
      const vaultPDA = findPda(
        [
          Buffer.from("unified-vault"),
          wallet?.publicKey.toBuffer(), // user wallet publicKey
          marketIdentifier.toBuffer(),
        ],
        program.programId
      );
      const vault_base_token_account = getAssociatedTokenAddressSync(base,vaultPDA,true);
      const vault_quote_token_account = getAssociatedTokenAddressSync(quote,vaultPDA,true);

      const txHash = await program.methods.initializeVault(
        new BN(cycleDurationInSeconds),
        new BN(downtimeInSeconds))
        .accounts({
          vault: vaultPDA,
          marketIdentifier: marketIdentifier,
          baseMint: base,
          quoteMint: quote,
          vaultBaseTokenAccount: vault_base_token_account,
          vaultQuoteTokenAccount: vault_quote_token_account,
          systemProgram: SystemProgram.programId,
        }).rpc();

      console.log(txHash);
      console.log("Vault Initialized");
      loadVaults(base , quote , marketIdentifier);
    } catch (error) {
      console.error("Error initializing vault: ", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);

  const closeVault = useCallback(async (vaultAddress: PublicKey) => {
    // Add implementation logic to close a vault
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);

  const depositFunds = useCallback(async (vaultAddress: PublicKey, amount: number) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);

  const withdrawAllFunds = useCallback(async (vaultAddress: PublicKey) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey, connection]);

  return (
    <arcanaVaultsContext.Provider value={{
      vaults,
      initializeVault,
      closeVault,
      depositFunds,
      withdrawAllFunds,
      loadVaults,
    }}>
      {children}
    </arcanaVaultsContext.Provider>
  );
}

function throwError() {
  throw new Error('useArcanaVaults must be used within an ArcanaVaultsProvider');
}