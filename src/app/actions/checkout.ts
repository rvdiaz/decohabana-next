"use server";

import { getQueriesVariables } from "@/core";
import { payChargeMutation } from "../booking/payment/api/mutations";
import { BookingParams } from "../booking/BookingProvider";
import { ICarClass } from "@/components/Cars/interfaces";

export const payBooking = async (
  bookingDetails: BookingParams,
  selectedCarType: ICarClass,
  cardToken: string,
  totalPrice: {
    amount: number;
    currencyCode: string;
  }
) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: payChargeMutation,
          variables: {
            ...getQueriesVariables,
          },
        }),
      }
    );
    const result = await response.json();
    return result.data.addCustomer;
  } catch (error) {
    console.log("::error adding customer", error);
    return [];
  }
};
