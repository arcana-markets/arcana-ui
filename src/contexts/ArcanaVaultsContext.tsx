import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, type Message, SystemProgram } from '@solana/web3.js';
import { Program, BN, AnchorProvider } from '@coral-xyz/anchor';
import { ARCANA_PROGRAM_ID } from '@/utils/constants';
import { IDL as ArcanaVaultsIDL } from '@/utils/idl/arcana_vaults';

interface Vault {
  address: string;
  owner: PublicKey;
  balance: number;
}

interface ArcanaVaultsInterface {
  vaults: Vault[] | undefined;
  initializeVault: (cycleDurationInSeconds: BN, downtimeInSeconds: BN) => Promise<void>;
  closeVault: (vaultAddress: PublicKey) => Promise<void>;
  depositFunds: (vaultAddress: PublicKey, amount: BN) => Promise<void>;
  withdrawAllFunds: (vaultAddress: PublicKey) => Promise<void>;
  loadVaults: () => Promise<void>;
}

// Context and Hook
export const arcanaVaultsContext = createContext<ArcanaVaultsInterface | null>(null);
export const useArcanaVaults = () => useContext(arcanaVaultsContext) ?? throwError();

export const ArcanaVaultsProvider = ({ children }: { children: React.ReactNode }) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    loadVaults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

  const wallet = useWallet();
  const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  const program = new Program(ArcanaVaultsIDL, ARCANA_PROGRAM_ID, provider);

  const loadVaults = useCallback(async () => {
    if (!publicKey) return;
    // Implement logic to fetch and set vaults for the logged-in user
    // This may involve calling a program method or querying a Solana account directly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

  const initializeVault = useCallback(async (cycleDurationInSeconds: BN, downtimeInSeconds: BN) => {
    if (!publicKey) return;
    try {
      const [vaultPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("vault"), publicKey.toBuffer()],
        program.programId,
      );

      await program.rpc.initializeVault(cycleDurationInSeconds, downtimeInSeconds, {
        accounts: {
          vault: vaultPDA,
          owner: publicKey,
          systemProgram: SystemProgram.programId,
          marketIdentifier: new PublicKey("..."), 
          baseMint: new PublicKey("..."), 
          quoteMint: new PublicKey("..."), 
          vaultBaseTokenAccount: new PublicKey("..."), 
          vaultQuoteTokenAccount: new PublicKey("..."), 
          associatedTokenProgram: new PublicKey("..."), 
          tokenProgram: new PublicKey("..."),
        },
      });

      console.log("Vault Initialized");
      loadVaults();
    } catch (error) {
      console.error("Error initializing vault: ", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

  const closeVault = useCallback(async (vaultAddress: PublicKey) => {
    // Add implementation logic to close a vault
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

  const depositFunds = useCallback(async (vaultAddress: PublicKey, amount: BN) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

  const withdrawAllFunds = useCallback(async (vaultAddress: PublicKey) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connection]);

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