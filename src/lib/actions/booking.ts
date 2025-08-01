"use server";

import { getCarClassesAvilabilityQuery } from "@/lib/graphql/hero/queries";
import { BookMode, IMapLocation } from "@/interfaces/hero";
import { getQueriesVariables } from "@/core";
import { updateBookingMutation } from "../graphql/booking/mutation";

interface BookingInput {
  startDate: string;
  bookMode: BookMode;
  endDate?: string;
  pickupLocation: IMapLocation;
  dropoffLocation: IMapLocation;
  bookHours: number;
}

export const getCarClassesAvailables = async ({
  pickupLocation,
  bookMode,
  startDate,
  dropoffLocation,
  bookHours,
  endDate,
}: BookingInput) => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getCarClassesAvilabilityQuery,
        variables: {
          ...getQueriesVariables,
          input: {
            startDate,
            bookMode,
            bookHours,
            endDate,
            pickupLocation,
            dropoffLocation,
          },
        },
      }),
    });
    const result = await response.json();
    console.log("::error", result);
    return result.data;
  } catch (error) {
    console.log("::error", error);
    throw Error("Must valid inputs");
  }
};

export const updateBookingAction = async ({
  bookingId,
  input,
}: {
  bookingId: string;
  input: any;
}) => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: updateBookingMutation,
        variables: {
          ...getQueriesVariables,
          bookingId,
          booking: input,
        },
      }),
    });
    const result = await response.json();
    return result.data.updateBooking;
  } catch (error) {
    throw Error("Error updating book");
  }
};
