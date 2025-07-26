"use client";
import { ICarClass } from "@/components/Cars/interfaces";
import { PageLoading } from "@/components/CodidgeUI/pageLoading";
import { BookMode, IMapLocation } from "@/components/Hero/interface";
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
}

interface BookingCtx extends BookingState {
  setBookingState: (s: Partial<BookingState>) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingCtx | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>({});
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
      value={{ ...state, setBookingState, clearBooking }}
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
