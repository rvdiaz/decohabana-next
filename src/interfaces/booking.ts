import { ICarClass } from "./carTypes";
import { IExtraServices } from "./extraServices";
import { BookMode, IMapLocation } from "./hero";

export interface BookingParams {
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  startDate: string;
  endDate: string;
  bookHours: number;
  bookMode: BookMode;
}

export interface BookingState {
  bookingParams?: BookingParams;
  availableCarTypes?: ICarClass[];
  selectedCarType?: ICarClass;
  selectedAddons?: IExtraServices[];
}
