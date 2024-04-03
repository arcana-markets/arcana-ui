import Image from "next/image";
import React from "react";

type VaultData = {
  coinImg: string;
  baseVaultTicker: string;
  quoteVaultTicker: string;
  Liquidity: string | JSX.Element;
  APY: string;
  TVL: string;
  Volume: string;
  VenueImg: string;
  btnText: string;
};

interface VaultMobileListCardProps {
  obj: VaultData;
  id: number;
}

const VaultMobileListCard: React.FC<VaultMobileListCardProps> = ({
  obj,
  id,
}) => {
  return (
    <>
      <div className={`w-full px-4 pt-6 ${id < 3 && "bg-darkblack"}`}>
        <div className="flex items-center pb-4 justify-between">
          <div className="flex items-center gap-[10px]">
            <Image width={51} height={32} src={obj.coinImg} alt="logo" />
            <p className="text-base font-medium text-white">
              {obj.baseVaultTicker} <span className="text-foxflowerviola">/</span>{" "}
              {obj.quoteVaultTicker}
            </p>
          </div>
          <button
            className={`text-sm group-hover:!text-daintree group-hover:!bg-white duration-500 leading-6 text-white font-medium py-2 px-3 rounded-xl bg-[#1b1f2b] ${
              obj.btnText === "Deposit" && "!bg-[#171b25] !text-colonyblue"
            }`}
          >
            {obj.btnText}
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="vault-headings">
            Your Liquidity
          </p>
          <p
            className={`inline-block text-base font-medium text-colonyblue ${
              id <= 2 && "!text-white"
            }`}
          >
            {obj.Liquidity}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="vault-headings">
            APY
          </p>
          <p
            className={`inline-block text-base font-medium text-markergreen ${
              obj.APY === ">999%" && "!text-yellow"
            }`}
          >
            {obj.APY}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="vault-headings">
            TVL
          </p>
          <p className="inline-block text-base font-medium text-white">
            {obj.TVL}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="vault-headings">
            7D Vol
          </p>
          <p className="inline-block text-base font-medium text-white">
            {obj.Volume}
          </p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="vault-headings">
            Venue
          </p>
          <Image
            className="ml-auto"
            src={obj.VenueImg}
            alt="logo"
            width={32}
            height={32}
          />
        </div>
        <div className="w-full h-[1px] bg-bottom-border mt-4"></div>
      </div>
    </>
  );
};

export default VaultMobileListCard;
