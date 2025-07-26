"use server";

import { getCarClassesAvilabilityQuery } from "@/components/Hero/api/queries";
import { BookMode, IMapLocation } from "@/components/Hero/interface";
import { getQueriesVariables } from "@/core";

interface BookingInput {
  startDate: string;
  bookMode: BookMode;
  endDate: string;
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
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw Error("Must valid inputs");
  }
};
