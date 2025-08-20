import { IPrices } from "@/interfaces/common";
import { formatPriceParts } from "@/lib/utils/general";

export const PriceDisplay = ({
  price,
  className,
}: { price: IPrices; className?: string }) => {
  const { symbol, value } = formatPriceParts(price);

  return (
    <div className={`space-x-2 ${className || ""}`}>
      <span>{symbol}</span>
      <span>{value}</span>
    </div>
  );
};
