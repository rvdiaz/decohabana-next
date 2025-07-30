"use server";

import { IExtraServices } from "@/interfaces/extraServices";
import React from "react";
import CarSelectionPage from "./page";
import { getExtraServices } from "@/lib/actions/extraServices";
import { BookingRouteGuard } from "@/components/Booking/BookingRoutesGuard";

export default async function SelectCar() {
  const extraServices: IExtraServices[] = await getExtraServices();

  return (
    <BookingRouteGuard>
      <CarSelectionPage extraServices={extraServices} />
    </BookingRouteGuard>
  );
}
