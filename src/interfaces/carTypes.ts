import { IImage } from "@/interfaces/common";

export interface ICarClass {
  id: string;
  name: string;
  description: string;
  maxPassengers: string;
  image: IImage;
  features: {
    label: string;
    value: string;
  }[];
  supportsHourly: boolean;
  supportsDistance: boolean;
  hourlyRate: number;
  pricePerMiles: number;
  baseFare: number;
  minimumFare: number;
  tripQuotePrice: number;
}
