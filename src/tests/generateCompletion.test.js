import nock from "nock";
import fs from "fs";
import path from "path";
import { jest } from "@jest/globals";
import generateCompletion from "../openai/generateCompletion.js";
import { mockGroqResponse, mockOpenRouterResponse } from "./mockResponse.js";

describe("generateCompletion with different providers", () => {
  const mockApiKey = "mock-api-key";
  const mockFile = path.resolve("path/to/mock/file.js");
  const fileName = path.parse(mockFile).name;

  beforeEach(() => {
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest.spyOn(fs, "readFileSync").mockImplementation(() => "Mocked file content");
  });

  afterAll(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it("generates a README using Groq to a custom output file", async () => {
    nock("https://api.groq.com/openai/v1").post("/chat/completions").reply(200, mockGroqResponse);

    const result = await generateCompletion(fileName, mockApiKey, "Groq", null, 0.7);

    // Assertions for the result
    expect(result.promptTokensUsed).toBe(600);
    expect(result.completionTokensUsed).toBe(181);
    expect(result.outputContent).toBe("Mocked content from Groq");

    // Check that fs.writeFileSync was called with the expected content
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `./outputs/${fileName}_README.md`,
      "Mocked content from Groq",
      "utf-8"
    );
  });

  it("generates a README using OpenRouter to a custom output file", async () => {
    nock("https://openrouter.ai/api/v1")
      .post("/chat/completions")
      .reply(200, mockOpenRouterResponse);

    const result = await generateCompletion(fileName, mockApiKey, "OpenRouter", null, 0.7);

    // Assertions for the result
    expect(result.promptTokensUsed).toBe(600);
    expect(result.completionTokensUsed).toBe(132);
    expect(result.outputContent).toBe("Mocked content from OpenRouter");

    // Check that fs.writeFileSync was called with the expected content
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `./outputs/${fileName}_README.md`,
      "Mocked content from OpenRouter",
      "utf-8"
    );
  });
});
