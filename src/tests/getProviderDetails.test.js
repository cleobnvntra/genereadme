import { getProviderDetails } from "../openai/getProviderDetails";
import { expect } from "@jest/globals";

describe("getProviderDetails", () => {
  it("should return the correct provider details for Groq", () => {
    const provider = "Groq";
    const details = getProviderDetails(provider);
    expect(details).toEqual({
      baseURL: "https://api.groq.com/openai/v1",
      model: "llama-3.1-70b-versatile",
    });
  });

  it("should return the correct provider details for OpenRouter", () => {
    const provider = "OpenRouter";
    const details = getProviderDetails(provider);
    expect(details).toEqual({
      baseURL: "https://openrouter.ai/api/v1",
      model: "meta-llama/llama-3.1-8b-instruct:free",
    });
  });

  it("should throw an error for an invalid provider", () => {
    const provider = "InvalidProvider";
    expect(() => getProviderDetails(provider)).toThrow(
      `${provider} is invalid or is currently unsupported. Please choose from the supported providers:\n` +
        "1. Groq\n" +
        "2. OpenRouter"
    );
  });
});
