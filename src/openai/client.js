import OpenAI from "openai";
import "dotenv/config";

/**
 * Create an OpenAI client.
 * @param {string} provider - The OpenAI API provider.
 * @param {string} apiKey - The valid API KEY for the provider.
 * @returns {Object} The OpenAI client and model.
 */
export default function createOpenAIClient(provider, apiKey) {
  let client;
  let baseURL;
  let model;

  if (provider.toLowerCase() === "groq") {
    baseURL = "https://api.groq.com/openai/v1";
    model = "llama-3.1-70b-versatile";
  } else if (provider.toLowerCase() === "openrouter") {
    baseURL = "https://openrouter.ai/api/v1";
    model = "meta-llama/llama-3.1-8b-instruct:free";
  } else {
    throw new Error(
      `${provider} is invalid or is currently unsupported. Please choose from the supported providers:\n` +
        "1. Groq\n" +
        "2. OpenRouter"
    );
  }

  if (apiKey || process.env.API_KEY) {
    client = new OpenAI({
      baseURL: baseURL,
      apiKey: apiKey || process.env.API_KEY,
    });
  } else {
    throw new Error(
      "API key is required to use the tool. Please provide a valid API key for the appropriate provider."
    );
  }

  return { client, model };
}
