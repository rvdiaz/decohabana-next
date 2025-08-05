"use client";

import { useBooking } from "@/context/bookingProvider";
import { BookMode } from "@/interfaces/hero";
import { formatFriendlyDate } from "@/lib/utils/general";
import { MapPin, Clock, CalendarRange } from "lucide-react";
import { ReactNode } from "react";

export const BookingSummaryWidgetHeader = () => {
  const { bookingParams } = useBooking();

  const Item = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number | ReactNode;
  }) => (
    <div className="flex items-center gap-1 text-sm text-white whitespace-nowrap">
      <span className="text-primary-400">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const Separator = () => (
    <div className="hidden md:block w-px h-5 bg-gray-300 mx-2" />
  );

  return (
    <div className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg shadow-md overflow-x-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-y-2 md:flex-nowrap md:gap-x-4 items-center space-x-4">
        <Item
          icon={<MapPin size={16} />}
          label="Pickup"
          value={bookingParams?.pickupLocation.displayName ?? ""}
        />

        {bookingParams?.bookMode === BookMode.trip &&
          bookingParams?.dropoffLocation?.displayName && (
            <>
              <Separator />
              <Item
                icon={<MapPin size={16} />}
                label="Dropoff"
                value={bookingParams?.dropoffLocation.displayName}
              />
            </>
          )}

        {bookingParams?.startDate && (
          <>
            <Separator />
            <Item
              icon={<CalendarRange size={16} />}
              label="Start"
              value={formatFriendlyDate(bookingParams.startDate, {
                showTime: false,
              })}
            />
          </>
        )}

        {bookingParams?.bookMode === BookMode.trip &&
          bookingParams?.endDate && (
            <>
              <Separator />
              <Item
                icon={<CalendarRange size={16} />}
                label="Aprox. End"
                value={formatFriendlyDate(bookingParams.endDate, {
                  showTime: false,
                })}
              />
            </>
          )}

        {bookingParams?.bookMode === BookMode.hourly && (
          <>
            <Separator />
            <Item
              icon={<Clock size={16} />}
              label="Duration"
              value={`${bookingParams?.bookHours}h`}
            />
          </>
        )}
      </div>
    </div>
  );
};
