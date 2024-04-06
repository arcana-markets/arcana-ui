import React from "react";
import { vaultsData } from "@/components/Shared/Helper";
import VaultListItem from "./VaultListItem";

const VaultEndData = () => {
  return (
    <div className="w-full text-white min-w-[992px] overscroll-auto">
      {vaultsData.slice(7, 11).map((val, index) => (
        <VaultListItem obj={val} key={index} />
      ))}
    </div>
  );
};

export default VaultEndData;
