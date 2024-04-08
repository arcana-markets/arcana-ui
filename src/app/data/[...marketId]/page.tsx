'use client';

import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google'
import ComponentWrapper from '@/components/marketData/ComponentWrapper';
import CarouselSlider from '@/components/marketData/CarouselSlider';
import TradingChart from '@/components/marketData/TradingChart';
import MarketList from '@/components/marketData/MarketsList';
import OrderBook from '@/components/marketData/OrderBook';
import TradeHistory from '@/components/marketData/TradeHistory';
import MarketDepth from '@/components/marketData/MarketDepth';
import MarketInformation from '@/components/marketData/MarketInformation';
import AdditionalDetails from '@/components/marketData/AdditionalDetails';
import MarketsBar from '@/components/marketData/MarketsBar';
import Footer from '@/components/marketData/Footer';
import Navbar from '@/components/Shared/Navbar';
import '@/app/data/css/styles.css';

const Page = () => {
  return (
    <main className='w-full'>
     <GoogleAnalytics gaId="G-9PEVYHKFL5" />
      <Navbar />
      <CarouselSlider />
      <ComponentWrapper>
        <div className='w-full flex flex-col'>
          <div className='w-full grid grid-cols-1 lg:grid-cols-[1.9fr,1fr] lg:gap-0 gap-8 justify-center items-start py-2 sm:py-6'>
            <div className='w-full flex justify-center items-center'>
              <div className='w-full max-w-[700px] lg:max-w-none bg-transparent h-full'>
                <MarketsBar />
                <TradingChart />
              </div>
            </div>
            <div className='w-full flex justify-center items-center'>
              <MarketList />
            </div>
          </div>
          <div className='w-full grid grid-cols-1 xl:grid-cols-[1.9fr,1fr] gap-6 xl:gap-0 justify-center items-start pt-6 pb-10 sm:pb-10'>
            <OrderBook />
            <div className='w-full gap-y-4 gap-x-4 flex flex-col md:flex-row xl:flex-col'>
              <TradeHistory />
              <MarketDepth />
            </div>
          </div>
        </div>
      </ComponentWrapper>
      <div className='w-full bg-[#e0e0e0] dark:bg-[#01171E] py-6'>
        <ComponentWrapper>
          <div className='w-full grid gap-6 grid-cols-1 lg:grid-cols-2 py-3 items-start'>
            <MarketInformation />
            <AdditionalDetails />
          </div>
        </ComponentWrapper>
      </div>
      <Footer />
    </main>
  );
};

export default Page;