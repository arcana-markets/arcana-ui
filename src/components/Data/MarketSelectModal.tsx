'use client';

import React, { useEffect, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import arcanaStore from '@/stores/arcanaStore';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Shared/Modal';
import Link from 'next/link';
import { abbreviateAddressSmaller } from '@/utils/formatting';
import * as Icons from "@/components/common/svg/Icons";
import Tooltip from "@/components/Shared/Tooltip";
import { FullMarketData, TokenData } from "@/utils/types";
import CoinLogos from '../../config/logos.json';
import tokenMintsRawData from '@/config/token-mints.json';

type CoinLogosType = { [key: string]: string };
    const CoinLogosTyped: CoinLogosType = CoinLogos as CoinLogosType;
    let tokenMintsData: TokenData[] = tokenMintsRawData as TokenData[];
    try {
        tokenMintsData = require('@/config/token-mints.json');
    } catch (error) {
        tokenMintsData = [];
    }
    const tokenMintsData2: TokenData[] = require('@/config/token-mints2.json');
    const mergedTokenMintsData = [...tokenMintsData, ...tokenMintsData2];

const MarketSelectModal = () => {
  const router = useRouter();
  const { marketData }: FullMarketData | any = arcanaStore();
  const tokenMintsData: TokenData[] = tokenMintsRawData as TokenData[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [markets, setMarkets] = useState<TokenData[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<TokenData[]>([]);
  const {
    updateMarketId,
    initializeMarketIdFromURL,
    marketId,
    setMarketData,
    setTradeHistory,
    setOrderBook,
  } = arcanaStore((state) => state);
  const [selected, setSelected] = useState(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

    const baseTokenLogoURI = (address: string) => {
      if (tokenMintsData) {
      const baseTokenData = findTokenDataByAddress(address);
      return baseTokenData.logoURI || "/tokens/SOL.png";
      } else {
      const [baseToken, _] = marketData?.name ? marketData.name.split(/[-\/]/) : ["", ""];
      return CoinLogosTyped[baseToken] || "/tokens/SOL.png";
      }
  };

  const findTokenDataByAddress = (address: string): TokenData => {
  const defaultTokenData: TokenData = {
    address: '',
    name: 'Unknown Token',
    logoURI: '/icons/question-circle.svg',
    symbol: '',
    chainId: 0,
    decimals: 0,
    tags: [],
    extensions: {
      coingeckoId: undefined
    }
  };
  const token = mergedTokenMintsData.find((token: { address: string; }) => token.address === address);
  return token || defaultTokenData;
  };

  // Inside MarketSelectModal component
  useEffect(() => {
  initializeMarketIdFromURL();
}, [initializeMarketIdFromURL]);

  const fetchMarketData = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://prod.arcana.markets/api/openbookv2/markets/${marketId}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching market details:', error);
    }
  };

  const fetchTradeHistory = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://prod.arcana.markets/api/openbookv2/markets/${marketId}/trades`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trade history:', error);
    }
  };

  const fetchOrderBook = async (id: string) => {
    const marketId = id;
    try {
      const response = await fetch(
        `https://prod.arcana.markets/api/openbookv2/markets/${marketId}/orders`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order book:', error);
    }
  };
    // Handle search term changes
    useEffect(() => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = markets.filter(() =>
        marketData?.market.name.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredMarkets(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, markets]);
  
  useEffect(() => {
    fetch('https://prod.arcana.markets/api/openbookv2/markets')
      .then((response) => response.json())
      .then((data) => {
        setMarkets(data);
        const selectedMarket = data.find(
          (market: { market: { marketId: string } }) =>
            market.market.marketId === marketId
        );
        setSelected(selectedMarket || null);
      })
      .catch((error) => console.error('Error fetching markets:', error));
  }, [marketId]);

  // Other logic to handle market change
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleMarketSelect = (market: React.SetStateAction<null | any>) => {
    updateMarketId(market.market.marketId);
    // Directly navigate after updating the marketId
    router.push(`/data/${market.market.marketId}`);
    handleCloseModal();
};

  // const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setMarketId(event.target.value);
  // };

  useEffect(() => {
    const populateMarketDetails = async () => {
      const result = await fetchMarketData(marketId);
      const tradeHistory = await fetchTradeHistory(marketId);
      let orderBook = await fetchOrderBook(marketId);

      orderBook?.market?.bidOrders.sort((a: any, b: any) => b.price - a.price);
      orderBook?.market?.askOrders.sort((a: any, b: any) => a.price - b.price);

      setOrderBook(orderBook);
      setTradeHistory(tradeHistory?.trades || []);
      setMarketData(result);
    };
    populateMarketDetails();
  }, [marketId, setMarketData, setOrderBook, setTradeHistory]);

    const renderMarketOption = (marketData: any, context: 'button' | 'modal') => {
      const baseTokenData = findTokenDataByAddress(marketData?.market.baseMint);
      const quoteTokenData = findTokenDataByAddress(marketData?.market.quoteMint);

    // Extracted names, logos, and tickers
    const baseTokenName = baseTokenData.name;
    const quoteTokenName = quoteTokenData.name;
    const baseTokenTicker = baseTokenData.symbol;
    const quoteTokenTicker = quoteTokenData.symbol;
    const baseTokenLogo = baseTokenData.logoURI;
    const quoteTokenLogo = quoteTokenData.logoURI;

      const tooltipContent = (
        <Tooltip placement={'bottom'} content={marketData?.market.marketId}>
          <div className="flex gap-1 text-xs text-foreground-100 text-center cardShadowBor bg-[#09303c] dark:bg-[#09303c] z-50 opacity-70 rounded-[4px] px-2">
            {abbreviateAddressSmaller(marketData?.market.marketId)}
            <Link href={`https://solscan.io/account/${marketData?.market.marketId}`} target="_blank" rel="noopener noreferrer">
              <Icons.shareSmall/>
            </Link>
          </div>
        </Tooltip>
      );
    
      return (
        <div className={`flex ${context === 'button' ? 'button-container' : 'flex-row'} items-center justify-between p-1 w-full`}>
        {/* Market logos */}
        <div className='flex items-center'>
                  <img
                    src={baseTokenLogo}
                    alt={baseTokenName}
                    width={28}
                    height={28}
                    loading="lazy"
                    className='object-fill z-0'
                    style={{ borderRadius: '50%', objectFit: 'cover', width: '28px', height: '28px' }}
                  />  
                  <img
                    src={quoteTokenLogo}
                    alt={quoteTokenName}
                    width={28}
                    height={28}
                    loading="lazy"
                    className='object-fill -ml-2 z-0'
                    style={{ borderRadius: '50%', objectFit: 'cover', width: '28px', height: '28px' }}
                  />  
        </div>
          {/* Market name and Tooltip */}
          <div className={context === 'button' ? 'button-market-info' : ''}>
            <span className='text-md'>{baseTokenTicker}-{quoteTokenTicker}</span>
            {tooltipContent}
          </div>
          {/* Chevron icon */}
          <LuChevronDown className={`text-2xl ${context === 'button' ? 'button-chevron' : ''}`} />
        </div>
      );
    };
    

  return (
    <div className="relative cursor-pointer rounded-lg bg-background-100">
      <div 
        onClick={handleOpenModal} 
        className="hover:bg-[#09303c] rounded-lg px-1 flex justify-between items-center cursor-pointer" 
        style={{ width: '230px' }}
      >
        {selected && renderMarketOption(selected, 'button')}
        {!selected && <span>Select a Market</span>}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className='rounded-md bg-background-100 focus:outline-none sm:text-sm'>
          {/* Search bar */}
            <div className='text-xl text-center py-4 border-b-[1px] borderColor'>
            <input
              placeholder='Search by market name...'
              type='text'
              className='w-full rounded-md p-2 bg-background-100 focus:outline-none'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className='overflow-hidden py-4 text-left bg-background-200 min-h-[400px] max-h-[400px] sm:min-h-[500px] sm:max-h-[500px]'>
          {filteredMarkets.map((market, index) => (
          <div key={index} onClick={() => handleMarketSelect(market)} className="relative cursor-pointer select-none bg-background-300 hover:bg-background-100 p-3 pl-5 cardShadowBor rounded-lg mb-2">
          {renderMarketOption(market, 'modal')}
          </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
  
};

export default MarketSelectModal;