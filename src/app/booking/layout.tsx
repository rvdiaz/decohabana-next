"use server";

import React from "react";
import { BookingProvider } from "@/context/bookingProvider";
import { BookingStepsHeader } from "@/components/Booking/BookStepsHeaders";
import { ToastContainer } from "react-toastify";

export default async function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <BookingStepsHeader />

      {children}
      <ToastContainer position="bottom-right" />
    </BookingProvider>
  );
}
