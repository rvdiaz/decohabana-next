"use client";
import { IExtraServices } from "@/interfaces/extraServices";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BookingState } from "@/interfaces/booking";

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
    setloading(true);
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
