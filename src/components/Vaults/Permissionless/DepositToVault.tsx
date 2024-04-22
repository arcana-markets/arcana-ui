'use client'
import React, { useCallback, useEffect, useState } from "react";
import DepositForm from "./DepositForm";
import WithdrawalForm from "./WithdrawalForm";
import { DepositeIcon, WithdrawIcon } from "@/components/common/Icons";
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { VaultKey } from '@/utils/types'; // Adjust the path as needed

interface DepositToVaultProps {
  params: { arcVault: VaultKey };
  publicKey: PublicKey | null;
}

const DEVNET_USDC_MINT = new PublicKey('HrXSsRa3zKsAPNkdu9ZSsZvQXAfuZejvcCb2K3wox3Gz');
const DEVNET_PYTH_MINT = new PublicKey('FV6etEFawMhJrGB656y6Bb6vGfi7qicq6iNk6x86NFWT');

const DepositToVault: React.FC<DepositToVaultProps> = ({ params, publicKey }) => {
  const [deposit, setDeposit] = useState(true)
  const [typing, setTyping] = useState(false)
  const wallet = useWallet();
  const { connection } = useConnection();
  const [tokenBalances, setTokenBalances] = useState<{ usdc: number; pyth: number }>({ usdc: 0, pyth: 0 });
  // Modify the getUserTokenBalance function to return the token balance
  const getUserTokenBalance = async (publicKey: PublicKey, connection: Connection, mint: PublicKey): Promise<number> => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint, // Use the mint parameter
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
  
  // Inside the DepositForm component, call setTokenBalances with an object containing balances for each token
  const fetchTokenBalances = async () => {
    try {
      if (wallet.publicKey) {
        const usdcBalance = await getUserTokenBalance(wallet.publicKey, connection, DEVNET_USDC_MINT);
        const pythBalance = await getUserTokenBalance(wallet.publicKey, connection, DEVNET_PYTH_MINT);
        setTokenBalances({ usdc: usdcBalance, pyth: pythBalance }); // Set balances for each token
      }
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  };
  
  useEffect(() => {
    if (wallet.connected) {
      fetchTokenBalances();
    } else {
      setTokenBalances({ usdc: 0, pyth: 0 }); // Set balances to 0 if not connected
    }
  }, [wallet.publicKey, wallet.connected, connection]);

  const loadVaults = useCallback(async (
    base: PublicKey,
    quote: PublicKey,
  ) => {
    if (!publicKey) {
      console.error("No public key available.");
      return;
    }
    
    try {
      const connection = new Connection('https://devnet.solana.com');
      
      // Fetch balances directly from Solana blockchain
      const baseTokenAccount = await connection.getTokenAccountBalance(base);
      const quoteTokenAccount = await connection.getTokenAccountBalance(quote);

          // Access balance values
    console.log("Base token balance:", baseTokenAccount.value.uiAmount);
    console.log("Quote token balance:", quoteTokenAccount.value.uiAmount);
  } catch (error) {
    console.error("Error loading vaults:", error);
  }
}, [publicKey]);

  return (
    <>
      <div className="w-full max-lg:w-full max-w-[752px]">
        <div className="vault_card w-full">
          <div className=" bg-[#222834] rounded-[24px_24px_0px_0px] p-6  sm:p-[38px_32px_24px_32px]">
            <div className=" flex justify-between items-center">
              <p className=" font-Inter text-white font-medium text-[16px]  leading-[28px]">
                Your Vault Position
              </p>
              <div className="claim-btn hover:opacity-50 duration-300 cursor-pointer bg-bluelguana p-[8px_12px_8px_12px] rounded-xl max-w-[120px]  font-Inter font-medium text-[14px] leading-[24px] text-white">
                Claim rewards
              </div>
            </div>
            <div className="under_line w-full h-[1px] bg-[linear-gradient(90deg,#1E232E_0%,#3C465D_100%)] mt-3"></div>

            <div className=" flex flex-wrap items-center gap-10 sm:gap-[70px]">
              <div>
                <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola mt-4 ">
                  Total Deposited
                </p>
                <h2 className=" font-poppins text-white font-semibold text-[28px] leading-[28px] mt-[10px] hover:text-markergreen duration-300">
                  $0
                </h2>
              </div>
              <div>
                <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola mt-4 ">
                  Earned Fees
                </p>
                <h2 className=" font-poppins font-semibold text-[28px] leading-[28px] mt-[10px] text-markergreen duration-300 ">
                  +$0
                </h2>
              </div>
              <div>
                <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola mt-4 ">
                  Asset Ratio
                </p>
                <h2 className=" font-poppins text-white font-semibold text-[28px] leading-[28px] mt-[10px]  duration-300 ">
                  0.8274
                </h2>
              </div>
            </div>
            <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola mt-4 ">
              Deposited Balances
            </p>
            <div className=" sm:flex gap-[13px] items-center ">
              <h3 className=" flex items-center gap-[8px]">
                <span className=" font-Inter font-semibold text-[16px] leading-[20px] text-white">
                  0
                </span>
                <span className="font-Inter font-bold text-[16px] leading-[28px] text-white">
                  PYTH
                </span>
              </h3>
              <hr className=" max-sm:hidden bg-[#63779C] w-[3px] h-[19px] p-0 border-0" />
              <h3 className=" flex items-center gap-[8px]">
                <span className=" font-Inter font-semibold text-[16px] leading-[20px] text-white">
                  0
                </span>
                <span className="font-Inter font-bold text-[16px] leading-[28px] text-white">
                  USDC
                </span>
              </h3>
            </div>
          </div>
          <div className="bg-[#1E232E] rounded-[0px_0px_24px_24px] shadow-[0px_16px_16px_-1px_#00000014]   p-6 sm:p-[32px_32px_32px_32px]">
            <div className=" max-w-[245px] w-full bg-[#282F3E] py-[6px] px-[8px] rounded-xl flex items-center gap-[8px] ">
              <button onClick={() => setDeposit(true)} className={` ${deposit && "bg-blue_300"} w-[104px] flex gap-[12px] group hover:bg-blue_300 duration-300 items-center rounded-xl py-[8px] px-3  `}>
                <span className=" flex">
                  <DepositeIcon />
                </span>
                <span className=" font-Inter font-medium text-[14px] leading-[24px] text-[#C3C5C9] group-hover:text-white ">
                  Deposit
                </span>
              </button>
              <button onClick={() => setDeposit(false)} className={`${!deposit && "bg-blue_300"} flex w-[117px] gap-[12px] group hover:bg-blue_300 duration-300 items-center rounded-xl py-[8px] px-3  `}>
                <span className=" flex">
                  <WithdrawIcon />
                </span>
                <span className=" font-Inter font-medium text-[14px] leading-[24px] text-[#C3C5C9] group-hover:text-white ">
                  Withdraw
                </span>
              </button>
            </div>

            {deposit && <DepositForm params={params} publicKey={publicKey} />}
            
            <button className={`${typing === true ? "bg-bluelguana text-white" : ""}  w-full mt-[24px] rounded-xl py-[14px] px-[32px] bg-[#30353F] text-[#72767C] font-Inter font-medium text-[16px] leading-[28px] `}>
              {!deposit ? "Withdraw from vault" : "Deposit to vault"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositToVault;
