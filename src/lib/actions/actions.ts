"use server";
import {
  createQuoteMutation,
  getImagesUploadUrl,
} from "@/lib/graphql/mutations";
import { getQueriesVariables } from "@/lib/core";
import { ICreateQuoteInput } from "@/lib/interfaces";

export async function uploadImageAction(input: {
  filename: string;
  type: string;
  bucketPath: string;
}) {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: getImagesUploadUrl,
        variables: {
          ...getQueriesVariables,
          imgInput: input,
        },
      }),
      cache: "no-store",
    });
    const result = await response.json();

    console.log(":::result", result);

    return result.data;
  } catch (error) {
    console.log("::error", error);
    throw Error("Must valid inputs");
  }
}

export async function createQuoteAction(input: ICreateQuoteInput) {
  try {
    const response = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.APPSYNC_API_KEY!,
      },
      body: JSON.stringify({
        query: createQuoteMutation,
        variables: {
          ...getQueriesVariables,
          input,
        },
      }),
      cache: "no-store",
    });
    const result = await response.json();
    console.log("::error", result);
    return result.data;
  } catch (error) {
    console.log("::error", error);
    throw Error("Must valid inputs");
  }
}
