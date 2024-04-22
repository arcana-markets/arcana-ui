import React from "react";
import * as Icons from "@/components/common/svg/Icons";
import { abbreviateAddressSmaller, abbreviateAddressSmallest } from "@/utils/formatting";
import { OpenBookTradeEvent } from "@/utils/types";
import arcanaStore from "@/stores/arcanaStore";
import Tooltip from "@/components/Shared/Tooltip";
import { useInterval } from "@/hooks/useInterval";
import { formatLargeSize, formatNumericValue } from "@/utils/numbers";

const formatDateFull = (timestamp: number): string => {
  return dayjs.unix(timestamp / 1000).format("YYYY-MM-DD dddd");
};

const formatTimestamp = (timestamp: number): string => {
  return dayjs.unix(timestamp / 1000).format("HH:mm:ss");
};

const dayjs = require("dayjs");
const timestamp = 1703879491;
const date = dayjs.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
console.log(date);

const TradeHistory = () => {
  const { tradeHistory, setTradeHistory, marketId } = arcanaStore((state) => state);

  const getHeaderStyle = (headerName: string) => {
    switch(headerName) {
      case `Price`:
        return "pl-8";
      case `Size`:
        return "pl-10";
      case `Maker`:
        return "pl-9"; 
      case `Taker`:
        return "pl-10";  
      case "Timestamp":
        return "pl-8"; 
      default:
        return "";
    }
  };

const fetchTradeHistory = async () => {
  try {
    const response = await fetch(`https://prod.arcana.markets/api/openbookv2/markets/${marketId}/trades`);
    const data = await response.json();
    if (Array.isArray(data)) { 
      setTradeHistory(data); 
    }
  } catch (error) {
    console.error('Error fetching trade history:', error);
  }
};

  useInterval(() => {
    fetchTradeHistory();
    console.log("Fetched new trade history data:");
  }, 3000);
  
  const renderTradeRow = (item: OpenBookTradeEvent | null, index: number) => {
    const rowBackground = index % 2 === 0
      ? "bg-background-800 dark:bg-[#012a36]"
      : "bg-background-900 dark:bg-[#09303c]";
  
    const priceColorStyle = item && item.takerSide === 0 
      ? { color: '#06D6A0', opacity: 0.8 } 
      : { color: '#EF476F', opacity: 0.7 }; 
  
    const sizeColorStyle = { color: '#FFFFFF', opacity: 1 }; 

    return (
      <div
        key={index}
        className={`w-full ${rowBackground} ${
          index + 1 === tradeHistory.length || !item
            ? "rounded-b-[1px]"
            : "border-b-[1px] borderColor"
        } h-[30px] grid grid-cols-5 sm:grid-cols-[1fr,0.5fr,1fr,0.8fr,1fr] justify-center items-center`}
      >
        {item ? (
          <>
            <div className="flex justify-center items-center">
              <p style={priceColorStyle} className="cursor-default text-[13px] text-foreground-100 dark:opacity-100 opacity-80 font-bold">
                {formatNumericValue(item.priceDouble)}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p style={sizeColorStyle} className='mr-2 cursor-default text-[13px] dark:opacity-100 opacity-80'>
              {formatLargeSize(item.quantityDouble)}
              </p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <p style={sizeColorStyle} className='cursor-default text-[13px] dark:opacity-100 opacity-80'>
              {abbreviateAddressSmallest(item.makerOwner)}
              </p>
              <a
                  href={`https://solscan.io/account/${item.makerOwner}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <button className='flex cursor-pointer items-center'>
                    <Tooltip placement={'top'} content={
                      <p className='text-[12px] cursor-default shiny-gradient-text text-foreground-100 dark:opacity-100 opacity-80 truncate'>
                        {`Maker: ${abbreviateAddressSmaller(item.makerOwner)}`}
                      </p>
                    }>
                      <Icons.userIcon ClassName='w-[10px] sm:w-[14px] h-[10px] sm:h-[14px] opacity-60 truncate'/>
                    </Tooltip>
                  </button>
                </a>
            </div>
            <div className="flex justify-center items-center gap-1">
              <p style={sizeColorStyle} className='cursor-default text-[13px] dark:opacity-100 opacity-80'>
              {abbreviateAddressSmallest(item.takerOwner)}
              </p>
              <a
                  href={`https://solscan.io/account/${item.takerOwner}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <button className='flex cursor-pointer items-center'>
                    <Tooltip placement={'top'} content={
                      <p className='text-[12px] cursor-default shiny-gradient-text2 text-foreground-100 dark:opacity-100 opacity-80 truncate'>
                        {`Taker: ${abbreviateAddressSmaller(item.takerOwner)}`}
                      </p>
                    }>
                      <Icons.userIcon2 ClassName='w-[10px] sm:w-[14px] h-[10px] sm:h-[14px] opacity-40 truncate'/>
                    </Tooltip>
                  </button>
                </a>
            </div>
            <div className='flex justify-center items-center overflow-hidden'>
              <div className='flex items-center'>
              <Tooltip placement={'top'} content={
                  <p className='text-[12px] cursor-default text-foreground-100 dark:opacity-100 opacity-80'>
                    {formatDateFull(item.timeStamp)}
                  </p>}>
                <p className='text-[13px] cursor-default shiny-gradient-text text-foreground-100 dark:opacity-100 opacity-80'>
                  {formatTimestamp(item.timeStamp)}
                </p>
                </Tooltip>
              </div>
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

  const historyTableHeader = [
    `Price`,
    `Size`,
    `Maker`,
    `Taker`,
    "Timestamp",
];

  return (
<div className='w-full flex justify-center items-center'>
<div className='h-[300px] sm:h-[340px] w-full max-w-[400px] flex flex-col items-center bg-background-900 dark:bg-background-100 cardShadowBor rounded-[16px]'>
    <div className='w-full flex flex-col items-start gap-3'>
              <div className='flex items-center justify-center gap-2 mt-5 mx-auto'>
          <p className='text-[20px] cursor-default text-white opacity-80 dark:opacity-100'>
            Recent trades
          </p>
          <p className='text-green cursor-default text-[12px] font-medium'>• Live</p>
        </div>
          <div className='w-full flex flex-col overflow-auto hideScrollBar'>
          <div className='w-full cursor-default h-[35px] grid grid-cols-6 sm:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr] items-center border-b-[1px] borderColor rounded-[16px]'>
            {historyTableHeader.map((item, index) => (
              <p
                key={index}
                className={`truncate-header  ${
                  item === "Times" ? "justify-end" : "justify-start"
                } text-[13px] font-medium capitalize text-foreground-100 opacity-50 items-center w-full ${getHeaderStyle(item)}`}
              >
                {item}
              </p>
            ))}
          </div>
            <div className='w-full overflow-auto hideScrollBar h-[180px] md:h-[235px] rounded-[16px] p-3'>
            {Array.isArray(tradeHistory) && tradeHistory.map((item, index) =>
        renderTradeRow(item, index)
        )}
        
              {Array.from(
                { length: Math.max(0, 6 - tradeHistory.length) },
                (_, index) => renderTradeRow(null, tradeHistory.length + index)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;