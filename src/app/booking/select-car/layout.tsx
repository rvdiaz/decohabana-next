"use server";

import React from "react";
import CarSelectionPage from "./page";
import { BookingRouteGuard } from "@/components/Booking/BookingRoutesGuard";

export default async function SelectCar() {
  return (
    <BookingRouteGuard>
      <CarSelectionPage />
    </BookingRouteGuard>
  );
}
