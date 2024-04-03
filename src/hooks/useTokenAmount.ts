import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TokenAmount } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Example usage within an async function
async function findAssociatedTokenAddress(mintAddress: PublicKey, ownerAddress: PublicKey) {
  const associatedTokenAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID, // This is usually a constant defined by the SPL Token library
    TOKEN_PROGRAM_ID, // This is also a constant defined by the SPL Token library
    mintAddress, // The mint address of the token
    ownerAddress, // The owner for whom you're finding the associated token account
    true // Whether to allow the owner to be off-curve. Typically set to true.
  );
  return associatedTokenAddress;
}

/**
 * Use this to fetch the account of any entity, but use `useBalance` to know user's balances
 * @param mint Mint of the token account
 * @param owner Owner of the account, defaulting to the connected wallet
 * @returns The amount of tokens in the account and tools to fetch
 */

const defaultAmount: TokenAmount = {
  amount: '0.0',
  decimals: 0.0,
  uiAmount: 0.0,
};

export function useTokenAmount(mint?: PublicKey, owner?: PublicKey) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [account, setAccount] = useState<PublicKey | null>(null);
  
  useEffect(() => {
    const realOwner = owner || wallet.publicKey;
    if (realOwner && mint) {
      findAssociatedTokenAddress(mint, realOwner).then(setAccount).catch(console.error);
    }
  }, [mint, owner, wallet.publicKey]);

  const { error, data } = useQuery({
    queryKey: [`getTokenAccountBalance-${account?.toString()}-undefined`],
    queryFn: () => connection.getTokenAccountBalance(account ?? new PublicKey('')),
    staleTime: 10_000,
    enabled: !!account,
  });

  useEffect(() => {
    if (error) {
      console.error(
        `Error with this account fetch ${account?.toString()} (owner: ${(
          owner || wallet.publicKey
        )?.toString()}, mint: ${mint?.toString()}), please review issue and solve.`,
      );
    }
  }, [error]);

  return { amount: data?.value ?? defaultAmount, account };
}