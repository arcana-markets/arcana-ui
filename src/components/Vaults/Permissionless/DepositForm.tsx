"use client";

import { InfoDeposit, TickIcon } from "@/components/common/Icons";
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useBalances } from '@/contexts/BalancesContext'; // Update this path
import userTokenBalanceStore from "@/stores/userTokenBalanceStore";
import { formatNumericValue } from "@/utils/numbers";

const DEVNET_USDC_MINT = new PublicKey('HrXSsRa3zKsAPNkdu9ZSsZvQXAfuZejvcCb2K3wox3Gz');
const DEVNET_PYTH_MINT = new PublicKey('FV6etEFawMhJrGB656y6Bb6vGfi7qicq6iNk6x86NFWT');

interface DepositFormProps {
  params: { arcVault: string };
  publicKey: PublicKey | null;
}

const DepositForm: React.FC<DepositFormProps> = ({ params, publicKey }) => {
  const [deposit, setDeposit] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const { fetchBalance, balances } = useBalances();
  const { connection } = useConnection();
  const wallet = useWallet();
  const [tokenBalances, setTokenBalances] = useState<{ usdc: number; pyth: number }>({ usdc: 0, pyth: 0 });
  // Modify the getUserTokenBalance function to return the token balance
// Modify the getUserTokenBalance function to accept the mint address as a parameter
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
    <div className="w-full">
      <div className=" sm:flex items-center w-full justify-between pt-[24px]">
        <h3 className=" font-Inter font-bold text-[16px] leading-[28px] text-white ">
          Enter deposit amounts:
        </h3>
        <div className="flex  gap-[8px]">
          <input
            type="checkbox"
            className="hidden"
          />
          <div
            className={`${
              deposit ? "border-bluelguana bg-bluelguana" : "border-colonyblue"
            } cursor-pointer w-6 h-6 border-[2px] rounded-lg  flex justify-center items-center`}
          >
            <span className={`${deposit ? "" : "opacity-0"}`}>
                <TickIcon/>
            </span>
          </div>
          <p className="flex  gap-[4px] items-center ">
            <span
              className="font-Inter cursor-pointer font-medium text-[16px] leading-[24px] text-white"
            >
              Single asset deposit?
            </span>
            <span className=" cursor-pointer">
              <InfoDeposit />
            </span>
          </p>
        </div>
      </div>
      <div className="mt-[17px] sm:flex gap-[24px]  justify-between  ">
        <div className={` ${deposit === true ? "w-full" : " max-w-[332px]"}  `}>
          <div className="pyth-box w-full flex justify-between items-center rounded-xl border-[1px] border-[#3C465D] py-[12px] px-[16px] ">
            <div className=" flex items-center justify-between w-full gap-[10px]">
              <Image
                src={
                  params.arcVault === "arcanum"
                    ? "/img/png/pyth.png"
                    : "/img/svg/btc.svg"
                }
                alt="pyth"
                width={32}
                height={32}
              />
              <h4 className=" font-Inter font-medium text-[16px]  leading-[28px] text-white ">
                {params.arcVault === "arcanum" ? "PYTH " : "BTC"}
              </h4>

              <input
                type="text"
                className={`${
                  deposit ? "w-full flex-grow" : " "
                } w-full  font-Inter bg-transparent outline-none text-end font-medium text-[20px] max-sm:w-full leading-[32px] text-foxflowerviola`}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="pt-[10px] flex justify-between items-center">
            <p>
              <span className=" font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px] text-colonyblue ">
                Balance:{" "}
              </span>{" "}
              <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
              {formatNumericValue(tokenBalances.pyth)}
              </span>
              {deposit && (
                <>
                  <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
                    &nbsp; PYTH &nbsp; / &nbsp; 0
                  </span>
                </>
              )}
            </p>
            <div className=" flex gap-[8px]  items-center">
              <button className="half-btn w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                HALF
              </button>
              <button className="half-btn w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className={` ${deposit ? "hidden" : ""}    max-w-[332px]`}>
          <div className="pyth-box    w-full flex justify-between items-center rounded-xl border-[1px] border-[#3C465D] py-[12px] px-[16px] ">
            <div className=" flex items-center  gap-[10px]">
              <Image
                src={
                  params.arcVault === "arcanum"
                    ? "/img/png/usdc.png"
                    : "/img/svg/bonk.svg"
                }
                alt="pyth"
                width={32}
                height={32}
              />
              <h4 className=" font-Inter font-medium text-[16px]  leading-[28px] text-white ">
                {params.arcVault === "arcanum" ? "USDC " : "BONK"}
              </h4>
              <input
                onChange={() => setTyping(true)}
                type="text"
                className={`font-Inter max-sm: w-full bg-transparent outline-none text-end font-medium text-[20px]   leading-[32px] text-foxflowerviola`}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="pt-[10px] flex justify-between items-center">
            <p>
              <span className=" font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px] text-colonyblue ">
                Balance:{" "}
              </span>{" "}
              <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
              {formatNumericValue(tokenBalances.usdc)}
              </span>
            </p>
            <div className="flex gap-[8px]  items-center">
              <button className=" w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                HALF
              </button>
              <button className=" w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                MAX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;
