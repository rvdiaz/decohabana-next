import { ICarClass } from "./carTypes";
import { IPrices } from "./common";
import { IExtraServices } from "./extraServices";
import { BookMode, IMapLocation } from "./hero";

export enum IPreferedLanguage {
  EN = "EN",
  ES = "ES",
}

export interface BookingParams {
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  startDate: string;
  endDate: string;
  bookHours: number;
  bookMode: BookMode;
  bookingCode?: string;
  notes?: string;
  preferedLanguage: IPreferedLanguage;
}

export interface BookingState {
  bookingParams?: BookingParams;
  availableCarTypes?: ICarClass[];
  selectedCarType?: ICarClass;
  selectedAddons?: IExtraServices[];
  paid?: boolean;
  bookingCode?: string;
}

export enum BookingStatus {
  pending = "pending",
  payment_failed = "payment_failed",
  confirmed = "confirmed",
  in_progress = "in_progress",
  completed = "completed",
  cancelled = "cancelled",
  refunded = "refunded",
}

export interface IBooking {
  id: string;
  bookingCode: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  note?: string;
  createdAt: string;
  bookingBusinessData: IBookingData;
}

export interface IBookingData {
  customer: BookingCustomer;
  driver: BookingDriver;
  car: BookingCar;
  extraServices?: IExtraServices[];
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  totalPrice: IPrices;
  bookHours: number;
  bookMode: BookMode;
}

interface BookingCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface BookingDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface BookingCar {
  id: string;
  brand: string;
  model: string;
  carType: ICarClass;
}

export enum ModalContentBooking {
  edit,
  add,
  delete,
}
