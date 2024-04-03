import React from 'react';
import { Listbox } from '@headlessui/react';
import { ReactNode } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface SelectProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void; // Adjusted the type to match the Listbox component's expected type
  children: ReactNode;
  className?: string;
  dropdownPanelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const Select = ({
  label,
  value,
  onChange,
  children,
  className,
  dropdownPanelClassName,
  placeholder = 'Select',
  disabled = false,
}: SelectProps) => {
  return (
    <div className={`relative ${className}`}>
      <label className="block mb-1 text-sm text-gray-700">{label}</label>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`default-transition h-full w-full rounded-md bg-th-input-bkg py-2.5 font-normal ring-1 ring-inset ring-th-input-border focus:border-th-input-border-hover focus:outline-none md:hover:ring-th-input-border-hover`}
            >
              <div
                className={`flex items-center justify-between space-x-2 px-3 text-th-fgd-1`}
              >
                {value ? (
                  value
                ) : (
                  <span className="text-th-fgd-3">{placeholder}</span>
                )}
                <LuChevronDown
                  className={`default-transition h-5 w-5 flex-shrink-0 text-th-fgd-1 ${
                    open ? 'rotate-180' : 'rotate-360'
                  }`}
                />
              </div>
            </Listbox.Button>
            {open ? (
              <Listbox.Options
                static
                className={`thin-scroll absolute left-0 z-20 mt-1 max-h-60 w-full origin-top-left space-y-2 overflow-auto rounded-md bg-th-bkg-2 p-4 text-th-fgd-1 outline-none ${dropdownPanelClassName}`}
              >
                {children}
              </Listbox.Options>
            ) : null}
          </>
        )}
      </Listbox>
    </div>
  );
};

interface OptionProps {
  value: string;
  children: string | ReactNode;
  className?: string;
}

const Option = ({ value, children, className }: OptionProps) => {
  return (
    <Listbox.Option className="mb-0" value={value}>
      {({ selected }) => (
        <div
          className={`default-transition rounded text-th-fgd-2 hover:cursor-pointer md:hover:text-th-fgd-1 ${
            selected ? 'text-th-active' : ''
          } ${className}`}
        >
          {children}
        </div>
      )}
    </Listbox.Option>
  );
};

Select.Option = Option;

export default Select;
