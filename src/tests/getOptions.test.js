import { getOptions } from "../args/argHandlers.js";
import { expect } from "@jest/globals";

describe("getOptions", () => {
  it("should not throw an error for temperatures between 0.1 and 1.5", () => {
    expect(() => getOptions({ temperature: 0.5 })).not.toThrow();
  });

  it("should throw an error for temperatures above 1.5", () => {
    expect(() => getOptions({ temperature: 2 })).toThrow(
      "Invalid temperature provided. The temperature can only be from 0.1 to 1.5."
    );
  });

  it("should throw an error for temperatures below 0.1", () => {
    expect(() => getOptions({ temperature: -0.1 })).toThrow(
      "Invalid temperature provided. The temperature can only be from 0.1 to 1.5."
    );
  });

  it("should throw an error for invalid output file types", () => {
    expect(() => getOptions({ output: "file.txt" })).toThrow(
      "Invalid filename provided. The filename must be a markdown file (.md)."
    );
  });

  it("should not throw an error for valid output file types", () => {
    expect(() => getOptions({ output: "file.md" })).not.toThrow();
  });

  it("not providing any options should default to toml config options, undefined if doesnt exist", () => {
    const options = getOptions({});
    expect(options).toEqual({
      apiKey: undefined,
      provider: undefined,
      outputFile: undefined,
      temperature: undefined,
      tokenUsage: undefined,
    });
  });
});
