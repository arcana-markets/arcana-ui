"use client";

import React from "react";
import SwapCard from "@/components/Vaults/HeroCards/SwapCard";
import '@/app/globals.css';

const HeroSwap = () => {

  return (
    <div className="px-4 mx-auto pt-4 sm:pt-9 pb-10 z-[1] relative">
      <h1 className="text-center font-poppins bg-clip-text text-transparent bg-hero-text font-semibold text-[32px] sm:text-3xl md:text-[40px] text-">
        Arcana Swap
      </h1>
        <SwapCard />
    </div>
  );
};

export default HeroSwap;
