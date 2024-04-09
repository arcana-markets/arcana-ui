'use client'
import { InfoIcon, NextIcon } from "@/components/Shared/Icons";
import Image from "next/image";
import React from "react";



const VaultDetailsBanner = ({ params }: {
  params: { arcVault: string }
}) => {

  return (
    <div className="w-full ">
      <Image
        className={`w-[1000px] h-[500px] absolute top-0 -left-[25%] blend-exclusion ${params.arcVault === "pyth-usdc" ? "" : "!w-full h-full -left-[35%] !-top-1/2"}`}
        width={104}
        height={64}
        src={params.arcVault === "pyth-usdc" ? "/img/png/hero-vector.png" : "/img/svg/btc-bg.svg"}
        alt="icon"
      />
      <div className={`w-[1000px] h-[1000px]  ${params.arcVault === "pyth-usdc" ? "bg-gradient-radial-permissionless" : "bg-gradient-radial-permissionless-yellow"} absolute -top-[30%] -left-[20%] z-0`}></div>

      <p className="text-[#a1adc1] bg-[#161A22] text-center font-medium py-1 text-sm sm:hidden relative z-10 my-5">	&lt;- Go back to vaults overview</p>
      <div className="container relative z-10 xl:max-w-[1140px] w-full px-4 mx-auto sm:pt-9 pb-10    text-white">
        <div className=" flex justify-between items-center">
          <div>
            <h1 className=" font-poppins font-semibold text-3xl sm:text-5xl text-[#ffd166] sm:pb-4">{params.arcVault === "pyth-usdc" ? "" : "Augury"}</h1>
            <p className="max-sm:hidden text-foxflowerviola font-medium flex items-center cursor-pointer w-fit text-sm">
              Vaults <NextIcon /> Permissionless <NextIcon />{" "}
              <span className=" font-bold"> {params.arcVault === "pyth-usdc" ? "PYTH/USDC" : "Augury"}</span>
            </p>
            <div className=" flex max-sm:flex-col sm:items-center gap-4 pt-6">
              <div className="flex  items-center gap-4">
                <Image
                  className="max-sm:w-[65px] max-sm:h-10 "
                  width={104}
                  height={64}
                  src={params.arcVault === "pyth-usdc" ? "/img/svg/pyth.svg" : "/img/svg/btc-bonk.svg"}
                  alt="icon"
                />
                <h2 className=" text-[28px] sm:text-[34px] font-semibold font-poppins">
                  {params.arcVault === "pyth-usdc" ? "PYTH / USDC " : "BTC / BONK "}
                </h2>
              </div>
              <div className=" flex  ">
                <div className=" py-2 px-3 ml-2 bg-daintree rounded-xl text-sm flex items-center gap-[10.5px]">
                  <InfoIcon />
                  <p>Permissionless Vault</p>
                </div>
                <div className="sm:hidden py-2 px-3 ml-2 bg-daintree rounded-xl text-sm flex items-center gap-[10.5px]">
                  APY
                  <p className=" text-markergreen font-bold">0%</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" max-sm:hidden">
            <Image
              className=" "
              width={384}
              height={105}
              src="/img/svg/apy.svg"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetailsBanner;
