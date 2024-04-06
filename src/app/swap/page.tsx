'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Shared/Navbar';
import Image from 'next/image';
import HeroSwap from '@/components/Swap/HeroSwap';
import '@/app/globals.css';

const Page = () => {
  useEffect(() => {
    document.title = `Arcana | Swap `;
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      <div className="flex-grow">
        <div className="bg-[#0B0F13] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1234px] h-[834px]">
          <Image
            width="1234"
            height="834"
            className="absolute top-0 left-1/2 -translate-x-1/2"
            src="/img/png/hero-vector.png"
            alt="hero vector"
          />
        <div className="absolute -top-1/2 left-0 h-full right-0 w-[834px] rounded-full blur-[500px] bg-header_globe">
          </div>
          </div>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Navbar />
            <div className="flex-grow">
            <HeroSwap />
            <div className="flex justify-center w-full items-center"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
export default Page;
