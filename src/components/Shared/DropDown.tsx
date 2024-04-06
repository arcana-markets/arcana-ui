import React, { useState } from "react";
import { DownIcon } from "./Icons";
interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string) => {
    onSelect(optionValue); // Assuming onSelect expects a string value
    // Close the dropdown or other logic as needed
  };
  

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 text-white rounded-xl flex items-center bg-[#1B2735] border border-[#1e2d3d] text-sm font-medium"
      >
        <span className="text-foxflowerviola"></span>
        <span className="font-bold">{value}</span>
        <DownIcon />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full py-3 flex flex-col gap-3 px-4 bg-[#272F3F] rounded-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.value)}
              className={`... ${option.value === value ? "selected network" : 'hover:bg-[#252B32]'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
