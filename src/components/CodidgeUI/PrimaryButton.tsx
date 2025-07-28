import React from "react";
import { LoadingIndicator } from "./loadingWidget";
LoadingIndicator;
export enum ButtonSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
}

const sizeClasses = {
  [ButtonSize.SMALL]: "!px-3 !py-1 !text-sm",
  [ButtonSize.MEDIUM]: "!px-4 !py-2 !text-base",
  [ButtonSize.LARGE]: "!px-6 !py-4 !text-md",
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading,
  size = ButtonSize.MEDIUM,
  ...props
}) => {
  const disabledAux = loading || props.disabled;
  const bgColor = disabledAux
    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-600 hover:to-gray-700 !cursor-default"
    : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700";

  return (
    <button
      {...props}
      disabled={disabledAux}
      className={`cursor-pointer w-full text-black font-semibold py-4 px-6 rounded-lg duration-300 transform hover:scale-105 ${bgColor} ${sizeClasses[size]} ${props.className}`}
    >
      {loading ? (
        <div className="w-fit py-[3px] mx-auto">
          <LoadingIndicator />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default PrimaryButton;
