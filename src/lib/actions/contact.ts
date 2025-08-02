"use server";

import { getQueriesVariables } from "@/core";
import { getTenantConfig } from "../graphql/tenant/queries";
import { contactSubmission } from "../graphql/contact/mutation";

export const getContactConfigByTenant = async () => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getTenantConfig,
        variables: {
          id: getQueriesVariables.tenant.tenantId,
        },
      }),
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log("::error products", error);
    return [];
  }
};

export const submitContact = async ({
  formData,
}: {
  formData: {
    formId: String;
    fields: string;
  };
}) => {
  try {
    const variables = {
      ...getQueriesVariables,
      formData,
    };

    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: contactSubmission,
        variables,
      }),
    });

    const result = await response.json();

    if (result?.data?.contactSubmission) {
      return {
        success: true,
        message: "We'll get in touch with you soon.",
        data: result.data,
      };
    } else {
      throw Error("Error connecting to api");
    }
  } catch (error) {
    console.log(":::error", error);
    throw Error(error as string);
  }
};
