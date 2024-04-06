"use client";
import Dropdown from "@/components/Shared/DropDown";
import { BeakerIcon, SearchIcon, UpArrowIcon } from "@/components/Shared/Icons";
import Toggle from "@/components/Shared/Toogle";
import { useState } from "react";
import Disclaimer from "./Disclaimer";
import ValutGridDataEnd from "./ValutGridDataEnd";
import VaultGridDataStart from "./VaultGridDataStart";

interface Option {
  label: string;
  value: string;
}

const VaultsMobile = () => {
  const [showToggle, setShowToggle] = useState(true);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectValue = (value: string) => {
    setSelectedValue(value);
  };

  // This should be placed in VaultsMobile component or a higher scope that VaultsMobile can access
const dropdownOptions: Option[] = [
  { label: "APY", value: "APY" },
  { label: "TVL", value: "TVL" },
  { label: "Hot", value: "Hot" },
  { label: "24h Gainers", value: "24h Gainers" },
  { label: "7D Delta", value: "7D Delta" },
];


  return (
    <div className="md:hidden">
      <div className="container pt-10 sm:pt-[50px] px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium text-xl">
            Permissionless Vaults
          </h3>
          <button className="py-2 px-[14px] rounded-xl text-sm duration-300 hover:bg-[#023646] leading-6 bg-bluelguana text-white font-medium">
            Create
          </button>
        </div>
      </div>
      <div className="bg-[#11171D] py-6">
        <div className="container px-4 flex justify-between items-center mx-auto">
        <Dropdown
            value={selectedValue}
            options={dropdownOptions}
            onSelect={handleSelectValue}
          />
          <div className="flex items-center gap-2">
            <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#1B2735]">
              <SearchIcon />
            </button>
            <button
              onClick={() => setShowToggle(!showToggle)}
              className={`h-12 w-12 relative flex items-center duration-300 justify-center rounded-xl ${
                showToggle ? "bg-[#1B2735]" : "bg-[#fff]"
              }`}
            >
              <BeakerIcon showToggle={showToggle} />
              <div
                className={`py-6 px-4 rounded-xl bg-[#272F3F] flex flex-col gap-4 absolute right-0 -bottom-[116px]  ${
                  showToggle
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                }`}
              >
                <Toggle ValIsChecked={false} lable="Unknown tokens" id="one" />
                <Toggle
                  ValIsChecked={true}
                  lable="Only my positions"
                  id="two"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <VaultGridDataStart />
        <div className="flex items-center flex-col gap-2 p-4 rounded-xl mx-4 bg-[#012F3C] mt-6">
          <p className="text-base text-center font-medium text-white leading-7">
            You can easily create permissionless vaults with Arcana’s Vault
            Engine.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-balance bg-[#023646] font-bold text-bluelguana px-5 py-[9px] hover:bg-bluelguana duration-300 hover:text-white rounded-xl ml-2">
              Create Vault
            </button>
            <span className="text-colonyblue text-base font-medium flex items-center gap-1 ml-2 cursor-pointer">
              Docs <UpArrowIcon />
            </span>
          </div>
        </div>
        <ValutGridDataEnd />
        <Disclaimer />
      </div>
    </div>
  );
};

export default VaultsMobile;
