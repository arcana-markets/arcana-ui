"use client";
import Image from "next/image";
import React, { useState } from "react";

const TopVaults = () => {
  const [first, setFirst] = useState(true);

  return (
    <div className="bg-top-vault relative max-md:hidden">
      <Image
        width={26}
        height={16}
        src="/img/svg/bg-vector.svg"
        alt="icon"
        className=" absolute h-full w-[400px] left-0"
      />
      <Image
        width={26}
        height={16}
        src="/img/svg/Vector2.svg"
        alt="icon"
        className=" absolute h-full w-[400px] right-0"
      />
      <div className="container  relative z-10 flex flex-col xl:flex-row items-center justify-center pt-10   pb-10 px-4 mx-auto">
        <div className="flex  items-center justify-center">
          <p className=" text-foxflowerviola font-poppins">Top vaults by</p>
          <p className="px-3 py-2 ml-6 bg-bluelguana rounded-xl text-white cursor-pointer">
            APY
          </p>
          <p
            onClick={() => setFirst(true)}
            className={` ${
              !first ? "" : "hidden"
            } px-3 py-2 ml-2  bg-bluelguana rounded-xl text-white cursor-pointer`}
          >
            <span>TVL</span>
          </p>
          <div className="px-3 relative group duration-300 py-2 ml-2 bg-[#142531]    rounded-xl text-white hover:rounded-br-none hover:rounded-bl-none flex gap-1 cursor-pointer">
            <Image
              width={26}
              height={16}
              src="/img/svg/jlp.svg"
              alt="jlp"
              className="max-sm:!max-w-11"
            />
            <span>BONK/USDC</span>
            <div className="p-[6px] bg-[#1C1F2A] rounded-br-2xl rounded-bl-2xl duration-500 absolute w-full left-0 -bottom-[60px] pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100">
              <div className="flex items-center justify-center gap-[13px]">
                <p className="text-foxflowerviola text-base font-medium leading-7">
                  7D
                </p>
                <p className="text-markergreen text-base font-bold leading-7">
                  215.24%
                </p>
              </div>
              <button className="text-white text-[10px] font-medium tracking-[0.2px] w-full text-center p-[2px] rounded-md bg-daintree duration-300 hover:bg-white hover:text-daintree">
                Open Vault
              </button>
            </div>
          </div>
          <div className="px-3 py-2 ml-1 bg-[#142531] group duration-300  relative hover:rounded-br-none hover:rounded-bl-none rounded-xl text-white flex gap-1 cursor-pointer">
            <Image
              width={26}
              height={16}
              src={` ${!first ? "/img/svg/jto-usdc.svg" : "/img/svg/jto.svg"}`}
              alt="icon"
              className="max-sm:!max-w-11"
            />
            <span> {!first ? "JTO/USDC" : "PYTH / USDC"}</span>
            <div className="p-[6px] bg-[#1C1F2A] rounded-br-2xl rounded-bl-2xl duration-500 absolute w-full left-0 -bottom-[60px] pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100">
              <div className="flex items-center justify-center gap-[13px]">
                <p className="text-foxflowerviola text-base font-medium leading-7">
                  7D
                </p>
                <p className="text-markergreen text-base font-bold leading-7">
                  215.24%
                </p>
              </div>
              <button className="text-white text-[10px] font-medium tracking-[0.2px] w-full text-center p-[2px] rounded-md bg-daintree duration-300 hover:bg-white hover:text-daintree">
                Open Vault
              </button>
            </div>
          </div>
          <div className="px-3 py-2 ml-1 bg-[#142531] group duration-300  relative hover:rounded-br-none hover:rounded-bl-none rounded-xl text-white flex gap-1 cursor-pointer">
            <Image
              width={26}
              height={16}
              src="/img/svg/sol.svg"
              alt="icon"
              className="max-sm:!max-w-11"
            />
            <span>SOL/mSOL</span>
            <div className="p-[6px] bg-[#1C1F2A] rounded-br-2xl rounded-bl-2xl duration-500 absolute w-full left-0 -bottom-[60px] pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100">
              <div className="flex items-center justify-center gap-[13px]">
                <p className="text-foxflowerviola text-base font-medium leading-7">
                  7D
                </p>
                <p className="text-markergreen text-base font-bold leading-7">
                  215.24%
                </p>
              </div>
              <button className="text-white text-[10px] font-medium tracking-[0.2px] w-full text-center p-[2px] rounded-md bg-daintree duration-300 hover:bg-white hover:text-daintree">
                Open Vault
              </button>
            </div>
          </div>
        </div>
        <div className="w-[2px] h-[22px] max-xl:hidden rounded-[27px] bg-daintree mx-4"></div>
        <div className="flex  items-center justify-center max-lg:mt-2">
          <p
            onClick={() => setFirst(false)}
            className={` ${
              !first ? "hidden" : ""
            } px-3 py-2  bg-daintree rounded-xl text-foxflowerviola cursor-pointer`}
          >
            <span>TVL</span>
          </p>
          <p className="px-3 py-2 ml-2 bg-daintree rounded-xl text-foxflowerviola cursor-pointer">
            <span>24h Gainers</span>
          </p>
          <p className="px-3 py-2 ml-2 bg-daintree rounded-xl text-foxflowerviola cursor-pointer">
            <span>24h Inflow</span>
          </p>
          <p className="px-3 py-2 ml-2 bg-daintree rounded-xl text-foxflowerviola cursor-pointer">
            <span>Boosted</span>
          </p>
          <div className="w-[2px] h-[22px] rounded-[27px] bg-daintree mx-4"></div>
          <p className="text-white cursor-pointer">
            <span>see rankings --&gt;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopVaults;
