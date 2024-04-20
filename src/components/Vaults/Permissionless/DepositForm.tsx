"use client";

import { InfoDeposit, TickIcon } from "@/components/common/Icons";
import Image from "next/image";
import React, { useState } from "react";

const DepositForm = ({ params }: { params: { arcVault: string } }) => {
  const [deposit, setDeposit] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleDepositchange = () => {
    setDeposit(!deposit);

  };
  return (
    <div className="w-full">
      <div className=" sm:flex items-center w-full justify-between pt-[24px]">
        <h3 className=" font-Inter font-bold text-[16px] leading-[28px] text-white ">
          Enter deposit amounts:
        </h3>
        <div className="flex  gap-[8px]">
          <input
            type="checkbox"
            onChange={handleDepositchange}
            className="hidden"
          />
          <div
            onClick={handleDepositchange}
            className={`${
              deposit ? "border-bluelguana bg-bluelguana" : "border-colonyblue"
            } cursor-pointer w-6 h-6 border-[2px] rounded-lg  flex justify-center items-center`}
          >
            <span className={`${deposit ? "" : "opacity-0"}`}>
                <TickIcon/>
            </span>
          </div>
          <p className="flex  gap-[4px] items-center ">
            <span
              onClick={handleDepositchange}
              className="font-Inter cursor-pointer font-medium text-[16px] leading-[24px] text-white"
            >
              Single asset deposit?
            </span>
            <span className=" cursor-pointer">
              <InfoDeposit />
            </span>
          </p>
        </div>
      </div>
      <div className="mt-[17px] sm:flex gap-[24px]  justify-between  ">
        <div className={` ${deposit === true ? "w-full" : " max-w-[332px]"}  `}>
          <div className="pyth-box w-full flex justify-between items-center rounded-xl border-[1px] border-[#3C465D] py-[12px] px-[16px] ">
            <div className=" flex items-center justify-between w-full gap-[10px]">
              <Image
                src={
                  params.arcVault === "arcanum"
                    ? "/img/png/pyth.png"
                    : "/img/svg/btc.svg"
                }
                alt="pyth"
                width={32}
                height={32}
              />
              <h4 className=" font-Inter font-medium text-[16px]  leading-[28px] text-white ">
                {params.arcVault === "arcanum" ? "PYTH " : "BTC"}
              </h4>

              <input
                type="text"
                className={`${
                  deposit ? "w-full flex-grow" : " "
                } w-full  font-Inter bg-transparent outline-none text-end font-medium text-[20px] max-sm:w-full leading-[32px] text-foxflowerviola`}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="pt-[10px] flex justify-between items-center">
            <p>
              <span className=" font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px] text-colonyblue ">
                Balance:{" "}
              </span>{" "}
              <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
                0
              </span>
              {deposit && (
                <>
                  <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
                    &nbsp; PYTH &nbsp; / &nbsp; 0
                  </span>
                </>
              )}
            </p>
            <div className=" flex gap-[8px]  items-center">
              <button className="half-btn w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                HALF
              </button>
              <button className="half-btn w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className={` ${deposit ? "hidden" : ""}    max-w-[332px]`}>
          <div className="pyth-box    w-full flex justify-between items-center rounded-xl border-[1px] border-[#3C465D] py-[12px] px-[16px] ">
            <div className=" flex items-center  gap-[10px]">
              <Image
                src={
                  params.arcVault === "arcanum"
                    ? "/img/png/usdc.png"
                    : "/img/svg/bonk.svg"
                }
                alt="pyth"
                width={32}
                height={32}
              />
              <h4 className=" font-Inter font-medium text-[16px]  leading-[28px] text-white ">
                {params.arcVault === "arcanum" ? "USDC " : "BONK"}
              </h4>
              <input
                onChange={() => setTyping(true)}
                type="text"
                className={`font-Inter max-sm: w-full bg-transparent outline-none text-end font-medium text-[20px]   leading-[32px] text-foxflowerviola`}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="pt-[10px] flex justify-between items-center">
            <p>
              <span className=" font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px] text-colonyblue ">
                Balance:{" "}
              </span>{" "}
              <span className=" text-white font-inter font-medium text-[12px] leading-[16px] tracking-[0.2px]">
                0
              </span>
            </p>
            <div className="flex gap-[8px]  items-center">
              <button className=" w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                HALF
              </button>
              <button className=" w-[41px] bg-[#323B4D]  py-[2px] px-[6px] font-Inter font-medium text-[11px] leading-[20px] rounded-[6px] text-[#C6C8CD] ">
                MAX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;
