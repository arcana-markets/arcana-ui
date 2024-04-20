import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuClipboardCopy } from 'react-icons/lu';
import Tooltip from "@/components/Shared/Tooltip";
import { copyToClipboard } from '../../utils';
import { CarouselCardProps } from '@/utils/types';
import tokenMintsData from '@/config/token-mints.json'; 

interface TokenData {
  address: string;
  name: string;
  logo?: string;
  ticker?: string;
}

const findTokenDataByAddress = (address: string, tokenMints: TokenData[]): { name: string, logo: string, ticker?: string } => {
  const token = tokenMints.find(token => token.address === address);
  if (token) {
    return {
      name: token.name,
      logo: token.logo || '/icons/question-circle.svg',
      ticker: token.ticker || 'N/A',
    };
  } else {
    return {       
    name: 'Unknown Token',
    logo: '/icons/question-circle.svg',
    ticker: 'N/A',
  };
  }
};

const CarouselCard: React.FC<CarouselCardProps> = ({ item, onCardClick }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const [priceChange, setPriceChange] = useState<number | null>(null);

  useEffect(() => {
    if (item.marketPerformance && typeof item.marketPerformance.hour24 === 'number') {
      setPriceChange(item.marketPerformance.hour24);
    } else {
      // Handle the case where hour24 is not a number
      console.error('hour24 is not a number:', item.marketPerformance.hour24);
      setPriceChange(null); // Reset or handle as needed
    }
  }, [item.marketPerformance]);
  

  const totalVolume = (item.market.takerVolume + item.market.makerVolume) / Math.pow(10, item.market.quoteDecimals);
  const formattedTotalVolume = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalVolume);
  const tooltipText = `Taker Volume: ${(item.market.takerVolume / Math.pow(10, item.market.quoteDecimals)).toFixed(2)}, Maker Volume: ${(item.market.makerVolume / Math.pow(10, item.market.quoteDecimals)).toFixed(2)}`;

  const baseTokenData = findTokenDataByAddress(item.market.baseMint, tokenMintsData);
  const quoteTokenData = findTokenDataByAddress(item.market.quoteMint, tokenMintsData);

  const handleCopyClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Prevents click event from bubbling up to parent elements
    copyToClipboard(item.market.marketId);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000);
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

  return (
    <div
      className='w-[250px] sm:w-[330px] flex cursor-pointer justify-between items-start ml-3 bg-background-900 dark:bg-background-100 cardShadowBor px-4 py-2 sm:py-3 rounded-[16px]'
      onClick={() => onCardClick(item.market.marketId)}>
      {/* Left Section */}
      <div className='flex flex-col gap-2'>
        <div className='flex justify-center items-center cursor-pointer' onClick={() => onCardClick(item.market.marketId)}>
        <Image src={baseTokenData.logo} alt={baseTokenData.name} width={24} height={24} className='object-fill z-10' />
          <Image src={quoteTokenData.logo} alt={quoteTokenData.name} width={24} height={24} className='object-fill -ml-3 z-0' />
          <p className='text-[12px] sm:text-[14px] text-foreground-100 font-medium ml-2'>{`${baseTokenData.ticker} / ${quoteTokenData.ticker}`}</p>
        </div>
        <p className={`text-[12px] sm:text-[20px] font-medium ${getPriceChangeClassName()}`}>$ {item.midpoint.toFixed(2)}</p>
        <Tooltip content={tooltipText} placement="bottom">
          <p className='text-[12px] sm:text-[12px] text-foreground-100 font-medium opacity-25'>Vol ${formattedTotalVolume}</p>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className='flex items-end flex-col gap-3'>
        <p className='text-[10px] sm:text-[12px] text-foreground-100 font-medium py-[2px] px-[12px] timeLine rounded-[12px]'>24H</p>
        <p className={`text-[12px] sm:text-[14px] font-medium ${getPriceChangeClassName()}`}>{priceChange?.toFixed(2) ?? '0.00'}%</p>
        <div className='flex items-center justify-end'>
          <Tooltip content={showCopiedTooltip ? 'Copied' : 'Copy Market ID'}>
          <button onClick={(event) => handleCopyClick(event)} className='flex text-[12px] sm:text-[12px] text-foreground-100 font-medium'>
            {item.market.marketId.substring(0, 6)}...{item.market.marketId.slice(-4)}
            <LuClipboardCopy className={`ml-2 h-4 w-4 ${showCopiedTooltip ? 'animate-copied' : ''}`} />
          </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
