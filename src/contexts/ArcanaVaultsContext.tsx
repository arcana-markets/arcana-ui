{/*

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, BN, AnchorProvider } from '@coral-xyz/anchor';
import { ARCANA_VAULTS_PROGRAM_ID } from '@/utils/constants';
import { IDL as ArcanaVaults } from '@/utils/idl/arcana_vaults';

interface Vault {
  address: string;
  owner: PublicKey;
  balance: number;
}

interface ArcanaVaultsInterface {
  vaults: Vault[] | undefined;
  initializeVault: (cycleDurationInSeconds: BN, downtimeInSeconds: BN) => Promise<void>;
  closeVault: (vaultAddress: PublicKey) => Promise<void>;
  depositFunds: (vaultAddress: PublicKey, amount: number) => Promise<void>;
  withdrawAllFunds: (vaultAddress: PublicKey) => Promise<void>;
}

// Context and Hook
export const arcanaVaultsContext = createContext<ArcanaVaultsInterface | null>(null);
export const useArcanaVaults = () => useContext(arcanaVaultsContext) ?? throwError();

export const ArcanaVaultsProvider = ({ children }: { children: React.ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    // Load existing vaults from the blockchain or cache
    const loadVaults = async () => {
      // Fetch vaults and update state...
    };
    loadVaults();
  }, []);

  const initializeVault = useCallback(async (cycleDurationInSeconds: BN, downtimeInSeconds: BN) => {
    if (!wallet.publicKey) return;

    try {
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
      const program = new Program(ArcanaVaults, ARCANA_VAULTS_PROGRAM_ID, provider);

      const [vaultPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), wallet.publicKey.toBuffer()],
        program.programId,
      );

      await program.rpc.initializeVault(cycleDurationInSeconds, downtimeInSeconds, {
        accounts: {
          vault: vaultPDA,
          owner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          // Add any other accounts required by your program
        },
      });

      console.log("Vault Initialized");
    } catch (error) {
      console.error("Error initializing vault: ", error);
    }
  }, [wallet, connection]);

  const closeVault = useCallback(async (vaultAddress: PublicKey) => {
    // Stub implementation or actual logic here
  }, []);

  const depositFunds = useCallback(async (vaultAddress: PublicKey, amount: number) => {
    // Stub implementation or actual logic here
  }, []);

  const withdrawAllFunds = useCallback(async (vaultAddress: PublicKey) => {
    // Stub implementation or actual logic here
  }, []);

  return (
    <arcanaVaultsContext.Provider value={{
      vaults,
      initializeVault,
      closeVault,
      depositFunds,
      withdrawAllFunds,
    }}>
      {children}
    </arcanaVaultsContext.Provider>
  );
}

function throwError() {
  throw new Error('useArcanaVaults must be used within an ArcanaVaultsProvider');
}

*/}