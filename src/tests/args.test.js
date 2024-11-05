import nock from "nock";
import fs from "fs";
import path from "path";
import { expect, jest } from "@jest/globals";
import main from "../main";
import { mockGroqResponse } from "./mockResponse";

const originalArgv = [...process.argv];
const originalEnv = { ...process.env };

describe("overrideErrorOutput functionality", () => {
  const mockFile = path.resolve("path/to/mock/file.js");
  let consoleErrorSpy;
  let processExitSpy;

  beforeEach(() => {
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
    nock("https://api.groq.com/openai/v1").post("/chat/completions").reply(200, mockGroqResponse);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    processExitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest.spyOn(fs, "readFileSync").mockImplementation(() => "Mocked file content");
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
  });

  it("outputs a custom error message and exits if required argument is missing", async () => {
    process.argv = ["node", "main.js"];
    await main();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error: No source code file provided. Please provide a valid source code file to process.\n\nuse command: genereadme <files...>"
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it("outputs a default error message and exits if the error is not a missing required argument", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);
    process.argv = ["node", "main.js", mockFile, "--invalid-option"];
    await main();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("error: unknown option '--invalid-option'")
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});

describe("tokenUsage functionality", () => {
  let consoleErrorSpy;
  const mockFile = path.resolve("path/to/mock/file.js");
  const fileName = path.parse(mockFile).name;
  const mockApiKey = "mock-api-key";

  beforeEach(() => {
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
    nock("https://api.groq.com/openai/v1").post("/chat/completions").reply(200, mockGroqResponse);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest.spyOn(fs, "readFileSync").mockImplementation(() => "Mocked file content");
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
  });

  it("outputs the total prompt and completion tokens used", async () => {
    process.argv = ["node", "main.js", fileName, "--api-key", mockApiKey, "--token-usage"];
    await main();
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Prompt tokens used: [600]`);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Completion tokens used: [181]`);
  });
});

describe("missing API key", () => {
  let consoleErrorSpy;
  let processExitSpy;
  const mockFile = path.resolve("path/to/mock/file.js");
  const fileName = path.parse(mockFile).name;
  const mockProvider = "Groq";

  beforeEach(() => {
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
    process.env.API_KEY = undefined;
    nock("https://api.groq.com/openai/v1").post("/chat/completions").reply(200, mockGroqResponse);
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    processExitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest.spyOn(fs, "readFileSync").mockImplementation(() => "Mocked file content");
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
  });

  it("outputs an error message if the API key is missing", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);
    process.argv = ["node", "main.js", fileName, "--provider", mockProvider];

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error generating README: An API key is required to use the tool. Please provide a valid API key for the provider ${mockProvider}.`
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
