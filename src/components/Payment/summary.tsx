import React from "react";
import { useBooking } from "@/context/bookingProvider";
import { formatFriendlyDate } from "@/lib/utils/general";
import { BookMode } from "@/interfaces/hero";
import { PriceDisplay } from "../CodidgeUI/priceDisplay";

export const TripSummary = () => {
  const { bookingParams, selectedCarType, selectedAddons } = useBooking();

  const totalExtraServices = selectedAddons?.reduce((add: number, item) => {
    add += item.price.amount;

    return add;
  }, 0);

  const total =
    (selectedCarType?.tripQuotePrice ?? 0) + (totalExtraServices ?? 0);

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

        {bookingParams?.startDate && (
          <div className="flex justify-between">
            <span className="text-gray-300">Date & Time:</span>
            <span> {formatFriendlyDate(bookingParams?.startDate)}</span>
          </div>
        )}

        {bookingParams?.pickupLocation && (
          <div className="flex justify-between">
            <span className="text-gray-300">Pick Up:</span>
            <span> {bookingParams?.pickupLocation.displayName}</span>
          </div>
        )}

        {bookingParams?.bookMode === BookMode.trip && (
          <div className="flex justify-between">
            <span className="text-gray-300">Route:</span>
            <span className="text-right">
              {bookingParams?.pickupLocation.displayName} →{" "}
              {bookingParams?.dropoffLocation.displayName}
            </span>
          </div>
        )}
        {bookingParams?.bookMode === BookMode.hourly && (
          <div className="flex justify-between">
            <span className="text-gray-300">Duration:</span>
            <span className="text-right">{bookingParams.bookHours} hours</span>
          </div>
        )}

        <hr className="border-gray-700" />

        {selectedCarType?.tripQuotePrice && (
          <div className="flex justify-between">
            <span className="text-gray-300">Car Class Price:</span>
            <PriceDisplay
              price={{
                amount: selectedCarType?.tripQuotePrice,
                currencyCode: "USD",
              }}
            />
          </div>
        )}

        {totalExtraServices && (
          <div className="flex justify-between">
            <span className="text-gray-300">Extra Services Price:</span>
            <PriceDisplay
              price={{
                amount: totalExtraServices,
                currencyCode: "USD",
              }}
            />
          </div>
        )}

        <hr className="border-gray-700" />

        <div className="flex justify-between text-xl font-bold text-yellow-400">
          <span>Total:</span>
          <PriceDisplay
            price={{
              amount: total,
              currencyCode: "USD",
            }}
          />
        </div>
      </div>
    </div>
  );
};
