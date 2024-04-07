import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, sendAndConfirmTransaction, Transaction, type Message, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { ARCANA_PROGRAM_ID } from '@/utils/constants';
import { IDL as ArcanaVaultsIDL } from '@/utils/idl/arcana_vaults';
import { useProvider } from '@/hooks/useProvider';
import { BN } from "bn.js";
import { getAssociatedTokenAddressSync  } from "@solana/spl-token";
import * as spl from "@solana/spl-token";
import { findPda } from "../utils/idl/util";
import { assert } from 'console';


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
  closeVault: (base: PublicKey,quote: PublicKey,marketIdentifier: PublicKey) => Promise<void>;
  depositFunds: (vault: PublicKey, marketIdentifier: PublicKey, amountList: number[], tokenMint: PublicKey[]) => Promise<void>;
  withdrawAllFunds: (marketIdentifier: PublicKey, tokenMint: PublicKey[], vault: PublicKey) => Promise<void>;
  loadVaults: (base: PublicKey, quote: PublicKey, marketIdentifier: PublicKey) => Promise<void>;
}

// Context and Hook
export const arcanaVaultsContext = createContext<ArcanaVaultsInterface | null>(null);
export const useArcanaVaults = () => useContext(arcanaVaultsContext) ?? throwError();

export const ArcanaVaultsProvider = ({ children }: { children: React.ReactNode }) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const walletPublickey = publicKey;

  const provider = useProvider();
  const program = new Program(ArcanaVaultsIDL, ARCANA_PROGRAM_ID, provider);

  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublickey, connection]);


  const loadVaults = useCallback(async (
    base: PublicKey,
    quote: PublicKey,
    marketIdentifier: PublicKey
  ) => {
    if (!walletPublickey) return;
    // Implement logic to fetch and set vaults for the logged-in user
    // This may involve calling a program method or querying a Solana account directly
    const vault = findPda(
      [
        Buffer.from("unified-vault"),
        walletPublickey.toBuffer(), // user wallet publicKey
        marketIdentifier.toBuffer(),
      ],
      program.programId
    );

    // get the vault balance of then token.
    const vault_base_token_account = getAssociatedTokenAddressSync(base,vault,true);
    const vault_quote_token_account = getAssociatedTokenAddressSync(quote, vault, true);
    const baseInfo = await connection.getTokenAccountBalance(vault_base_token_account)
    const quoteInfo = await connection.getTokenAccountBalance(vault_quote_token_account)
    console.log(baseInfo.value.uiAmount);
    console.log(quoteInfo.value.uiAmount);

    // quick to find the target pda account and read pda's data
    const vaultAccount = (await program.account.unifiedVault.all()).find(item => item.publicKey.toBase58() == vault.toBase58());
    // vaultAccount?.account.baseVault // -> vault_base_token_account
    // vaultAccount?.account.quoteVault // -> vault_quote_token_account
    // vaultAccount?.account.baseLiquidityShares
    // vaultAccount?.account.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublickey, connection]);

  const initializeVault = useCallback(async (
    cycleDurationInSeconds: number,
    downtimeInSeconds: number,
    base: PublicKey,
    quote: PublicKey,
    marketIdentifier: PublicKey) => {
    if (!walletPublickey) return;
    try {
      const vaultPDA = findPda(
        [
          Buffer.from("unified-vault"),
          walletPublickey.toBuffer(), // user wallet publicKey
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
  }, [walletPublickey, connection]);

  const closeVault = useCallback(async (
    base: PublicKey,
    quote: PublicKey,
    marketIdentifier: PublicKey) => {
    if (!walletPublickey) return;

    const vault = findPda(
      [
        Buffer.from("unified-vault"),
        walletPublickey.toBuffer(), // user wallet publicKey
        marketIdentifier.toBuffer(),
      ],
      program.programId
    );
    const vault_base_token_account = getAssociatedTokenAddressSync(base,vault,true);
    const vault_quote_token_account = getAssociatedTokenAddressSync(quote,vault,true);

		const txHash = await program.methods.closeVault()
			.accounts({
				vault: vault,
				baseVault: vault_base_token_account,
				quoteVault: vault_quote_token_account
			})
			.rpc();
      console.log(txHash);
      console.log("Vault closed");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublickey, connection]);

  const depositFunds = useCallback(async (vault: PublicKey, marketIdentifier: PublicKey, amountList: number[], tokenMint: PublicKey[]) => {
    if (!walletPublickey) return;

    const deposit_receipt_pda = findPda([
      Buffer.from("deposit-receipt"),
      walletPublickey.toBuffer(),
      vault.toBuffer(),
    ], program.programId);

    // quick to find the target pda account and read pda's data
    const depositReceiptAccount  = (await program.account.depositReceipt.all()).find(item => item.publicKey.toBase58() == deposit_receipt_pda.toBase58())
    // depositReceiptAccount?.account.baseTokenLiquidityShares // user deposit amount in this vault
    // depositReceiptAccount?.account.quoteTokenLiquidityShares // user deposit amount in this vault
    // depositReceiptAccount?.account.owner // deposit account owner
    // depositReceiptAccount?.account.vault // amount deposit where

    const transaction = new Transaction();

    assert(amountList.length == tokenMint.length, "If deposit two token must be two amount and mint address");
    assert(amountList.length <= 2, "Deposit amoun only has two")
    assert(tokenMint.length <= 2, "Vault only contains two token")

    for (let index = 0; index < tokenMint.length; index++) {
      const amount = amountList[index];
      const mint = tokenMint[index];

      const user_token_account = getAssociatedTokenAddressSync(mint,vault);
      const vault_token_account = getAssociatedTokenAddressSync(mint,vault,true);
      let ui_amount = new BN(amount * LAMPORTS_PER_SOL);
      const depositIx = await program.methods.depositFunds(ui_amount)
        .accounts({
          marketIdentifier: marketIdentifier,
          vault: vault,
          depositReceipt: deposit_receipt_pda,
          mint: mint,
          userTokenAccount: user_token_account,
          vaultTokenAccount: vault_token_account
        })
        .instruction()
      transaction.add(depositIx)
    }

    const txHash = await sendTransaction(transaction, connection)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublickey, connection]);


  const withdrawAllFunds = useCallback(async (marketIdentifier: PublicKey, tokenMint: PublicKey[], vault: PublicKey) => {
    if (!walletPublickey) return;
    const deposit_receipt_pda = findPda([
      Buffer.from("deposit-receipt"),
      walletPublickey.toBuffer(),
      vault.toBuffer(),
    ], program.programId);
		const transaction = new Transaction();

    for (const mint of tokenMint) {
      const user_token_account = getAssociatedTokenAddressSync(mint,vault);
      const vault_token_account = getAssociatedTokenAddressSync(mint,vault,true);
      const withdrawIx = await program.methods.withdrawAllFunds()
      .accounts({
        marketIdentifier: marketIdentifier,
        vault: vault,
        depositReceipt: deposit_receipt_pda,
        userTokenAccount: user_token_account,
        vaultTokenAccount: vault_token_account
      }).instruction()
      transaction.add(withdrawIx)
    }

    const txHash = await sendTransaction(transaction, connection)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublickey, connection]);


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