import { create } from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';

// Define the public key of the specific devnet token's mint
const DEVNET_USDC_MINT = new PublicKey('HrXSsRa3zKsAPNkdu9ZSsZvQXAfuZejvcCb2K3wox3Gz');
const DEVNET_PYTH_MINT = new PublicKey('FV6etEFawMhJrGB656y6Bb6vGfi7qicq6iNk6x86NFWT');

// Define custom TypeScript types/interfaces to match the token account data structure
interface TokenAccount {
  pubkey: PublicKey;
  account: {
    data: {
      parsed: {
        info: {
          tokenAmount: {
            uiAmount: number;
          };
        };
      };
    };
  };
}

interface ParsedTokenAccounts {
  value: TokenAccount[];
}

interface UserTokenBalanceStore {
  resetBalance(): void;
  balance: number;
  getUserTokenBalance: (publicKey: PublicKey, connection: Connection) => void;
}

// Modify the getUserTokenBalance function to return the token balance
const getUserTokenBalance = async (publicKey: PublicKey, connection: Connection): Promise<number> => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: DEVNET_USDC_MINT,
      });
  
      // Parse token account data and calculate balance
      let balance = 0;
      if (tokenAccounts.value) {
        for (const account of tokenAccounts.value) {
          const parsedInfo = account.account.data.parsed;
          if (parsedInfo && parsedInfo.info.tokenAmount) {
            balance += parsedInfo.info.tokenAmount.uiAmount;
          }
        }
      }
  
      console.log(`Balance updated: ${balance} tokens`);
      return balance; // Return the token balance
    } catch (e) {
      console.error(`Error getting balance: `, e);
      throw e; // Throw the error to be caught by the caller
    }
  };

// Update the useUserTokenBalanceStore creation with the modified getUserTokenBalance function
const useUserTokenBalanceStore = create<UserTokenBalanceStore>((set) => ({
    balance: 0,
    getUserTokenBalance: getUserTokenBalance, // Update with the modified getUserTokenBalance function
    resetBalance: () => set({ balance: 0 }),
  }));

export default useUserTokenBalanceStore;
