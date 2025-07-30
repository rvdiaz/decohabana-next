"use server";

import { getExtraServicesQuery } from "@/lib/graphql/extraServices/queries";
import { getQueriesVariables } from "@/core";

export const getExtraServices = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getExtraServicesQuery,
          variables: {
            ...getQueriesVariables,
          },
        }),
      }
    );
    const result = await response.json();
    return result.data.getExtraServices;
  } catch (error) {
    console.log("::error adding customer", error);
    return [];
  }
};
