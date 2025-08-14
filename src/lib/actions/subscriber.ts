"use server";

import { getQueriesVariables } from "@/core";
import { addSubscriberMutation } from "../graphql/subscribers/mutation";

export const addSubscriberAction = async ({
  formData,
}: {
  formData: {
    name: String;
    email: string;
  };
}) => {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: addSubscriberMutation,
        variables: {
          ...getQueriesVariables,
          subscriber: formData,
        },
      }),
    });

    const result = await response.json();

    if (result.errors?.length > 0) {
      return {
        alreadySubscribed: true,
      };
    }

    const subscriber = result.data?.addSubscriber ?? [];

    return subscriber;
  } catch (error) {
    console.log("::error adding extra serv", error);
    return;
  }
};
