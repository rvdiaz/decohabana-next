import { IImage } from "@/interfaces/common";

export interface IExtraServices {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currencyCode: string;
  };
  image: IImage;
  available: boolean;
}
