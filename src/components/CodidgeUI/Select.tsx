import { ChevronDown } from "lucide-react";
import type React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LoadingIndicator } from "./loadingWidget";
import Label from "./Label";

export interface ISelectOption {
  value: string | number;
  valueToShow: ReactNode;
  available?: boolean;
}

interface SelectProps {
  label?: string;
  options: ISelectOption[];
  defaultSelected?: ISelectOption;
  onChange?: (selected: ISelectOption) => void;
  disabled?: boolean;
  loading?: boolean;
  classNameWrapper?: string;
  upPosition?: boolean;
  placeholder?: ReactNode; // <-- Add this
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  defaultSelected,
  onChange,
  loading = false,
  disabled = false,
  classNameWrapper,
  placeholder = "",
  upPosition = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(
    defaultSelected ?? {
      value: "",
      valueToShow: "",
      available: true,
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: ISelectOption) => {
    if (optionValue.available) {
      setSelectedOption(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!selectedOption) {
      setSelectedOption(defaultSelected ?? { value: "", valueToShow: "" });
    }
  }, [defaultSelected]);

  const normalizedOptions = options.map((opt) => ({
    ...opt,
    available: opt.available !== false,
  }));

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && <Label>{label}</Label>}

      <div className="relative inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full">
            {loading ? (
              <div className="min-w-20 flex justify-center py-1.5 pl-3 pr-3 rounded-lg border border-gray-300">
                <LoadingIndicator />
              </div>
            ) : (
              <div
                className={`px-4 py-2.5 rounded-lg !bg-black/50 border !border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:!border-yellow-400 transition-colors w-full flex ${classNameWrapper}`}
              >
                <div className="flex flex-wrap items-center flex-auto gap-2">
                  {selectedOption.value !== "" ? (
                    selectedOption.valueToShow
                  ) : (
                    <span className="text-gray-400 text-sm">
                      {placeholder ?? "Select an option"}
                    </span>
                  )}
                </div>
                <div className="flex items-center py-1 pl-1 pr-1 w-7">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-5 h-5 text-white outline-hidden cursor-pointer focus:outline-hidden"
                  >
                    <ChevronDown />
                  </button>
                </div>
              </div>
            )}
          </div>

          {isOpen && (
            <div
              className={`absolute left-0 z-40 w-full bg-gray-800 border-gray-900 rounded-lg shadow-lg overflow-auto max-h-64 ${
                upPosition ? "bottom-full" : "top-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col ">
                {normalizedOptions.map((option, index) => (
                  <div
                    key={index}
                    className={` w-full cursor-pointer hover:bg-gray-900 border-b border-b-gray-700 last:border-none ${
                      !option.available && "!bg-gray-200 !cursor-not-allowed"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <div
                      className={`relative flex w-full items-center p-3 pl-3 ${
                        selectedOption.value === option.value
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <div className="mx-2 leading-6 text-white">
                        {option.valueToShow}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
