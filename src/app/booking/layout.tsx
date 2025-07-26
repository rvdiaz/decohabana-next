"use client";

// app/booking/layout.tsx
import React from "react";
import { BookingProvider } from "./BookingProvider";
import { ChevronLeft } from "lucide-react";
import { BookingSummaryWidgetHeader } from "./bookDetails";
import { usePathname, useRouter } from "next/navigation";
import { BookingStepsHeader } from "./bookStepsHeaders";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      {/* Progress Bar */}
      <BookingStepsHeader />
      <div className="bg-gray-900 py-2 grid grid-cols-3 justify-between ">
        <div className="col-span-2">
          <BookingSummaryWidgetHeader />
        </div>
      </div>
      {children}
    </BookingProvider>
  );
}
