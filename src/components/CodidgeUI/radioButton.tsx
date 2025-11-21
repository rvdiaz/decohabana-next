import type React from "react";
import { ReactNode } from "react";

interface RadioOption {
  value: string;
  label: ReactNode;
  id: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          <input
            type="radio"
            id={option.id}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
          <label
            htmlFor={option.id}
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
