import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconRight?: React.ReactNode;
  onChangeValue?: (value: string) => void;
};

const Input = ({
  iconRight,
  onChange,
  onChangeValue,
  className = "",
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onChangeValue?.(e.target.value);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        {...props}
        className={`text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none pr-10 ${
          className || ""
        }`}
        onChange={handleChange}
      />
      {iconRight && (
        <span className="absolute right-3 text-accent-light pointer-events-none flex items-center text-sm">
          {iconRight}
        </span>
      )}
    </div>
  );
};

export default Input;
