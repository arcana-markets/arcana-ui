import React, { Fragment, useEffect, useState } from 'react';
import arcanaStore from '@/stores/arcanaStore';
import Image from 'next/image';
import { convertMakerVolumeToDecimal, formatCurrencyValue, formatNumericValue } from '@/utils/numbers';
import tokenMintsData from '@/config/token-mints.json';
import { useRouter } from 'next/navigation';

interface TokenData {
  address: string;
  name: string;
  logo?: string;
  ticker?: string;
}

export interface MarketData {
  marketPerformance: {
    current: number;
    minute30: number;
    hour1: number;
    hour4: number;
    hour24: number;
  };
  market: {
    marketId: string;
    name: string;
    baseMint: string;
    quoteMint: string;
    takerVolume: number;
    makerVolume: number;
  }
  midpoint: number;
  makerVolumeNormalized: number;
  takerVolumeNormalized: number;
  notionalVolume: number;
  notionalVolume24hour: number;
};

const MarketList = () => {
    const router = useRouter();
    const {
        updateMarketId,
      } = arcanaStore((state) => state);
      const [markets, setMarkets] = useState<MarketData[]>([]);
      const [activeOption, setActiveOption] = useState('Volume');
      const [timeLine, setTimeLine] = useState('24h'); // Default to 24h
      const timeLineData = ['1h', '4h', '24h'];
      const [priceChange, setPriceChange] = useState<number | null>(null);
      const [originalMarkets, setOriginalMarkets] = useState<MarketData[]>([]);
      const sortMarkets = (option: string, marketsData: MarketData[]) => {
        return option === 'Volume' 
          ? [...marketsData].sort((a, b) => b.notionalVolume24hour - a.notionalVolume24hour)
          : [...marketsData].sort((a, b) => b.marketPerformance.hour24 - a.marketPerformance.hour24);
      };

      const findTokenDataByAddress = (address: string): TokenData => {
        const defaultTokenData: TokenData = {
          address: '', // You can keep this empty or use a placeholder
          name: 'Unknown Token',
          logo: '/icons/question-circle.svg', // Default logo for unknown tokens
          // If you decide to make 'ticker' non-optional in the future, provide a default value here
          ticker: undefined,
        };
        const token = tokenMintsData.find(token => token.address === address);
        return token || defaultTokenData;
      };

      
      const getPerformanceDataAsNumber = (marketData: MarketData, timeLine: string): number => {
        switch (timeLine) {
          case '1h':
            return marketData.marketPerformance.hour1;
          case '4h':
            return marketData.marketPerformance.hour4;
          case '24h':
            return marketData.marketPerformance.hour24;
          default:
            return 0; // or return a suitable default value
        }
      };

      const getPerformanceData = (marketData: MarketData, timeLine: string) => {
        const performanceValue = getPerformanceDataAsNumber(marketData, timeLine);
        const formattedPerformance = formatNumericValue(performanceValue, 2, true);
        if (isNaN(parseFloat(formattedPerformance))) {
          return 'N/A';
        }
        let symbol = '';
        if (performanceValue > 0) {
          symbol = '+'; 
        }    
        return `${symbol}${formattedPerformance}%`;
    };

      const getPerformanceColor = (performance: number) => {
        if (performance > 0) {
          return 'text-success-100 font-bold'; 
        } else if (performance < 0) {
          return 'text-danger-100 font-bold'; 
        } else {
          return 'text-white font-bold'; 
        }
      };

      const getPriceChangeClassName = () => {
        if (priceChange === null || priceChange === 0) {
          return 'text-foreground-100';
        } else if (priceChange > 0) {
          return 'text-success-100'; 
        } else {
          return 'text-danger-100'; 
        }
      };

      useEffect(() => {
        fetch('https://prod.arcana.markets/api/openbookv2/markets')
          .then((response) => response.json())
          .then((data) => {
            setOriginalMarkets(data);
            const sortedData = sortMarkets(activeOption, data);
            setMarkets(sortedData);
          })
          .catch((error) => console.error('Error fetching markets:', error));
      }, [activeOption]);

      const handleMarketSelect = (market: MarketData) => {
        updateMarketId(market.market.marketId);
      router.push(`/data/${market.market.marketId}`);
      };

      useEffect(() => {
        console.log('Active Option Changed to:', activeOption);
      
        if (originalMarkets.length > 0) {
          const sortedMarkets = sortMarkets(activeOption, originalMarkets);
          setMarkets(sortedMarkets);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [activeOption]);
      
      const renderMarketOption = (marketData: MarketData) => {

        const baseTokenData = findTokenDataByAddress(marketData.market.baseMint);
        const performance = timeLine === '1h' ? marketData.marketPerformance.hour1
        : timeLine === '4h' ? marketData.marketPerformance.hour4
        : marketData.marketPerformance.hour24;
        const performanceColorClass = getPerformanceColor(performance); 
      
        return (
            <div
            key={marketData.market.marketId}
            onClick={() => handleMarketSelect(marketData)}
            className="grid grid-cols-4 relative cursor-pointer select-none bg-background-300 hover:bg-background-100 p-2 pl-3 cardShadowBor rounded-lg mb-2 "
            >
            {marketData ? (
              <>
                <div className="flex justify-start items-center gap-1">
                {baseTokenData.logo && (
                <Image src={baseTokenData.logo} alt={baseTokenData.name} width={20} height={20} className="object-fill z-0" />
                )}
                <span className='text-[13px]'>{baseTokenData.ticker}</span>
                </div>
                <div className="flex justify-start items-center ml-5 dark:opacity-80 opacity-80">
                <p className={`text-[12px] sm:text-[13px] font-medium ${getPriceChangeClassName()}`}>
                ${marketData?.midpoint.toFixed(3)}
                </p>
                </div>
                <div className={`flex justify-end items-center mr-3`}>
                <p className={`text-[13px] cursor-default ${performanceColorClass}`}>
                    {marketData ? getPerformanceData(marketData, timeLine) : 'N/A'}
                  </p>
                </div>
                <div className='flex justify-end items-center overflow-hidden pr-1'>
                    <p className='text-[13px] cursor-default text-foreground-100 dark:opacity-100 opacity-80'>
                    {
                    formatCurrencyValue(
                      convertMakerVolumeToDecimal(marketData?.notionalVolume24hour).toFixed(2)
                    )
                  }                    
                  </p>
                </div>
              </>
            ) : (
              <React.Fragment>
                <div className='w-full flex justify-start items-center'></div>
                <div className='w-full text-[12px] text-foreground-100 dark:opacity-100 opacity-80 text-left'></div>
                <div className='w-full text-[12px] text-foreground-100 dark:opacity-100 opacity-80 text-left'></div>
                <div className='w-full text-[12px] text-foreground-100 dark:opacity-100 opacity-80 text-left'></div>
                <div className='w-full flex text-foreground-100 dark:opacity-100 opacity-80 gap-1 justify-start items-center'></div>
                <div className='w-full flex text-foreground-100 dark:opacity-100 opacity-80 gap-1 justify-end items-center'></div>
              </React.Fragment>
            )}
          </div>
        );
      };
  
    return (
        <div className='w-full max-w-[400px] h-[466px] flex flex-col cardShadow cardShadowBor rounded-[16px] pt-2 sm:pt-2 '>
        {/* Header Row containing Switch and Timeline Buttons */}
        <div className='flex justify-between items-center w-full px-5 py-3 '>
          {/* Switch for Volume and Gainers */}
          <div className='relative w-[174px] h-[40px]  rounded-[12px] bg-[rgba(41,45,63,0.32)]'>
            {/* Volume Button */}
            <button
              onClick={() => setActiveOption('Volume')}
              className={`absolute inset-y-0 left-0 w-[74px] flex justify-center items-center rounded-[12px] ${activeOption === 'Volume' ? 'bg-[#d7d5e914]' : 'bg-transparent'} text-[14px] font-medium px-[12px] leading-6`}
            >
              <span className={`${activeOption === 'Volume' ? 'text-[#FFFFFF]' : 'text-[rgba(255,255,255,0.32)]'}`}>Volume</span>
            </button>
            {/* Gainers Button */}
            <button
              onClick={() => setActiveOption('Gainers')}
              className={`absolute inset-y-0 right-0 w-[76px] flex justify-center items-center rounded-[12px] ${activeOption === 'Gainers' ? 'bg-[#d7d5e914]' : 'bg-transparent'} text-[14px] font-medium px-[12px] leading-6`}
            >
              <span className={`${activeOption === 'Gainers' ? 'text-[#FFFFFF]' : 'text-[rgba(255,255,255,0.32)]'}`}>Gainers</span>
            </button>
          </div>
          {/* Time Line Buttons */}
          <div className='flex justify-center items-center gap-3'>
            {timeLineData.map((item, index) => (
              <button
                onClick={() => setTimeLine(item)}
                key={index}
                className={`text-[12px] ${timeLine === item ? 'bg-white text-black' : 'timeLine text-white'} font-medium uppercase py-[2px] px-[12px] rounded-[12px]`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      {/* header ---->  */}
      <div className='w-full flex grid grid-cols-4 bg-[#012630] mt-1 py-2 items-center px-8'>
    <div className="text-white flex justify-start items-center overflow-hidden text-[12px]">Market</div>
    <div className="text-white flex justify-start items-center overflow-hidden ml-5 text-[12px]">Price</div>
    <div className="text-white flex justify-end items-center overflow-hidden mr-3 text-[12px]">Delta</div>
    <div className="text-white flex justify-end items-center overflow-hidden text-[12px]">Volume</div>
    </div>
      <div className='w-full flex justify-between items-center border-b-[1px] borderColor py-3 sm:py-5 px-3 sm:px-3'>
            {/* Rows */}
            <div className='w-full overflow-auto text-white hideScrollBar h-[300px] md:h-[300px] rounded-[4px]'>
            {markets.map((market, index) => (
          <Fragment key={index}>
            {renderMarketOption(market)}
          </Fragment>
        ))}
            </div>
          </div>
      <div className='w-full py-3 sm:py-2 rounded-b-[16px] text-[12px] sm:text-[14px] dark:text-foreground-100 text-foreground-900 font-medium bg-[#012630] flex justify-center items-center gap-1'>
      </div>
    </div>
  );
};

export default MarketList;