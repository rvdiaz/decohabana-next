import { IPrices } from "@/interfaces/common";

export function formatPriceParts({ amount, currencyCode = "USD" }: IPrices): {
  symbol: string;
  value: string;
} {
  const parts = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).formatToParts(amount);

  const symbol = parts.find((p) => p.type === "currency")?.value ?? "";
  const value = parts
    .filter((p) => p.type !== "currency")
    .map((p) => p.value)
    .join("");

  return { symbol, value };
}

export function formatFriendlyDate(
  dateString: string,
  options?: { showTime?: boolean }
) {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  if (options?.showTime === false) return datePart;

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${datePart} at ${timePart}`;
}
