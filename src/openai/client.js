import { getProviderDetails } from "./getProviderDetails.js";
import OpenAI from "openai";
import "dotenv/config";

/**
 * Create an OpenAI client.
 * @param {string} provider - The OpenAI API provider.
 * @param {string} apiKey - The valid API KEY for the provider.
 * @returns {Object} The OpenAI client and model.
 */
export default async function createOpenAIClient(provider, apiKey) {
  const { baseURL, model } = getProviderDetails(provider);

  if (!apiKey && !process.env.API_KEY) {
    throw new Error(
      `An API key is required to use the tool. Please provide a valid API key for the provider ${provider}.`
    );
  }

  return {
    client: new OpenAI({
      baseURL: baseURL,
      apiKey: apiKey,
    }),
    model,
  };
}
