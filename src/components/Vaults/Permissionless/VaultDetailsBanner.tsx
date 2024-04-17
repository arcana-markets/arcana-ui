'use client';
import { InfoIcon, NextIcon } from "@/components/Shared/Icons";
import Image from "next/image";
import React from "react";
import Link from 'next/link';

interface VaultDetailsProps {
  params: { arcVault: keyof typeof vaultTypes };
}

interface VaultType {
  title: string;
  subtitle: string;
  bgImage: string;
  iconImage: string;
  bgClass: string;
  titleColor?: string;  // Make titleColor optional since aether uses titleClass instead
  titleClass?: string;  // Only used by aether for now
}

// Define a mapping for each vault type to its specific properties
const vaultTypes = {
  arcanum: {
    title: "Arcanum",
    subtitle: "PYTH / USDC",
    bgImage: "/img/png/hero-vector.png",
    iconImage: ["/tokens/pyth.png", "/img/svg/usdc.svg"],
    bgClass: "bg-gradient-radial-permissionless",
    titleColor: "#a1adc1", // Example color
  },
  augury: {
    title: "Augury",
    subtitle: "JUP / USDC",
    bgImage: "/img/svg/augury-bg.svg",
    iconImage: ["/img/png/juplogo.png", "/img/svg/usdc.svg"],
    bgClass: "bg-gradient-radial-permissionless-yellow",
    titleColor: "#ffd166", // Example color
  },
  aether: {
    title: "Aether",
    subtitle: "JTO / USDC",
    bgImage: "/img/svg/aether-bg.svg",
    iconImage: ["/tokens/jto.png", "/img/svg/usdc.svg"],
    bgClass: "bg-gradient-radial-permissionless-blue", // Assuming a blue gradient
    titleColor: "#ffd166", // Example color
    titleClass: "bg-clip-text text-transparent bg-aether", // Specific class for red title color
  },
  permissionless: {
    title: "Permissionless Vault",
    subtitle: "Generic / USDC",
    bgImage: "/img/svg/permissionless-bg.svg",
    iconImage: "/img/svg/permissionless-icon.svg",
    bgClass: "bg-gradient-radial-permissionless-generic", // Assuming a generic gradient
    titleColor: "#ffd166", // Example color
  },
};

const VaultDetailsBanner = ({ params }) => {
  const { arcVault } = params;
  const vault = vaultTypes[arcVault] || vaultTypes.permissionless; // Fallback to permissionless details

  return (
    <div className="w-full">
      <Image
        className={`w-[1000px] h-[500px] absolute top-0 -left-[25%] blend-exclusion ${vault.bgClass}`}
        width={104}
        height={64}
        src={vault.bgImage}
        alt={vault.title}
      />
      <Link href="/" passHref>
        <div className="text-[#a1adc1] bg-[#161A22] text-center font-medium py-1 text-sm sm:hidden relative z-10 my-5 block cursor-pointer">
            ← Go back to vaults overview
        </div>
      </Link>
      <div className="container relative z-10 xl:max-w-[1140px] w-full px-4 mx-auto sm:pt-9 pb-10 text-white">
        <div className="flex justify-between items-center">
          <div>
          <h1 className={`font-poppins font-semibold text-3xl sm:text-5xl sm:pb-4 ${vault.titleClass || ''}`} 
              style={{ color: vault.titleColor }}>
            {vault.title}
          </h1>
            <p className="max-sm:hidden text-foxflowerviola font-medium flex items-center cursor-pointer w-fit text-sm">
              Vaults <NextIcon /> {vault.title} <NextIcon /> 
              <span className="font-bold">{vault.subtitle}</span>
            </p>

    {/* Wrap the tokens, subtitle, and additional info in a div */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6">
      {/* Token images and subtitle */}
      <div className="flex items-center">
        <div className="flex -space-x-2"> {/* Adjust the space between tokens */}
          {vault.iconImage.map((imagePath, index) => (
            <Image
              key={index}
              className="w-10 h-10"
              width={40} // Ensure this matches your className or desired size
              height={40} // Ensure this matches your className or desired size
              src={imagePath}
              alt={`${vault.title} Token ${index + 1}`}
            />
          ))}
        </div>
        <h2 className="text-[28px] sm:text-[34px] font-semibold font-poppins pl-2"> {/* Add padding to separate subtitle from tokens */}
          {vault.subtitle}
        </h2>
      </div>
      {/* Additional info */}
      <div className="flex">
        <div className="py-2 px-3 ml-2 bg-daintree rounded-xl text-sm flex items-center gap-[10.5px]">
          <InfoIcon />
          <p>{vault.title}</p>
        </div>
        <div className="sm:hidden py-2 px-3 ml-2 bg-daintree rounded-xl text-sm flex items-center gap-[10.5px]">
          APY
          <p className="text-markergreen font-bold">0%</p>
        </div>
      </div>
    </div>
  </div>
  <div className="max-sm:hidden">
    <Image
      className=""
      width={384}
      height={105}
      src="/img/svg/apy.svg"
      alt="APY chart"
    />
  </div>
</div>
      </div>
    </div>
  );
};

export default VaultDetailsBanner;
