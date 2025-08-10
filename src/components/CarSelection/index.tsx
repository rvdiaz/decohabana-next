"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ICarClass } from "@/interfaces/carTypes";
import PrimaryButton, {
  ButtonSize,
} from "@/components/CodidgeUI/PrimaryButton";
import { useCustomer } from "@/context/authProvider";
import { IExtraServices } from "@/interfaces/extraServices";
import { useBooking } from "@/context/bookingProvider";
import { PriceDisplay } from "@/components/CodidgeUI/priceDisplay";
import Image from "next/image";
import { BookMode } from "@/interfaces/hero";

const CarSelection = ({
  extraServices,
}: {
  extraServices: IExtraServices[];
}) => {
  const {
    bookingParams,
    setBookingState,
    selectedCarType,
    selectedAddons,
    handleAddonToggle,
    availableCarTypes: availableCarTypesCtx,
  } = useBooking();
  const { customer } = useCustomer();

  const availabilityCars = availableCarTypesCtx ?? [];

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

  const totalExtraServices =
    selectedAddons?.reduce((add: number, item) => {
      add += item.price.amount;

      return add;
    }, 0) ?? 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Car Selection */}
      <div className="max-w-6xl space-y-4 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {availabilityCars
            .sort((a, b) => a.tripQuotePrice - b.tripQuotePrice)
            .map((car) => (
              <div
                key={car.id}
                className={`rounded-lg overflow-hidden border-2 transition-all cursor-pointer p-3 bg-gray-900 hover:scale-[1.02] ${
                  selectedCarType?.id === car.id
                    ? "border-primary-400 shadow-lg"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => handleCarSelect(car)}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    width={412}
                    height={312}
                    src={car.image.url}
                    alt={car.name}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold text-primary-400">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Up to {car.maxPassengers} passengers
                    </p>
                    <div className="text-primary-300 font-bold text-md">
                      <PriceDisplay
                        price={{
                          amount: car.tripQuotePrice,
                          currencyCode: "USD",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Add-ons Selection */}
        {selectedCarType && (
          <div className="p-6 rounded-xl bg-gray-900 border border-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-white">Select Add-ons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {extraServices
                .filter((addon) => addon?.available)
                .map((addon) => (
                  <label
                    key={addon.name}
                    className={`cursor-pointer border-2 rounded-lg p-4 bg-gray-800 hover:border-primary-400 ${
                      selectedAddons?.some((a) => a.name === addon.name)
                        ? "border-primary-400"
                        : "border-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={
                        !!selectedAddons?.some((a) => a.name === addon.name)
                      }
                      onChange={() => handleAddonToggle(addon)}
                    />
                    <div className="flex items-center space-x-3">
                      {addon.image?.url && (
                        <Image
                          width={412}
                          height={312}
                          src={addon.image.url}
                          alt={addon.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="space-y-1">
                        <h4 className="text-primary-400 font-bold">
                          {addon.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {addon.description}
                        </p>
                        <div className="text-primary-300 text-md font-semibold">
                          <PriceDisplay price={addon.price} />
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
            </div>
          </div>
        )}
        {/* Selected Car Expanded Details */}
        {selectedCarType && (
          <div className="p-6 rounded-xl bg-gray-800 border border-primary-500 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {selectedCarType.name}
            </h2>
            <p className="text-gray-300">{selectedCarType.description}</p>

            <div className="flex flex-wrap gap-2">
              {selectedCarType.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-primary-400/20 text-primary-400 px-3 py-1 rounded-full text-xs"
                >
                  {feature?.label}
                </span>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="mt-4 border-t border-primary-500 pt-4 space-y-2 text-gray-300">
              {/* Minimum fare note */}
              {selectedCarType.minimumFare && (
                <p className="text-xs text-yellow-400 italic flex gap-1">
                  Minimum fare:{" "}
                  <PriceDisplay
                    price={{
                      amount: selectedCarType.minimumFare,
                      currencyCode: "USD",
                    }}
                  />
                </p>
              )}

              {/* Rate breakdown */}
              {bookingParams?.bookMode === BookMode.hourly ? (
                <div className="flex items-baseline italic text-sm">
                  <span className="whitespace-nowrap">Hourly Rate:</span>
                  <span
                    className="flex-grow mx-2 border-1 border-dashed mt-1"
                    aria-hidden="true"
                  />
                  <PriceDisplay
                    price={{
                      amount: selectedCarType.hourlyRate,
                      currencyCode: "USD",
                    }}
                  />
                  <span className="ml-1 text-gray-400">/ hour</span>
                </div>
              ) : (
                <div className="flex items-baseline italic text-sm">
                  <span className="whitespace-nowrap">Rate per Mile:</span>
                  <span
                    className="flex-grow mx-2 border-1 border-dashed mt-1"
                    aria-hidden="true"
                  />
                  <PriceDisplay
                    price={{
                      amount: selectedCarType.pricePerMiles,
                      currencyCode: "USD",
                    }}
                  />
                  <span className="ml-1 text-gray-400">/ mile</span>
                </div>
              )}

              {totalExtraServices ? (
                <div className="flex items-baseline italic text-sm">
                  <span className="whitespace-nowrap">Addons:</span>
                  <span
                    className="flex-grow mx-2 border-1 border-dashed mt-1"
                    aria-hidden="true"
                  />
                  <PriceDisplay
                    price={{
                      amount: totalExtraServices,
                      currencyCode: "USD",
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}

              {/* Total Price */}
              <div className="flex items-baseline font-semibold text-primary-300 text-xl">
                <span className="whitespace-nowrap">Total Price:</span>
                <span
                  className="flex-grow mx-2 border-1 border-dashed mt-1"
                  aria-hidden="true"
                />
                <PriceDisplay
                  price={{
                    amount: selectedCarType.tripQuotePrice + totalExtraServices,
                    currencyCode: "USD",
                  }}
                />
              </div>
            </div>
          </div>
        )}

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
          <h3 className="text-lg font-semibold mb-4 text-primary-400">
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
            className="text-primary-400 hover:text-primary-300 text-sm underline mt-2 inline-block"
          >
            Read full Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarSelection;
