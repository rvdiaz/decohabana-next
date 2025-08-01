"use server";

import { getQueriesVariables } from "@/core";
import { payChargeMutation } from "../../lib/graphql/payments/mutations";
import { BookingParams } from "@/interfaces/booking";

export const payBooking = async ({
  bookingDetails,
  selectedCarType,
  cardToken,
  totalPrice,
  customerData,
}: {
  bookingDetails: BookingParams;
  selectedCarType: any;
  cardToken: string;
  totalPrice: {
    amount: number;
    currencyCode: string;
  };
  customerData: any;
}) => {
  try {
    const body = JSON.stringify({
      query: payChargeMutation,
      variables: {
        ...getQueriesVariables,
        cardToken,
        totalPrice,
        bookingDetails,
        customerData,
        carTypeDetails: selectedCarType,
      },
    });

    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body,
    });

    const result = await response.json();
    return result.data.payBooking;
  } catch (error) {
    console.log("::error", error);
    throw Error("Payment failed");
  }
};
