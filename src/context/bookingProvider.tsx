"use client";
import { ICarClass } from "@/interfaces/carTypes";
import { PageLoading } from "@/components/CodidgeUI/pageLoading";
import { IExtraServices } from "@/interfaces/extraServices";
import { BookMode, IMapLocation } from "@/interfaces/hero";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface BookingParams {
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  startDate: string;
  endDate: string;
  bookHours: number;
  bookMode: BookMode;
}

interface BookingState {
  bookingParams?: BookingParams;
  availableCarTypes?: ICarClass[];
  selectedCarType?: ICarClass;
  selectedAddons?: IExtraServices[];
}

interface BookingCtx extends BookingState {
  setBookingState: (s: Partial<BookingState>) => void;
  clearBooking: () => void;
  handleAddonToggle: (addon: IExtraServices) => void;
}

const BookingContext = createContext<BookingCtx | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState | null>({});
  const [loading, setloading] = useState(true);

  // 1️⃣  Hydrate from localStorage on mount
  useEffect(() => {
    const persisted = localStorage.getItem("bookingFlow");
    if (persisted) setState(JSON.parse(persisted));
    setloading(false);
  }, []);

  // 2️⃣  Persist every change
  const setBookingState = (patch: Partial<BookingState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem("bookingFlow", JSON.stringify(next));
      return next;
    });
  };

  const handleAddonToggle = (addon: IExtraServices) => {
    setState((prev) => {
      const currentAddons = prev?.selectedAddons || [];
      const isSelected = currentAddons.some((a) => a.name === addon.name); // Or use a unique ID if available

      const updatedAddons = isSelected
        ? currentAddons.filter((a) => a.name !== addon.name)
        : [...currentAddons, addon];

      const next = { ...prev, selectedAddons: updatedAddons };
      localStorage.setItem("bookingFlow", JSON.stringify(next));
      return next;
    });
  };

  const clearBooking = () => {
    localStorage.removeItem("bookingFlow");
    setState({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <PageLoading />
      </div>
    );
  }

  return (
    <BookingContext.Provider
      value={{ ...state, setBookingState, clearBooking, handleAddonToggle }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};
