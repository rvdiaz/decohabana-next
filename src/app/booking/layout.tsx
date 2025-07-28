"use client";

// app/booking/layout.tsx
import React from "react";
import { BookingProvider } from "./BookingProvider";
import { BookingSummaryWidgetHeader } from "./BookDetails";
import { BookingStepsHeader } from "./BookStepsHeaders";

export default function BookingLayout({
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
