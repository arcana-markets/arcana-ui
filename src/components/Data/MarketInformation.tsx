import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icons from "@/components/common/svg/Icons";
import Link from "next/link";
import { FullMarketData } from "@/utils/types";
import arcanaStore from "@/stores/arcanaStore";
import { copyToClipboard } from "@/utils";
import Tooltip from "@/components/Shared/Tooltip";
import { abbreviateAddressLonger } from "@/utils/formatting";
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

const MarketInformation = () => {
  const [width] = useWindowSize();
  const isMobile = width <= 768; // or whatever breakpoint you choose for mobile
  const [priceChange] = useState<number | null>(null);
  const { marketData }: FullMarketData | any = arcanaStore();
  const [tooltipVisibility, setTooltipVisibility] = useState<{[key: string]: boolean}>({});

  const handleCopyClick = (value: string) => {
    // Copy the value to clipboard
    copyToClipboard(value);
    // Update tooltip visibility using the value as a unique identifier
    setTooltipVisibility(prevState => ({ ...prevState, [value]: true }));
    // Hide tooltip after a delay
    setTimeout(() => {
      setTooltipVisibility(prevState => ({ ...prevState, [value]: false }));
    }, 2000);
  };

  const getPriceChangeClassName = () =>
    priceChange === null || priceChange === 0
      ? "text-foreground-400"
      : priceChange > 0
      ? "text-success-100"
      : "text-danger-100";

      const findTokenDataByAddress = (address: string, tokenMints: TokenData[]): { name: string, logo: string, ticker?: string } => {
        const token = tokenMints.find(token => token.address === address);
        if (token) {
          // Ensure logo has a default value if undefined
          return { 
            name: token.name, 
            logo: token.logo || '/icons/question-circle.svg', // Provide a default logo
            ticker: token.ticker // ticker might be undefined, which is okay based on your interface
          };
        } else {
          return { name: 'Unknown Token', logo: '/icons/question-circle.svg' }; // Default for unknown tokens
        }
      };
      
      const baseTokenData = findTokenDataByAddress(marketData?.market.baseMint, tokenMintsData);
      const quoteTokenData = findTokenDataByAddress(marketData?.market.quoteMint, tokenMintsData);

    const baseTokenName = baseTokenData.name;
    const quoteTokenName = quoteTokenData.name;

    const baseTokenLink = marketData?.market?.baseMint ?? "defaultBaseMint";
    const quoteTokenLink = marketData?.market?.quoteMint ?? "defaultQuoteMint";

  const renderDetails = () => {
    if (!marketData) return null;

    const details = [
      { name: "Market ID", value: marketData.market.marketId },
      { name: "Base Mint", value: marketData.market.baseMint },
      { name: "Quote Mint", value: marketData.market.quoteMint },
      { name: "Bids", value: marketData.market.bids },
      { name: "Asks", value: marketData.market.asks },
      { name: "Event Queue", value: marketData.market.eventHeap },
      { name: "Base Vault", value: marketData.market.marketBaseVault },
      { name: "Quote Vault", value: marketData.market.marketQuoteVault },
      { name: "Market Authority", value: marketData.market.marketAuthority },
      { name: "Close Market Admin", value: marketData.market.closeMarketAdmin },
      { name: "Open Orders Admin", value: marketData.market.openOrdersAdmin },
      { name: "Consume Events Admin", value: marketData.market.consumeEventsAdmin },
      { name: "Collect Fee Admin", value: marketData.market.collectFeeAdmin },
      { name: "Oracle A", value: marketData.market.oracleA },
      { name: "Oracle B", value: marketData.market.oracleB },
    ];
    
    return details.map((detail, index) => (
      <div key={index} className="w-full h-[45px] border-b-[1px] borderColor flex justify-between items-center">
        <p className="text-[14px] font-medium text-foreground-100 dark:opacity-100 opacity-80 dark:text-white">
          {detail.name}
        </p>
        <div className="flex items-center gap-0.5">
          {detail.value === "11111111111111111111111111111111" ? (
            <Link
              href="https://explorer.solana.com/address/11111111111111111111111111111111"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium"
            >
              System Program
            </Link>
          ) : (
            <Link
              href={`https://solscan.io/account/${detail.value}`}
              className="underline break-all text-[12px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isMobile ? abbreviateAddressLonger(detail.value) : detail.value}
            </Link>
          )}
          {tooltipVisibility[detail.value] ? (
            <Tooltip content='Copied'>
              <button onClick={() => handleCopyClick(detail.value)}>
                <Icons.copy />
              </button>
            </Tooltip>
          ) : (
            <button onClick={() => handleCopyClick(detail.value)}>
              <Icons.copy />
            </button>
          )}
        </div>
      </div>
    ));
  };

  // Calculate and format total volume
  const totalVolume = marketData
    ? (marketData.market.takerVolume + marketData.market.makerVolume) /
      Math.pow(10, marketData.market.quoteDecimals)
    : 0;
  const formattedTotalVolume = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalVolume);

  return (
    <div className="w-full flex justify-center items-center cursor-default">
      <div className="w-full max-w-[600px] lg:max-w-[650px] flex flex-col bg-foreground-900 dark:bg-[#09303c] border-[1px] borderColor rounded-[16px] ">
        <div className="w-full h-[60px] flex justify-between items-center px-4 sm:px-8">
          <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-semibold">
            Market Information
          </p>
          <p className="text-[10px] sm:text-[16px] font-semibold text-white/50">
            MCAP
          </p>
        </div>
        {/* trade ---->   */}
        <div className="w-full bg-background-800 dark:bg-[#012A36] py-4 flex justify-between items-center border-b-[1px] borderColor px-4 sm:px-8">
          <p className="text-[14px] sm:text-[16px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
            Trade
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {tradeInCoin.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-background-900 dark:bg-[#E3DB680D] px-[5px] h-[25px] flex justify-center items-center rounded-[4px]"
                >
                  {index === 2 ? (
                    <Icons.prism />
                  ) : (
                    <Image
                      src={item.src}
                      alt="Image"
                      width={item.width}
                      height={19}
                      className="object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* stats ---> */}
        <div className="w-full bg-transparent flex flex-col gap-4 sm:gap-8 px-4 sm:px-8 py-4 border-b-[1px] borderColor">
          <div className="flex sm:gap-0 gap-3 justify-between items-start">
            {/* 24h High */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Price Midpoint
              </p>
              <p
                className={`text-[18px] sm:text-[24px] font-medium ${getPriceChangeClassName()}`}
              >
                $ {marketData?.midpoint.toFixed(4)}
              </p>
            </div>
            {/* 24h Low */}
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                24h Price Change
              </p>
              <div className={`text-[18px] sm:text-[24px] font-medium ${
                marketData?.marketPerformance?.hour24 > 0
                  ? 'text-success-100'
                  : marketData?.marketPerformance?.hour24 < 0
                  ? 'text-danger-100'
                  : 'text-foreground-100 opacity-50'
                  }`}>
                {typeof marketData?.marketPerformance?.hour24 === 'number' 
                  ? marketData.marketPerformance.hour24.toFixed(2)
                  : 'N/A'}%
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 items-start">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Total Volume
              </p>
              <p className="text-[18px] sm:text-[24px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-semibold">
                ${formattedTotalVolume}
              </p>
            </div>
          </div>
          {/* base token + quote token section */}
          <div className="w-full flex flex-wrap justify-start items-center gap-3 sm:gap-4">
            {/* Base Token */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Base token
              </p>
              <div className="flex items-center bg-background-800 dark:bg-[#012A36] py-[6px] px-[8px] rounded-[8px] gap-2">
              <Link
                  href={`https://solscan.io/account/${baseTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Image
                  src={baseTokenData.logo}
                  alt={baseTokenData.name}
                  width={32}
                  height={32}
                  className="object-fill"
                />
                </Link>
                <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
                <Link
                  href={`https://solscan.io/account/${baseTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {baseTokenName} {/* Display only the base token name */}
                </Link>
                </p>
                <Link
                  href={`https://solscan.io/account/${baseTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex justify-center items-center">
                    {" "}
                    {/* Flex container with center alignment */}
                    <Icons.share ClassName="w-[20px] h-[20px]" />
                  </button>
                </Link>
              </div>
            </div>
            {/* Quote Token */}
            <div className="flex flex-col items-center gap-2 ml-8">
              <p className="text-[12px] sm:text-[14px] text-white/50 font-medium">
                Quote token
              </p>
              <div className="flex items-center bg-background-800 dark:bg-[#012A36] py-[6px] px-[8px] rounded-[8px] gap-2">
              <Link
                  href={`https://solscan.io/account/${quoteTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Image
                  src={quoteTokenData.logo}
                  alt={quoteTokenData.name}
                  width={32}
                  height={32}
                  className="object-fill"
                />
                </Link>
                <p className="text-[16px] sm:text-[20px] text-foreground-100 dark:opacity-100 opacity-80 dark:text-white font-medium">
                <Link
                  href={`https://solscan.io/account/${quoteTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {quoteTokenName} {/* Display only the quote token name */}
                </Link>
                </p>
                <Link
                  href={`https://solscan.io/account/${quoteTokenLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex justify-center items-center">
                    {" "}
                    {/* Flex container with center alignment */}
                    <Icons.share ClassName="w-[20px] h-[20px]" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* links ---->  */}
        <div className="w-full flex flex-col py-4 px-4 sm:px-8">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
};

const tradeInCoin = [
  {
    src: "/assets/openBook.svg",
    width: 100,
  },
];

export default MarketInformation;