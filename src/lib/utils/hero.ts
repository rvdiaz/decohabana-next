import { IPrices } from "@/interfaces/common";
import moment from "moment";
import { toLocalISOString } from "./general";

export const validateDateTime = (value: string) => {
  const selected = moment(value);
  const now = moment();
  const hour = now.hour();

  const requiredOffset = hour >= 23 || hour < 6 ? 3 : 1;
  const minValidTime = now.clone().add(requiredOffset, "hours");

  if (!selected.isValid()) {
    return "Invalid date/time format.";
  }

  if (selected.isBefore(minValidTime)) {
    return `Pickup must be at least ${requiredOffset} ${
      requiredOffset === 1 ? "hour" : "hours"
    } from now.`;
  }

  return true;
};

export const calculateEndDate = (
  startDate: string,
  durationSeconds: number
) => {
  const startDateAux = new Date(startDate);
  const endDate = new Date(startDateAux.getTime() + durationSeconds * 1000);

  return toLocalISOString(endDate); // ✅ correct format for backend
};
