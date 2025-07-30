"use server";

export const getGoogleSuggestions = async (input: string, options: any) => {
  try {
    const gogolePlacesUrl =
      "https://places.googleapis.com/v1/places:autocomplete";

    const apiKey = process.env.GOOGLE_MAPS_API_KEY!;

    const response = await fetch(gogolePlacesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        ...options,
        input,
      }),
    });
    const result = await response.json();

    return result.suggestions;
  } catch (error) {
    console.log(":::google suggestions failed", error);
  }
};
