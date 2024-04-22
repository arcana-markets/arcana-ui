import React from 'react';
import Image from 'next/image';
import CoinLogos from '../../config/logos.json';
import { FullMarketData, OrderBookData } from '@/utils/types';
import dynamic from 'next/dynamic';
import arcanaStore from '@/stores/arcanaStore';

type CoinLogosType = { [key: string]: string };
const CoinLogosTyped: CoinLogosType = CoinLogos as CoinLogosType;

const DepthChart = dynamic(() => import('./DepthChart'), { ssr: false });

const MarketDepth = () => {
  const { marketData }: FullMarketData | any = arcanaStore();
  const orderBookData: OrderBookData | any = marketData; // Adjust this line based on your actual data structure

  // Split the market name to get base and quote tokens
  // This regex will split the string on either a slash or a hyphen
  const [baseToken, quoteToken] = marketData?.market?.name
    ? marketData.market.name.split(/[-\/]/)
    : ["", ""];

  // Get the logos for base and quote tokens
  const baseTokenLogo = CoinLogosTyped[baseToken] || "/tokens/SOL.png";
  const quoteTokenLogo = CoinLogosTyped[quoteToken] || "/tokens/WUSDC.png";

return (
  <div className='w-full flex justify-center items-center'>
    <div className='h-[300px] sm:h-[340px] w-full marketDepthCon pt-4 flex flex-col justify-between items-center bg-background-300 dark:bg-background-100 cardShadowBor rounded-[16px]'>
      {/* coins -----> */}
      <div className='flex flex-col gap-4 w-full px-5 items-center'>
        <p className='text-[20px] text-white dark:opacity-100 opacity-80'>
          Market Depth
        </p>
        <div className='w-full flex justify-between items-center'>
          {/* coin 1 ---> */}
          <div className='flex justify-center text-foreground-100 dark:opacity-100 bg-foreground-900 dark:bg-[#09303c] py-[3px] px-[10px] rounded-[16px] items-center gap-1 cardShadowBor'>
            <Image
              src={quoteTokenLogo}
              alt='Quote Token'
              className='object-fill'
              width={16}
              height={16}
            />
              <p className='text-foreground-100 dark:opacity-100 opacity-80 dark:text-white text-[18px] sm:text-[12px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.quoteDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.quoteDecimals ?? 0)
                ).toFixed(2)}
              </p>
          </div>
          {/* coin 2 -->  */}
          <div className='flex justify-center bg-foreground-900 dark:bg-[#09303c] py-[3px] px-[10px] rounded-[16px] items-center gap-1 cardShadowBor'>
            <Image
              src={baseTokenLogo}
              alt='Base Token'
              className='object-fill'
              width={16}
              height={16}
            />
              <p className='text-foreground-100 dark:opacity-100 opacity-80 dark:text-white text-[18px] sm:text-[12px] font-semibold'>
                {/* Dynamic value from API */}
                {(
                  (marketData?.market?.baseDepositTotal ?? 0) /
                  Math.pow(10, marketData?.market?.baseDecimals ?? 0)
                ).toFixed(2)}
              </p>
          </div>
         </div>
        </div>
      <div className='w-full px-4 h-[70%] bg-transparent'>
      <DepthChart {...orderBookData} />
      </div>
    </div>
  </div>
);
};

export default MarketDepth;
