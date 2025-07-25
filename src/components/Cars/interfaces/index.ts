import { IImage } from "@/common/interfaces";

export interface ICarClass {
  name: string;
  description: string;
  maxPassengers: string;
  image: IImage;
  features: {
    label: string;
    value: string;
  }[];
  hourlyRate: number;
  pricePerKm: number;
}
