

export interface IBookingFormInput {
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  startDate: string;
  endDate: string;
  bookHours: number;
  bookMode: BookMode;
}

export enum BookMode {
  hourly = "hourly",
  trip = "trip",
}

export interface IMapLocation {
  id: string;
  displayName: string;
  formattedAddress: string;
}
