"use client";

import React, { useState } from "react";
import { ChevronRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBooking } from "../BookingProvider";
import { ICarClass } from "@/components/Cars/interfaces";
import PrimaryButton, {
  ButtonSize,
} from "@/components/CodidgeUI/PrimaryButton";
import { useCustomer } from "@/context/authProvider";

const CarSelectionPage: React.FC = () => {
  const { bookingParams, setBookingState, selectedCarType } = useBooking();
  const { customer } = useCustomer(); // access customer status

  const { availableCarTypes: availableCarTypesCtx } = useBooking();

  const availabilityCars = availableCarTypesCtx ?? [];

  console.log(":availabilityCars", availabilityCars);

  const router = useRouter();

  const handleCarSelect = (car: ICarClass) => {
    setBookingState({ ...bookingParams, selectedCarType: car });
  };

  const handleNext = () => {
    if (customer) {
      router.push("/booking/payment");
    } else {
      router.push("/booking/account");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center pt-8">
        <PrimaryButton
          className="flex !w-fit mx-auto"
          size={ButtonSize.LARGE}
          onClick={handleNext}
          disabled={!selectedCarType}
        >
          Next
          <ChevronRight className="ml-2 w-5 h-5" />
        </PrimaryButton>
      </div>
      {/* Car Selection */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {availabilityCars
            .slice()
            .sort((a, b) => a.tripQuotePrice - b.tripQuotePrice)
            .map((car) => {
              return (
                <div
                  key={car.id}
                  className={`bg-gray-900 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedCarType?.id === car.id
                      ? "border-yellow-400 shadow-2xl shadow-yellow-400/20"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => handleCarSelect(car)}
                >
                  <div className="relative">
                    <img
                      src={car.image.url}
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {car.name}
                    </div>
                    {selectedCarType?.id === car.id && (
                      <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                        <div className="bg-yellow-400 text-black p-3 rounded-full">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-yellow-400">
                        {car.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {formatPrice(car.tripQuotePrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <Users className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm">
                        Up to {car.maxPassengers} passengers
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {car.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs"
                        >
                          {feature.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="text-center pt-8">
          <PrimaryButton
            className="flex !w-fit mx-auto"
            size={ButtonSize.LARGE}
            onClick={handleNext}
            disabled={!selectedCarType}
          >
            Next
            <ChevronRight className="ml-2 w-5 h-5" />
          </PrimaryButton>
        </div>
        {/* Terms and Conditions */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Terms & Conditions
          </h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• Minimum booking duration: 2 hours</p>
            <p>• Cancellation policy: 24 hours notice required</p>
            <p>• Additional fees may apply for tolls, parking, and gratuity</p>
            <p>• Professional chauffeur included in all bookings</p>
          </div>
          <a
            href="#"
            className="text-yellow-400 hover:text-yellow-300 text-sm underline mt-2 inline-block"
          >
            Read full Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarSelectionPage;
