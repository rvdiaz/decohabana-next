"use server";

import { addCustomerMutation } from "@/components/AuthForms/api/mutation";
import { getCustomerQuery } from "@/components/AuthForms/api/queries";
import { getQueriesVariables } from "@/core";

interface ICustomerInput {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const addCustomerAction = async (customer: ICustomerInput) => {
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
