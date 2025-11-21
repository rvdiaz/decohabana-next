import React from "react";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  colorClass?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = "",
  showPercentage = false,
  colorClass = "bg-red-900",
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
      >
        <div
          className={`h-full ${colorClass} transition-all duration-300 ease-in-out rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-600 mt-1 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default Progress;
