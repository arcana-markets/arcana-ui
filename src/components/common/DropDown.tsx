import React, { useState } from "react";
import { DownIcon } from "./Icons";

interface DropdownProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="py-3 px-4 text-white rounded-xl flex items-center bg-[#1B2735] border border-[#1e2d3d] text-sm font-medium"
      >
        <span className="text-foxflowerviola">Sort:&nbsp;</span>
        <span className="font-bold">{value}</span>
        <DownIcon />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full py-3 flex flex-col gap-3 px-4 bg-[#272F3F] rounded-lg  z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(option)}
              className={`block text-foxflowerviola hover:text-white text-base w-full text-left ${
                option === value && "text-white font-bold"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
