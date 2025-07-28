import React from "react";
import { useBooking } from "../../BookingProvider";
import { useCustomer } from "@/context/authProvider";
import { Shield } from "lucide-react";

export const TripSummary = () => {
  const { bookingParams, selectedCarType } = useBooking();
  const { customer } = useCustomer();

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-6 text-yellow-400">
        Booking Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-300">Service:</span>
          <span>{selectedCarType?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">Date & Time:</span>
          <span>{bookingParams?.startDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">Route:</span>
          <span className="text-right">
            {bookingParams?.pickupLocation.displayName} →{" "}
            {bookingParams?.dropoffLocation.displayName}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">Customer:</span>
          <span>{customer?.name}</span>
        </div>

        <hr className="border-gray-700" />

        <div className="flex justify-between">
          <span className="text-gray-300">Base Price:</span>
          <span>${selectedCarType?.tripQuotePrice}</span>
        </div>

        {/*   <div className="flex justify-between">
          <span className="text-gray-300">0</span>
          <span>${866}</span>
        </div> */}

        <hr className="border-gray-700" />

        <div className="flex justify-between text-xl font-bold text-yellow-400">
          <span>Total:</span>
          <span>${selectedCarType?.tripQuotePrice}</span>
        </div>
      </div>
    </div>
  );
};
