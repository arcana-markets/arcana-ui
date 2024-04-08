import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FullMarketData } from '@/utils/types';
import tokenMintsData from '@/config/token-mints.json';
import { abbreviateAddressSmaller } from '@/utils/formatting';
import arcanaStore from '@/stores/arcanaStore';
import * as Icons from '@/app/data/svg/Icons';
import Link from 'next/link';
import Tooltip from '@/components/Shared/Tooltip';

interface TokenData {
    address: string;
    name: string;
    logo?: string;
    ticker?: string;
  }

const MarketSelectModal = dynamic(() => import('./MarketSelectModal'), { ssr: false });

const MarketsBar = () => {
    const { marketData }: FullMarketData | any = arcanaStore();

    const findTokenDataByAddress = (address: string, tokenMints: TokenData[]): { name: string, logo: string } => {
        const token = tokenMints.find(token => token.address === address);
        if (token) {
            return {
                name: token.name,
                logo: token.logo || '/icons/question-circle.svg', // Ensure logo is never undefined
            };
        } else {
            return {
                name: 'Unknown Token',
                logo: '/icons/question-circle.svg', // Default logo for unknown tokens
            };
        }
    };
            
          // Usage of the function to get both name and logo
          const baseTokenData = findTokenDataByAddress(marketData?.market.baseMint, tokenMintsData);
          const baseMint = marketData?.market.baseMint || '';
          const baseTokenName = baseTokenData.name;
          // Directly use the logo from the data returned by your function
          const baseTokenLogo = baseTokenData.logo;

    return (
    <div className="border-t border-l border-r p-2 mb-1 flex flex-col md:flex-row items-center cardShadowBor rounded-t-[16px] bg-[#012732]">
        <div className="flex flex-col justify-start items-start border-b md:border-b-0 md:border-r pr-1 borderColor w-full md:w-auto md:flex-basis[30%]">
        <div className="w-full">
            <div className="w-full">
                <MarketSelectModal />
            </div>
        </div>
        </div>
        <div className="flex flex-wrap justify-around items-center w-full mt-4 md:mt-0 md:flex-basis[70%]">
            <div className="flex flex-col items-center mb-4 md:mb-0">
                <div className="flex items-center">
                    <Image src={baseTokenLogo} alt={`${baseMint} logo`} width={22} height={22} />
                    <div className="ml-2">
                        <div className="text-sm font-bold text-foreground-100 cursor-default">{baseTokenName}</div>
                        <div className="flex cursor-help items-center">
                            <Tooltip placement={'bottom'} content={baseMint}>
                                <div className="flex text-xs mt-1 text-foreground-100 text-center cardShadowBor bg-[#09303c] z-10 opacity-70 rounded-[4px] px-2">
                                    {abbreviateAddressSmaller(baseMint || 'Base Mint')}
                                    <div className="ml-1">
                                        <a href={`https://solscan.io/token/${baseMint}`} target="_blank" rel="noopener noreferrer">
                                            <Icons.shareSmall/>
                                        </a>
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
                <div className="flex flex-col items-center cursor-default truncate">
                    <div className="text-xs text-foreground-100 opacity-50">Mark Price</div>
                    <div className='flex justify-center items-center gap-1'>
                    <p className='text-xs text-foreground-100 font-medium'>
                        {marketData?.midpoint?.toFixed(4)}
                    </p>
                </div>
                </div>
                <div className="flex flex-col items-center cursor-default">
                <div className="text-xs text-foreground-100">30m</div>
                <div className={`text-xs ${marketData?.marketPerformance?.minute30.toFixed(2) > 0 ? 'text-success-100' : marketData?.marketPerformance?.minute30.toFixed(2) < 0 ? 'text-danger-100' : 'text-foreground-100 opacity-50'}`}>
                    {marketData?.marketPerformance?.minute30.toFixed(2)}%
                </div>
            </div>
            <div className="flex flex-col items-center cursor-default">
                <div className="text-xs text-foreground-100">1h</div>
                <div className={`text-xs ${marketData?.marketPerformance?.hour1.toFixed(2) > 0 ? 'text-success-100' : marketData?.marketPerformance?.hour1.toFixed(2) < 0 ? 'text-danger-100' : 'text-foreground-100 opacity-50'}`}>
                    {marketData?.marketPerformance?.hour1.toFixed(2)}%
                </div>
            </div>
            <div className="flex flex-col items-center cursor-default">
                <div className="text-xs text-foreground-100">4h</div>
                <div className={`text-xs ${marketData?.marketPerformance?.hour4.toFixed(2) > 0 ? 'text-success-100' : marketData?.marketPerformance?.hour4.toFixed(2) < 0 ? 'text-danger-100' : 'text-foreground-100 opacity-50'}`}>
                    {marketData?.marketPerformance?.hour4.toFixed(2)}%
                </div>
            </div>
            <div className="flex flex-col items-center cursor-default">
                <div className="text-xs text-foreground-100">24h</div>
<div className={`text-xs ${
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
        </div>
    </div>
    );
};

export default MarketsBar;
