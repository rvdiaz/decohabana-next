"use server";

import React from "react";
import { BookingSummaryWidgetHeader } from "../../components/Booking/BookDetails";
import { BookingProvider } from "@/context/bookingProvider";
import { BookingStepsHeader } from "@/components/Booking/BookStepsHeaders";

export default async function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <BookingStepsHeader />
      <div className="bg-gray-900 py-2">
        <BookingSummaryWidgetHeader />
      </div>
      {children}
    </BookingProvider>
  );
}
