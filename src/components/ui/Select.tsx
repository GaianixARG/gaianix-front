import React, { useId } from "react";

type TOption = {
  value: string | number;
  label: string;
};

type Props = {
  id?: string;
  options: TOption[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ id, options, defaultValue, onChange }: Props) => {
  const selectId = id || useId();
  return (
    <select
      id={selectId}
      value={defaultValue}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
    >
      {options.map((option) => (
        <option key={`${selectId}-option-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
