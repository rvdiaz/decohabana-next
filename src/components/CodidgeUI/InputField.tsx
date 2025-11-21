import React, { forwardRef, ReactNode } from "react";
import { X } from "lucide-react";
import Label from "./Label";
import { LoadingIndicator } from "./loadingWidget";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  errorMessage?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  label?: ReactNode;
  clearable?: boolean;
  loading?: boolean;
  rightIcon?: ReactNode;
  required?: boolean;
}

// 👇 Now using forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      value,
      onChange,
      onFocus,
      className = "",
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
      onKeyPress,
      errorMessage,
      label,
      clearable,
      loading,
      rightIcon,
      required,
      ...rest
    },
    ref
  ) => {
    let inputClasses = `px-4 py-3 text-base md:text-base rounded-lg !bg-black/50 border !border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:!border-primary-400 transition-colors w-full ${
      rightIcon && "pr-10"
    } ${className}`;

    if (disabled) {
      inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed`;
    } else if (error) {
      inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/10`;
    } else if (success) {
      inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/10`;
    } else {
      inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10`;
    }

    const showClearButton =
      clearable && value !== undefined && String(value).length > 0;

    const handleClear = () => {
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div>
        {label && <Label className="mb-1">{label}</Label>}
        <div className="relative">
          <input
            ref={ref} // ✅ Forwarded here
            onKeyPress={onKeyPress}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={inputClasses}
            onFocus={onFocus}
            required={required}
            {...rest}
          />
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {loading && (
            <div
              className={`absolute top-4 ${rightIcon ? "right-9" : "right-2"} `}
            >
              <LoadingIndicator />
            </div>
          )}
          {rightIcon && !showClearButton && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error
                ? "text-error-500"
                : success
                ? "text-success-500"
                : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
        {errorMessage && (
          <span className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

// 👇 Add a display name for DevTools clarity
Input.displayName = "Input";

export default Input;
