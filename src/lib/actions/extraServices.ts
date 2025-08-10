"use server";

import { getExtraServicesQuery } from "@/lib/graphql/extraServices/queries";
import { getQueriesVariables } from "@/core";
import { IExtraServices } from "@/interfaces/extraServices";

export const getExtraServices = async () => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getExtraServicesQuery,
        variables: {
          ...getQueriesVariables,
        },
      }),
    });
    const result = await response.json();
    const extraServ = result.data?.getExtraServices ?? [];

    const availableExtraServices = extraServ.filter(
      (serv: IExtraServices) => serv?.available
    );
    console.log(":::availableExtraServices", availableExtraServices);

    return availableExtraServices;
  } catch (error) {
    console.log("::error adding extra serv", error);
    return [];
  }
};
