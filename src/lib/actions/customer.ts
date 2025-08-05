"use server";

import { addCustomerMutation } from "@/lib/graphql/customer/mutation";
import { getQueriesVariables } from "@/core";
import {
  getCustomerBooking,
  getCustomerQuery,
} from "../graphql/customer/queries";
import { ICustomerInput } from "@/interfaces/customer";
import { IBooking } from "@/interfaces/booking";

export const addCustomerAction = async (
  customer: Partial<Omit<ICustomerInput, "externalReference">>
) => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: addCustomerMutation,
        variables: {
          ...getQueriesVariables,
          customer,
        },
      }),
    });
    const result = await response.json();
    return result.data.addCustomer;
  } catch (error) {
    console.log("::error adding customer", error);
    return [];
  }
};

export const getCustomerAction = async (customerId: string) => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getCustomerQuery,
        variables: {
          ...getQueriesVariables,
          customerId,
        },
      }),
    });
    const result = await response.json();
    if (!result.data.getCustomer) {
      throw Error("Customer not registered in the system");
    }

    return result.data.getCustomer;
  } catch (error) {
    throw Error("Error getting customer");
  }
};

export const getCustomerBookingAction = async (
  customerId: string
): Promise<{
  past: IBooking[];
  upcoming: IBooking[];
} | null> => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getCustomerBooking,
        variables: {
          ...getQueriesVariables,
          customerId,
        },
      }),
    });
    const result = await response.json();
    return result.data.getCustomerBooking;
  } catch (error) {
    return {
      past: [],
      upcoming: [],
    };
  }
};
