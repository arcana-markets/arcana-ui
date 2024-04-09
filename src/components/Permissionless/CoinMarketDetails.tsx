import { CoinFire, EyeIcon, OpenBook, RedirectIcon, WhaleIcon } from "@/common/Icons";
import Image from "next/image";
import React from "react";

const CoinMarketDetails = ({ params }: { params: { arcVault: string } }) => {
  return (
    <>
      <div className="w-1/2 max-lg:w-full">
        <div className="annual-card bg-[#1E232E]    shadow-[0px_16px_16px_-1px_#00000014] w-full rounded-[24px]  ">
          <div className="p-6 sm:p-[32px]">
            <div className=" flex justify-between">
              <div className=" flex flex-col">
                <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola ">
                  Annual Percentage Yield
                </p>
                <h2 className=" font-poppins font-semibold text-[28px] leading-[28px] mt-3 text-markergreen duration-300">
                  0%
                </h2>
              </div>
              <div className="w-[40px] h-[40px] bg-[#384257] rounded-[50%] flex justify-center items-center">
                <CoinFire />
              </div>
            </div>
            <div className=" pt-[24px]">
              <p className=" font-Inter  font-semibold text-[14px] leading-[20px] text-foxflowerviola ">
                Total Value Locked
              </p>
              <h2 className=" font-poppins text-white font-semibold text-[28px] leading-[28px] mt-3 hover:text-markergreen duration-300">
                $0
              </h2>
            </div>
            <div className="under_line w-full h-[1px] bg-[linear-gradient(90deg,#1E232E_0%,#3C465D_50%,#1E232E_100%)] mt-[24px]"></div>
            <div className=" pt-[24px] flex justify-between items-center">
              <button className=" w-[107px] p-[6px_8px] flex items-center bg-[#323B4D] rounded-[8px] text-white gap-[6px] font-Inter font-medium text-[14px] leading-[24px]">
                <span>
                  <Image
                    src={
                      params.arcVault === "arcanum"
                        ? "/img/png/pyth.png"
                        : "/img/svg/btc.svg"
                    }
                    alt="pyth"
                    width={24}
                    height={24}
                  />
                </span>
                <span className="flex-grow">
                  {params.arcVault === "arcanum" ? "PYTH " : "BTC"}
                </span>
                <span>
                  <RedirectIcon />
                </span>
              </button>
              <p className=" font-Inter font-medium text-[16px] leading-[28px] text-white">
                0
              </p>
            </div>
            <div className=" pt-[16px] flex justify-between items-center">
              <button className=" w-[107px] p-[6px_8px] flex items-center bg-[#323B4D] rounded-[8px] text-white gap-[6px] font-Inter font-medium text-[14px] leading-[24px]">
                <span>
                  <Image
                    src={
                      params.arcVault === "arcanum"
                        ? "/img/png/usdc.png"
                        : "/img/svg/bonk.svg"
                    }
                    alt="pyth"
                    width={24}
                    height={24}
                  />
                </span>
                <span>
                  {params.arcVault === "arcanum" ? "USDC " : "BONK"}
                </span>
                <span>
                  <RedirectIcon />
                </span>
              </button>
              <p className=" font-Inter font-medium text-[16px] leading-[28px] text-white">
                0
              </p>
            </div>
            <div className=" flex items-center justify-between w-full gap-[6px] pt-[20px]">
              <div className=" w-[63%] flex flex-col">
                <p className=" mb-[3px] font-Inter font-medium text-[14px] leading-[24px]  text-foxflowerviola">
                  PYTH <span className=" font-bold text-white">63%</span>
                </p>
                <div className="  w-full  h-[14px]  bg-bluelguana rounded-[4px]"></div>
              </div>
              <div className=" flex flex-col    w-[37%]">
                <p className=" mb-[3px] text-end font-Inter font-medium text-[14px] leading-[24px]  text-foxflowerviola">
                  {" "}
                  <span className=" font-bold text-white">37%</span>
                  USDC
                </p>
                <div className=" w-full h-[14px]  bg-[#29658E] rounded-[4px]"></div>
              </div>
            </div>
          </div>
          <div className="  bg-[#222834]   w-full rounded-[24px] p-[24px_32px_32px_32px] ">
            <div className=" flex justify-between items-center">
              <h3 className="  font-Inter font-bold text-[14px]  leading-[24px] text-foxflowerviola ">
                Market 24h Vol
              </h3>
              <p className="   font-Inter text-[14px]  leading-[24px] font-medium text-[#FFFFFF]  ">
                $0
              </p>
            </div>
            <div className=" flex justify-between items-center mt-[8px]">
              <h3 className="  font-Inter font-bold text-[14px]  leading-[24px] text-foxflowerviola ">
                Market 24h Fee
              </h3>
              <p className="   font-Inter text-[14px]  leading-[24px] font-medium text-[#FFFFFF]  ">
                $0
              </p>
            </div>
            {/* button_here */}
            <button className=" max-w-[300px] w-full py-[8px] bg-[#2C3444] rounded-xl  font-Inter font-medium text-[14px] leading-[24px]  flex   items-center  justify-center gap-[8.56px] mt-4 text-[#FFFFFF] ">
              <span>
                <EyeIcon />
              </span>
              See Market Details
            </button>
            <button className=" max-w-[300px] w-full py-[8px] bg-[#2C3444] rounded-xl  font-Inter font-medium text-[14px] leading-[24px]  flex   items-center  justify-center gap-[8.56px] mt-[8px] text-[#FFFFFF] ">
              <span>
                <OpenBook />
              </span>
              1jH8...Bj8H
              <span>
                <RedirectIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinMarketDetails;
