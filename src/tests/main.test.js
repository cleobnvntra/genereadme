import nock from "nock";
import fs from "fs";
import path from "path";
import { jest, expect } from "@jest/globals";
import main from "../main.js";
import { mockGroqResponse, mockOpenRouterResponse } from "./mockResponse.js";

describe("main function e2e", () => {
  const mockApiKey = "mock-api-key";
  const mockFile = path.resolve("path/to/mock/file.js");
  const fileName = path.parse(mockFile).name;
  const outputFile = "mockfile.md";

  beforeEach(() => {
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest.spyOn(fs, "readFileSync").mockImplementation(() => "Mocked file content");
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it("generates a README using Groq without a custom output file", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);
    nock("https://api.groq.com/openai/v1").post("/chat/completions").reply(200, mockGroqResponse);

    process.argv = [
      "node",
      "main.js",
      fileName,
      "--api-key",
      mockApiKey,
      "--provider",
      "Groq",
      "--temperature",
      "0.7",
      "--output",
      outputFile,
    ];

    await main();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `./outputs/${outputFile}`,
      "Mocked content from Groq", // Checks the content
      "utf-8"
    );
  });

  it("generates a README using OpenRouter without a custom output file", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);
    nock("https://openrouter.ai/api/v1")
      .post("/chat/completions")
      .reply(200, mockOpenRouterResponse);

    process.argv = [
      "node",
      "main.js",
      fileName,
      "--api-key",
      mockApiKey,
      "--provider",
      "OpenRouter",
      "--temperature",
      "0.7",
      "--output",
      outputFile,
    ];

    await main();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `./outputs/${outputFile}`,
      "Mocked content from OpenRouter", // Checks the content
      "utf-8"
    );
  });
});
