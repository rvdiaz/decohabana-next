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
    ? "bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-700 hover:to-yellow-800 !cursor-default"
    : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700";

  return (
    <button
      {...props}
      disabled={disabledAux}
      className={`cursor-pointer w-full text-black font-semibold py-4 px-6 rounded-lg duration-300 transform hover:scale-105 ${bgColor} ${sizeClasses[size]} ${props.className}`}
    >
      {loading ? (
        <div className="py-[3px]">
          <LoadingIndicator />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default PrimaryButton;
