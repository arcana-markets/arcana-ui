"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icons from "@/app/data/svg/Icons";
import { FullMarketData } from "@/utils/types";
import arcanaStore from "@/stores/arcanaStore";
import { abbreviateAddressLonger } from "@/utils/formatting";
import { copyToClipboard } from "@/utils";
import Tooltip from "@/components/Shared/Tooltip";
import dayjs from 'dayjs';
import tokenMintsData from '@/config/token-mints.json';

interface TokenData {
  address: string;
  name: string;
  logo?: string;
  ticker?: string;
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

// Utility function to format large numbers into a more readable format
const formatSequenceNumber = (num: number): string => {
  const suffixes = ["", "K", "M", "B", "T"]; // Define suffixes for thousands, millions, billions, and trillions
  
  // Determine the appropriate suffix based on the length of the number
  const suffixIndex = Math.floor(Math.log10(num) / 3);
  const shortNum = num / Math.pow(10, suffixIndex * 3);
  
  // Return the formatted number with the appropriate suffix
  return shortNum.toFixed(2) + suffixes[suffixIndex];
};

// Example usage:
const sequenceNumber = 1234567890; // Example sequence number
const formattedSequenceNumber = formatSequenceNumber(sequenceNumber);
console.log(formattedSequenceNumber); // Output: "1.23B"


function unixTimestampToDateTime(unixTimestamp: number): string {
  // Convert Unix timestamp to milliseconds
  const milliseconds = unixTimestamp * 1000;
  
  // Use Day.js to format the date and time
  return dayjs(milliseconds).format('YYYY-MM-DD HH:mm:ss'); // Adjust the format as needed
}

const registrationTime: number = 1705132794; // Example registration time in Unix timestamp format
const formattedRegistrationTime = unixTimestampToDateTime(registrationTime); // Format the Unix timestamp
console.log(formattedRegistrationTime); // Output: Formatted date and time


const AdditionalDetails = () => {
  const [width] = useWindowSize();
  const { marketData }: FullMarketData | any = arcanaStore();
  const [tooltipVisibility, setTooltipVisibility] = useState<{ [key: string]: boolean }>({});

  const findTokenDataByAddress = (address: string, tokenMints: TokenData[]): { name: string, logo: string } => {
    const token = tokenMints.find(token => token.address === address);
    // Ensure a default logo is used if the found token does not have a logo or if no token is found
    const defaultLogo = '/icons/question-circle.svg'; // Adjust path as needed
    if (token) {
      return { 
        name: token.name, 
        logo: token.logo || defaultLogo, // Use the token logo if available, otherwise use the default logo
      };
    } else {
      return { 
        name: 'Unknown Token', 
        logo: defaultLogo, // Use the default logo for unknown tokens
      };
    }
  };
  
      
    const baseTokenData = findTokenDataByAddress(marketData?.market.baseMint, tokenMintsData);
    const quoteTokenData = findTokenDataByAddress(marketData?.market.quoteMint, tokenMintsData);

    const baseTokenName = baseTokenData.name;
    const quoteTokenName = quoteTokenData.name;

    const baseTokenLogo = baseTokenData.logo;
    const quoteTokenLogo = quoteTokenData.logo;

  const handleCopyClick = (marketId: string) => {
    const fullUrl = `https://app.arcana.markets/data/${marketId}`;
    copyToClipboard(fullUrl); 
    setTooltipVisibility(prev => ({ ...prev, [marketId]: true }));
    setTimeout(() => {
      setTooltipVisibility(prev => ({ ...prev, [marketId]: false }));
    }, 1000);
  };

  const renderDetails = () => {
    if (!marketData?.market) return null;
  
  const convertToUSDValue = (value: number, decimals: number): string => {
    const formattedValue = (value / Math.pow(10, decimals)).toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formattedValue;
  };

  const convertFeeToPercentage = (fee: number): string => {
    const percentage = fee / 10000;
    if (fee < 0) {
      return `${percentage}% (Taker fees to Maker)`;
    }
    return `${percentage}%`;
  };

  const details = [
    { name: "Base Decimals", value: marketData.market.baseDecimals, copyEnabled: false },
    { name: "Quote Decimals", value: marketData.market.quoteDecimals, copyEnabled: false },
    { name: "Quote Lot Size", value: marketData.market.quoteLotSize, copyEnabled: false },
    { name: "Base Lot Size", value: marketData.market.baseLotSize, copyEnabled: false },
    { name: "Time Expiry", value: marketData.market.timeExpiry, copyEnabled: false },
    { name: "Bump", value: marketData.market.bump, copyEnabled: false },
    { name: "Sequence Number", value: formatSequenceNumber(marketData.market.seqNum), copyEnabled: false },
    { name: "Max Staleness Slots", value: marketData.market.maxStalenessSlots, copyEnabled: false },
    { name: "Maker Fee", value: convertFeeToPercentage(marketData.market.makerFee), copyEnabled: false },
    { name: "Taker Fee", value: convertFeeToPercentage(marketData.market.takerFee), copyEnabled: false },
    { name: "Fees Accrued", value: convertToUSDValue(marketData.market.feesAccrued, marketData.market.quoteDecimals), copyEnabled: false },
    { name: "Fees to Referrers", value: convertToUSDValue(marketData.market.feesToReferrers, marketData.market.quoteDecimals), copyEnabled: false },
    { name: "Referrer Rebates Accrued", value: convertToUSDValue(marketData.market.referrerRebatesAccrued, marketData.market.quoteDecimals), copyEnabled: false },
    { name: "Fees Available", value: convertToUSDValue(marketData.market.feesAvailable, marketData.market.quoteDecimals), copyEnabled: false },
  ];

  return details.map((detail, index) => (
    <div key={index} className='w-full h-[45px] border-b-[1px] borderColor flex justify-between items-center'>
      <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
        {detail.name}
      </p>
      <div className='flex items-center gap-1'>
        <p className={`text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium ${detail.name === "Market Authority" ? 'text-[12px]' : 'text-[16px]'}`}>
          {detail.value}
        </p>
        {detail.copyEnabled && (
        <button onClick={() => handleCopyClick(detail.value)} className="flex items-center justify-center">
          {tooltipVisibility[detail.value] ? (
            <Tooltip content='Copied'>
              <Icons.copy />
            </Tooltip>
          ) : (
            <Icons.copy />
          )}
        </button>
      )}
      </div>
    </div>
  ));
};
  
  return (
    <div className='w-full flex justify-start items-center cursor-default'>
      <div className='w-full max-w-[607px] lg:max-w-[607px] h-fit flex flex-col bg-[#09303c] border-[1px] borderColor rounded-[16px]'>
        {/* Header */}
        <div className='w-full h-[60px] flex justify-start border-b-[1px] borderColor items-center px-4 sm:px-8'>
          <p className='text-[16px] sm:text-[20px] text-white dark:opacity-100 opacity-80 font-semibold'>
            Additional details
          </p>
        </div>
        {/* Base and Quote Deposits */}
        <div className='flex flex-row justify-start items-start px-4 sm:px-8 py-4 border-b-[1px] borderColor'>
          {/* Base deposits */}
          <div className='flex flex-col gap-2 mr-8'> {/* Added margin-right here */}
            <p className='text-[14px] text-white/50 font-medium'>
              Base deposits
            </p>
            <div className='flex gap-2 items-center'>
              <Image
                src={baseTokenLogo}
                alt={baseTokenName}
                width={32}
                height={32}
                className='object-fill'
              />
              <p className='dark:opacity-100 opacity-80 text-white text-[18px] sm:text-[24px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.baseDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.baseDecimals ?? 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>

            {/* Quote deposits */}
            <div className='flex flex-col gap-2 ml-8'>
              <p className='text-[14px] text-white/50 font-medium'>
              Quote deposits
            </p>
            <div className='flex gap-2 items-center'>
              <Image
                src={quoteTokenLogo}
                alt={quoteTokenName}
                width={32}
                height={32}
                className='object-fill'
              />
              <p className='text-foreground-100 dark:opacity-100 opacity-80 dark:text-white text-[18px] sm:text-[24px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.quoteDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.quoteDecimals ?? 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* Dynamic market details rendering */}
        <div className='w-full flex flex-col px-4 sm:px-8'>
          {renderDetails()}

          {/* Permalink section */}
          <div className='w-full h-[45px] flex justify-between items-center'>
            <p className='text-[14px] min-w-[120px] font-medium text-foreground-100 dark:opacity-100 opacity-80 dark:text-white'>
              Permalink
            </p>
            <div className='flex justify-center items-center gap-1'>
              <a 
                href={`https://app.arcana.markets/data/${marketData?.market.marketId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className='underline break-all text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                  https://app.arcana.markets/data/{abbreviateAddressLonger(marketData?.market.marketId)}
                </div>
              </a>
              {tooltipVisibility[marketData?.market.marketId] ? (
                <Tooltip content='Copied'>
                  <button onClick={() => handleCopyClick(marketData?.market.marketId)}>
                    <Icons.copy />
                  </button>
                </Tooltip>
              ) : (
                <button onClick={() => handleCopyClick(marketData?.market.marketId)}>
                  <Icons.copy />
                </button>
              )}
            </div>
          </div>

          {/* Tools section */}
          <div className='w-full pt-3 pb-4 flex justify-between items-center'>
            <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
              Tools
            </p>
            <div className='flex flex-wrap justify-end sm:justify-center items-center gap-2'>
              {/* Crank Market + List new Market */}
              <div className='flex justify-center items-center gap-3'>
                <div className='flex justify-center items-center bg-background-800 dark:bg-[#012A36] gap-1 py-2 px-3 rounded-[12px] cursor-not-allowed'>
                  <Icons.crank />
                  <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                    Crank Market
                  </p>
                </div>
              </div>
              <div className='flex justify-center items-center gap-3'>
              <div className='flex justify-center items-center bg-background-800 dark:bg-[#012A36] gap-1 py-2 px-3 rounded-[12px] cursor-not-allowed'>
                  <Icons.list />
                  <p className='text-[14px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium'>
                    Create Market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
