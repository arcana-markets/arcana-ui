import React from "react";
import { vaultsData } from "@/components/common/Helper";
import VaultListItem from "./VaultListItem";

const VaultEndData = () => {
  return (
    <div className="w-full text-white min-w-[992px] pt-6 pb-10 h-[356px] overscroll-auto">
      {vaultsData.slice(7, 11).map((val, index) => (
        <VaultListItem obj={val} key={index} />
      ))}
    </div>
  );
};

export default VaultEndData;
