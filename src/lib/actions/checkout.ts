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

    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const result = await response.json();
    return result.data.payBooking;
  } catch (error) {
    console.log("::");
  }
};
