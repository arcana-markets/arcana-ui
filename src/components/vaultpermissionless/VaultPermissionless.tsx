import React from "react";
import DepositToVault from "./DepositToVault";
import CoinMarketDetails from "./CoinMarketDetails";

const VaultPermissionless = ({
  params,
}: {
  params: { permission: string };
}) => {
  return (
    <div>
      <div
        className={`${
          params.permission === "pyth-usdc" ? "bg-transparent" : "bg-[#FFC53F]"
        } h-[8px] w-full  mt-5 `}
      ></div>
      <div className="bg-[#11171D] relative z-10 ">
        <section className="container xl:max-w-[1140px] px-4 mx-auto sm:pt-9 z-[1] text-white">
          <div className="flex flex-row  max-lg:flex-col justify-between my-[-12px] max-sm:gap-4 gap-6 sm:-mt-32">
            <DepositToVault params={params} />
            <CoinMarketDetails params={params} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default VaultPermissionless;
