import React from "react";
import Image from "next/image";

interface VaultProps {
  obj: any;
}

const VaultListItem = (props: VaultProps) => {
  const { obj } = props;

  return (
    <>
      <div className="py-2 border-b border-coarsewool">
        <div className="rounded-2xl w-full flex items-center text-right duration-500 group hover:bg-[#14161e]">
          <div className="text-left w-1/4">
            <div className=" flex gap-[10px] items-center ml-4">
              <Image width={51} height={32} src={obj.coinImg} alt="logo" />
              <p className="text-base font-medium text-white">
                {obj.Vault1} <span className="text-foxflowerviola">/</span>{" "}
                {obj.Vault2}
              </p>
            </div>
          </div>
          <div className="w-[calc(100%/9)]">
            <p className="inline-block text-colonyblue text-base font-medium">
              {obj.Liquidity}
            </p>
          </div>
          <div className="w-[calc(100%/9)]">
            <p className="text-base font-medium text-markergreen">{obj.APY}</p>
          </div>
          <div className="w-[calc(100%/9)]">
            <p className="text-base font-medium text-white">{obj.TVL}</p>
          </div>
          <div className="w-[calc(100%/9)]">
            <p className="text-base font-medium text-white">{obj.Volume}</p>
          </div>
          <div className="w-[calc(100%/9)]">
            <Image
              className="ml-auto"
              src={obj.VenueImg}
              alt="logo"
              width={20}
              height={24}
            />
          </div>
          <div className="w-1/4">
            <button
              className={`deposit-btn ${
                obj.btnText === "Deposit" && "!bg-[#171b25] !text-colonyblue"
              }`}
            >
              {obj.btnText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VaultListItem;
