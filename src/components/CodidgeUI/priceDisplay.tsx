import { IPrices } from "@/interfaces/common";
import { formatPriceParts } from "@/lib/utils/general";

export const PriceDisplay = ({ price }: { price: IPrices }) => {
  return (
    <div className="space-x-2">
      <span>{formatPriceParts(price).symbol}</span>
      <span>{formatPriceParts(price).value}</span>
    </div>
  );
};
