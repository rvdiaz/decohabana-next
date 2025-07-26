import { BookMode } from "@/components/Hero/interface";
import { MapPin, Clock, CalendarRange } from "lucide-react";
import { BookingParams, useBooking } from "./BookingProvider";

export const BookingSummaryWidgetHeader = () => {
  const { bookingParams } = useBooking();
  const {
    pickupLocation,
    dropoffLocation,
    startDate,
    endDate,
    bookHours,
    bookMode,
  } = bookingParams!;

  const Item = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-center space-x-2 text-sm text-white px-2">
      <span className="text-yellow-400">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="w-full overflow-x-auto  text-white py-3 px-4 rounded-lg shadow-md">
      <div className="max-w-6xl px-4 mx-auto flex items-center space-x-4 text-sm ">
        <Item
          icon={<MapPin size={16} />}
          label="Pickup"
          value={pickupLocation.displayName}
        />

        {bookMode === BookMode.trip && dropoffLocation?.displayName && (
          <>
            <Separator />
            <Item
              icon={<MapPin size={16} />}
              label="Dropoff"
              value={dropoffLocation.displayName}
            />
          </>
        )}

        <Separator />
        <Item
          icon={<CalendarRange size={16} />}
          label="Start"
          value={startDate}
        />

        {bookMode === BookMode.trip && endDate && (
          <>
            <Separator />
            <Item
              icon={<CalendarRange size={16} />}
              label="End"
              value={endDate}
            />
          </>
        )}

        {bookMode === BookMode.hourly && (
          <>
            <Separator />
            <Item
              icon={<Clock size={16} />}
              label="Duration"
              value={`${bookHours}h`}
            />
          </>
        )}
      </div>
    </div>
  );
};

const Separator = () => <div className="w-px h-5 bg-gray-600" />;
