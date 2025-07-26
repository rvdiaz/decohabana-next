import { IImage } from "@/common/interfaces";

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
  pricePerKm: number;
  baseFare: number;
  minimumFare: number;
}
