import React, { useState, useEffect } from 'react';
import * as Icons from "@/components/common/svg/Icons";
import { abbreviateAddress } from '@/utils/formatting';
import { Order } from '@/utils/types';
import arcanaStore from '@/stores/arcanaStore';
import { useInterval } from '@/hooks/useInterval';
import usePrevious from '@/hooks/usePrevious';
import { formatNumericValue } from '@/utils/numbers';

const MIN_PERCENT_THRESHOLD = 1;
const LOG_BASE = 1.5;
const SCALE_FACTOR = 2;

const getCumulativeOrders = (orders: Order[], _totalSize: number, orderType: 'bid' | 'ask'): Order[] => {
  const sortedOrders = orderType === 'bid'
    ? [...orders].sort((a, b) => b.price - a.price)
    : [...orders].sort((a, b) => a.price - b.price);

  const logScaledOrders = sortedOrders.map(order => ({
    ...order,
    logSize: (Math.log(order.size * SCALE_FACTOR + 1) / Math.log(LOG_BASE)) * SCALE_FACTOR
  }));
  const totalLogSize = logScaledOrders.reduce((acc, order) => acc + order.logSize, 0);
  return logScaledOrders.map(order => {
    let logSizePercent = (order.logSize / totalLogSize) * 200;
    logSizePercent = Math.max(logSizePercent, MIN_PERCENT_THRESHOLD);
    return {
      ...order,
      sizePercent: logSizePercent,
    };
  });
};

const OrderBook = () => {
  const { orderBookData, setOrderBook, marketId } = arcanaStore(state => state);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const prevOrderBookData = usePrevious(orderBookData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchOrderBook();
  }, [marketId]);

  const fetchOrderBook = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://prod.arcana.markets/api/openbookv2/markets/${marketId}/orders`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      
      const identities = data.identities || {};
      const processOrdersWithIdentities = (orders: any[]) => orders.map(order => ({
        ...order,
        identity: identities[order.trader]
      }));
      
      data.market.bidOrders = processOrdersWithIdentities(data.market.bidOrders);
      data.market.askOrders = processOrdersWithIdentities(data.market.askOrders);
      
      setOrderBook(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useInterval(() => {
    fetchOrderBook();
  }, 3000);

  function formatPriceWithSupSub(price: string) {
    const [integerPart, decimalPart] = price.split(".");
    if (!decimalPart) {
      return <>{integerPart}</>;
    }
  
    const firstNonZeroIndex = decimalPart.search(/[^0]/);
    if (firstNonZeroIndex === -1) {
      return <>{integerPart}.0<sup>{decimalPart.length}</sup></>;
    }
  
    const leadingZerosCount = firstNonZeroIndex;
    const significantDigits = decimalPart.substring(firstNonZeroIndex);
  
    return (
      <>
        {integerPart}.
        {leadingZerosCount > 0 ? <>0<sup>{leadingZerosCount}</sup></> : ''}
        {significantDigits}
      </>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const shouldFlashBuy = (currentOrder: Order, index: number) => {
    const previousOrders = prevOrderBookData?.market?.bidOrders;
    const previousOrder = previousOrders?.[index];
    return !previousOrder || currentOrder.size !== previousOrder.size ? 'green-flash' : '';
  };

  const shouldFlashSell = (currentOrder: Order, index: number) => {
    const previousOrders = prevOrderBookData?.market?.askOrders;
    const previousOrder = previousOrders?.[index];
    return !previousOrder || currentOrder.size !== previousOrder.size ? 'red-flash' : '';
  };

  const bidPrice = orderBookData?.market?.bidOrders[0]?.price;
  const askPrice = orderBookData?.market?.askOrders[0]?.price;
  const spread = bidPrice && askPrice ? askPrice - bidPrice : null;
  const percentSpread = spread && askPrice ? (spread / askPrice) * 100 : null;

  if (error) return <div>Error: {error}</div>;

  const { bidOrders, askOrders } = orderBookData?.market || { bidOrders: [], askOrders: [] };
  const { midpoint } = orderBookData || { midpoint: null };

  const totalBidSize = bidOrders.reduce((acc: any, order: { size: any; }) => acc + order.size, 0);
  const totalAskSize = askOrders.reduce((acc: any, order: { size: any; }) => acc + order.size, 0);

  const bidOrdersWithPercent = getCumulativeOrders(bidOrders, totalBidSize, 'bid');
  const askOrdersWithPercent = getCumulativeOrders(askOrders, totalAskSize, 'ask');      

  // Mapping of orders to rows with separate flash logic for buy and sell
  const rowsData = bidOrdersWithPercent.map((bidOrder, index) => {
    const askOrder = askOrdersWithPercent[index] || { trader: '', price: 0, size: 0, sizePercent: 0 };

    // Determine if flash class should be applied to each column separately
    const bidFlashClass = shouldFlashBuy(bidOrder, index);
    const askFlashClass = shouldFlashSell(askOrder, index);

    return { bid: bidOrder, ask: askOrder, bidFlashClass, askFlashClass };
  });

  // Filter rowsData based on search term
  const filteredRowsData = rowsData.filter((row) => {
    const bidMatch = row.bid.trader.toLowerCase().includes(searchTerm.toLowerCase());
    const askMatch = row.ask.trader.toLowerCase().includes(searchTerm.toLowerCase());        
    return bidMatch || askMatch;
  });

  return (
    <div className='h-full flex flex-col cursor-default gap-4 sm:gap-6 p-4 sm:p-6 cardShadowBor rounded-[16px] bg-[#152531] dark:bg-[#152531]'>
      {/* Conditional Error Message */}
      {error && (
        <div className='text-red-500 text-center'>
          {error}
        </div>
      )}
      {loading}
      <div className='w-full grid grid-cols-2 md:grid-cols-[2fr,1fr,1.5fr] gap-y-4'>
        <div className='flex justify-start items-center gap-1 order-1'>
          <p className='text-[20px] text-foreground-100 opacity-80'>
            Orderbook
          </p>
          <p className='text-[12px] text-green'>• Live</p>
        </div>
        <div className='w-full flex items-center order-2'>
          <div className='flex justify-center bg-foreground-800 dark:bg-[#012A36] rounded-[12px] py-[6px] px-[12px] items-center gap-1'>
            <Icons.arrowUp />
            <p className='text-[14px] text-green font-medium'>
              {midpoint ? formatPriceWithSupSub(formatNumericValue(midpoint, 4)) : ''}
            </p>
          </div>
        </div>
        <div className='w-full flex justify-end order-3 col-span-2 md:col-span-1'>
          <div className='flex relative justify-center items-center h-[40px] min-w-[229px]'>
            <input
              placeholder='Search address, .sol domain...'
              type='text'
              className='w-full h-full rounded-[12px] placeholder:opacity-30 text-foreground-100 opacity-90 orderBookSearchBg border-none focus:outline-none pl-7 pr-2'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className='absolute left-[10px]'>
              <Icons.search />
            </div>
          </div>
        </div>
      </div>
      {!error && (
        <div className='w-full overflow-auto hideScrollBar'>
          {/* table ==============>  */}
          {/* header --> */}
          <div className='w-full min-w-[750px] h-[40px] grid grid-cols-[1fr,4fr,1fr] border-b-[1px] borderColor'>
            {/* owner */}
            <p className='flex justify-start w-full text-[14px] font-medium text-foreground-100/50'>
              Owner
            </p>
            <div className='w-full grid grid-cols-[1fr,3.5fr,1fr] sm:grid-cols-[1fr,2fr,1fr]'>
              {/* size ---> */}
              <p className='flex justify-end w-full text-[14px] font-medium text-foreground-100/50'>
                Size
              </p>
              {/* price ---> */}
              <p className='flex justify-center w-full text-[14px] font-medium text-foreground-100/50'>
                Price
              </p>
              {/* size ---> */}
              <p className='flex justify-start w-full text-[14px] font-medium text-foreground-100/50'>
                Size
              </p>
            </div>
            {/* owner ---> */}
            <p className='flex justify-end w-full text-[14px] font-medium text-foreground-100/50'>
              Owner
            </p>
          </div>
          {/* rows */}
          <div className='w-full flex min-w-[750px] flex-col gap-[2px] max-h-[250px] sm:max-h-[350px] md:max-h-[480px] overflow-auto hideScrollBar'>
            {filteredRowsData.map((item, index) => (
              <div key={index} className={`w-full grid grid-cols-[1fr,4fr,1fr] min-h-[35px] justify-center items-center relative`}>
                {/* Bid Size percent bars with gradient */}
                <div
                  className={item.bidFlashClass}
                  style={{ 
                    width: `${item.bid.sizePercent}%`, 
                    background: `linear-gradient(to left, rgba(6, 214, 160, 0.5) 0%, rgba(6, 214, 160, 0.5) 50%, rgba(6, 214, 160, 0.2) 50%, rgba(6, 214, 160, 0.2) 100%)`,
                    height: '100%', 
                    position: 'absolute', 
                    right: '50%' 
                  }}
                ></div>
                {/* Ask Size percent bars with gradient */}
                <div
                  className={item.askFlashClass}
                  style={{ 
                    width: `${item.ask.sizePercent}%`, 
                    background: `linear-gradient(to right, rgba(239, 71, 111, 0.5) 0%, rgba(239, 71, 111, 0.5) 50%, rgba(239, 71, 111, 0.2) 50%, rgba(239, 71, 111, 0.2) 100%)`,
                    height: '100%', 
                    position: 'absolute', 
                    left: '50%' 
                  }}
                ></div>
                {/* Bid Order Display */}
                <p className='text-[14px] items-center w-full flex justify-start text-foreground-100 opacity-80 font-medium underline'>
                  <a href={`https://solscan.io/account/${item.bid.trader}`} target='_blank' rel='noopener noreferrer'>
                    {item.bid.identity ? item.bid.identity : abbreviateAddress(item.bid.trader, !!item.bid.identity)}
                  </a>
                </p>
                <div className='w-full h-full relative grid grid-cols-[1fr,3.5fr,1fr] sm:grid-cols-[1fr,2fr,1fr] z-20'>
                  {/* bid size */}
                  <p className='text-[14px] w-full items-center flex justify-end text-foreground-100 opacity-80 font-medium'>
                    {formatNumericValue(item.bid.size, 2)}
                  </p>
                  <div className='w-full grid grid-cols-2'>
                    {/* bid price */}
                    <p className='text-[14px] w-full flex justify-end items-center pr-1 text-foreground-100 font-medium'>
                      {formatPriceWithSupSub(formatNumericValue(item.bid.price, 4))}
                    </p>
                    {/* ask price */}
                    <p className='text-[14px] w-full flex items-center justify-start pl-1 text-foreground-100 font-medium'>
                      {formatPriceWithSupSub(formatNumericValue(item.ask.price, 4))}
                    </p>
                  </div>
                  {/* ask size */}
                  <p className='text-[14px] w-full flex justify-start items-center pl-1 text-foreground-100 opacity-80 font-medium'>
                    {formatNumericValue(item.ask.size, 2)}
                  </p>
                </div>
                {/* Similar logic for Ask Order Display */}
                <p className='text-[14px] w-full flex justify-end items-center text-foreground-100 opacity-80 font-medium underline'>
                  <a href={`https://solscan.io/account/${item.ask.trader}`} target='_blank' rel='noopener noreferrer'>
                    {item.ask.identity ? item.ask.identity : abbreviateAddress(item.ask.trader, !!item.ask.identity)}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Spread row fixed at the bottom */}
      <div className='w-full h-[40px] mt-auto bg-background-800 dark:bg-[#192431] rounded-[16px] flex justify-between items-center'>
        <p className='text-foreground-100 text-[14px] font-medium pl-4'>Spread</p>
        <p className='text-foreground-100 text-[14px] font-medium'>
          {percentSpread !== null ? percentSpread.toFixed(2) : '-'}%
        </p>
        <button className='flex justify-center h-full bg-background-900 dark:bg-[#012A36] px-2 rounded-[12px] items-center gap-1'>
          <p className='text-foreground-100 text-[14px] font-medium'>{spread !== null ? spread.toFixed(4) : '-'}</p>
          <Icons.arrowDown2 />
        </button>
      </div>
    </div>
  );
};

export default OrderBook;
