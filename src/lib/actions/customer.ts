"use server";

import { addCustomerMutation } from "@/lib/graphql/customer/mutation";
import { getQueriesVariables } from "@/core";
import { getCustomerQuery } from "../graphql/customer/queries";
import { ICustomerInput } from "@/interfaces/customer";

export const addCustomerAction = async (
  customer: Partial<Omit<ICustomerInput, "externalReference">>
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
          query: addCustomerMutation,
          variables: {
            ...getQueriesVariables,
            customer,
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

export const getCustomerAction = async (customerId: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCustomerQuery,
          variables: {
            ...getQueriesVariables,
            customerId,
          },
        }),
      }
    );
    const result = await response.json();
    return result.data.getCustomer;
  } catch (error) {
    console.log("::error getting customer", error);
    return [];
  }
};
