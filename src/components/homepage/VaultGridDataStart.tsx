import React from "react";
import { vaultsData } from "@/components/common/Helper";
import VaultMobileListCard from "./VaultMobileListCard";

const VaultGridDataStart = () => {
  return (
    <div className="grid sm:grid-cols-2">
      {vaultsData.slice(0, 6).map((obj, index) => (
        <VaultMobileListCard obj={obj} key={index} id={index} />
      ))}
    </div>
  );
};

export default VaultGridDataStart;
