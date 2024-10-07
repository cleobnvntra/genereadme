export function getProviderDetails(provider) {
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

  return { baseURL, model };
}
