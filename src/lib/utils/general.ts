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

export const toLocalISOString = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
