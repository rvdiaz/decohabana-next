"use server";

import { getCarClassesQuery } from "@/lib/graphql/carTypes/queries";
import { getQueriesVariables } from "@/core";

export const getCarsAction = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getCarClassesQuery,
          variables: getQueriesVariables,
        }),
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log("::error getting cars", error);
    return [];
  }
};
