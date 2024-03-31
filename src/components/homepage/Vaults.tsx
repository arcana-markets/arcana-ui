"use client";
import {
  Arrows,
  FaceIcon,
  PlusIcon,
  SearchIcon,
  UpArrowIcon,
} from "@/components/common/Icons";
import Toggle from "@/components/common/Toogle";
import { useEffect, useState } from "react";
import VaultsTable from "./VaultsTable";

const Vaults = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setRotation(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-md:hidden">
      <div className="container flex flex-col items-center pt-10 sm:pt-[50px] pb-10 px-4 mx-auto">
        <h3 className="text-center text-white mb-4 font-medium text-2xl">
          Permissionless Vaults
        </h3>
        <div className="flex items-center gap-2 pr-4 pl-3 rounded-xl bg-[#012F3C]">
          <span
            className="inline-block"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <FaceIcon />
          </span>
          <p className="text-sm lg:text-base font-medium text-white">
            You can easily create permissionless{" "}
            <span className="max-lg:">vaults with Arcana’s Vault Engine.</span>
          </p>
          <button className="max-lg:my-1 whitespace-nowrap bg-[#023646] font-bold text-bluelguana px-5 py-[9px] hover:bg-bluelguana duration-300 hover:text-white rounded-xl ml-2">
            Create Vault
          </button>
          <span className="text-colonyblue text-base font-medium flex items-center gap-1 ml-2 cursor-pointer">
            Docs <UpArrowIcon />
          </span>
        </div>
      </div>
      <div className="bg-[#141820] py-6 mb-6">
        <div className="container flex items-center justify-between gap-6 px-4 mx-auto">
          <div className=" flex items-center gap-6">
            <div className="flex items-center gap-2 lg:gap-[9px] w-[175px] lg:w-[365px] rounded-xl border border-[#1a2431] bg-[#171e29] px-4 lg:pl-5 lg:pr-6">
              <span>
                <SearchIcon />
              </span>
              <input
                type="text"
                className="opacity-100 text-colonyblue w-full text-sm text-ellipsis font-medium bg-transparent placeholder:text-colonyblue outline-none py-3"
                placeholder="Search token ticker, address, pair, venue... "
              />
            </div>
            <div className="flex items-center gap-6">
              <Toggle ValIsChecked={false} lable="Unknown tokens" id="one" />
              <Toggle ValIsChecked={true} lable="Only my positions" id="two" />
            </div>
          </div>
          <button className="py-2 px-3 rounded-xl text-sm lg:text-base flex items-center gap-[6px] duration-300 hover:bg-[#023646] leading-6 bg-bluelguana text-white font-medium">
            <PlusIcon /> Create Vault
          </button>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="overflow-auto">
          <div className="w-full text-white min-w-[992px]">
            <div className="rounded-2xl w-full flex items-center text-right pb-10">
              <div className="text-left w-1/4">
                <p className="text-base whitespace-nowrap flex items-center gap-[2px] pl-4 font-medium text-colonyblue">
                  Vault <Arrows color="#63779C" />
                </p>
              </div>
              <div className="w-[calc(100%/9)]">
                <p className="text-base whitespace-nowrap justify-end flex items-center gap-[2px] font-medium text-white">
                  Your Liquidity
                  <Arrows color="#fff" />
                </p>
              </div>
              <div className="w-[calc(100%/9)]">
                <p className="text-base whitespace-nowrap justify-end flex items-center gap-[2px] font-medium text-colonyblue">
                  APY
                  <Arrows color="#63779C" />
                </p>
              </div>
              <div className="w-[calc(100%/9)]">
                <p className="text-base whitespace-nowrap justify-end flex items-center gap-[2px] font-medium text-colonyblue">
                  TVL
                  <Arrows color="#63779C" />
                </p>
              </div>
              <div className="w-[calc(100%/9)]">
                <p className="text-base whitespace-nowrap justify-end flex items-center gap-[2px] font-medium text-colonyblue">
                  7D Volume
                  <Arrows color="#63779C" />
                </p>
              </div>
              <div className="w-[calc(100%/9)]">
                <p className="text-base whitespace-nowrap justify-end flex items-center gap-[2px] font-medium text-colonyblue">
                  Venue
                </p>
              </div>
              <div className="w-1/4"></div>
            </div>
            <VaultsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaults;
