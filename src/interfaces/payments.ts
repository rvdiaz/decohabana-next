import { BookingParams } from "./booking";

export interface IPaymentResponse {
  success: boolean;
  message: string;
  chargeId: string;
  booking: BookingParams;
  customerExternalReference: {
    referenceId: string;
    sourceHandler: string;
  };
}
