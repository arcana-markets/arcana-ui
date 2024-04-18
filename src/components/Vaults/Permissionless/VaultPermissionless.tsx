import React from "react";
import DepositToVault from "./DepositToVault";
import CoinMarketDetails from "./CoinMarketDetails";

const VaultPermissionless = ({
  params,
}: {
  params: { arcVault: string };
}) => {
  // Function to determine the background color based on the arcVault value
  const getBarColor = (arcVault: string) => {
    switch (arcVault) {
      case "arcanum":
        return "bg-[#5099CC]"; // Blue for Arcanum
      case "augury":
        return "bg-[#FFC53F]"; // Yellow for Augory
      case "aether":
        return "bg-[#EF476F]"; // Red for Aether
      default:
        return "bg-transparent"; // Default case if none of the above
    }
  };

  return (
    <div>
      <div
        className={`${getBarColor(params.arcVault)} h-[8px] w-full mt-5`}
      ></div>
      <div className="bg-[#11171D] relative z-10 ">
        <section className="container xl:max-w-[1140px] px-4 mx-auto sm:pt-9 z-[1] text-white">
          <div className="flex flex-row max-lg:flex-col justify-between my-[-12px] max-sm:gap-4 gap-6 sm:-mt-32">
            <DepositToVault params={params} />
            <CoinMarketDetails params={params} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default VaultPermissionless;
