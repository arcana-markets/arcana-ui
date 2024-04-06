"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Sliders from "react-slick";
import Link from 'next/link';
import FirstCard from "./HeroCards/FirstCard";
import Augury from "./HeroCards/Augury";
import Aether from "./HeroCards/Aether";

const HeroSection = () => {
  const [progress, setProgress] = useState(75);
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="container px-4 mx-auto pt-4 sm:pt-9 pb-10 z-[1] relative">
      <h1 className="text-center font-poppins bg-clip-text text-transparent bg-hero-text font-semibold text-[32px] sm:text-3xl md:text-[40px] text-">
        Arcana Vaults
      </h1>
      <p className="text-white font-poppins text-center font-medium text-lg md:text-2xl">
        Building yield optimized strategies{" "}
        <span className="max-sm:d-block">for Solana DEXs.</span>
      </p>
      <Sliders {...settings}>
        <FirstCard />
        <Augury />
        <Aether />
      </Sliders>
    </div>
  );
};

export default HeroSection;
