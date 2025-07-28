import React from "react";
import { ButtonSize } from "./PrimaryButton";
import { LoadingIndicator } from "./loadingWidget";

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
}

const sizeClasses = {
  [ButtonSize.SMALL]: "!px-3 !py-1 !text-sm",
  [ButtonSize.MEDIUM]: "!px-4 !py-2 !text-base",
  [ButtonSize.LARGE]: "!px-5 !py-3 !text-lg",
};

const TextButton: React.FC<TextButtonProps> = ({
  loading,
  size = ButtonSize.MEDIUM,
  ...props
}) => {
  const disabledAux = loading || props.disabled;

  return (
    <button
      {...props}
      disabled={disabledAux}
      className={`cursor-pointer flex items-center justify-center p-2 font-medium text-gray-500 rounded-lg text-theme-sm hover:bg-gray-50 ${sizeClasses[size]} ${props.className}`}
    >
      {loading ? <LoadingIndicator /> : props.children}
    </button>
  );
};

export default TextButton;
