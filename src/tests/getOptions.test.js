import { getOptions } from "../args/argHandlers.js";
import { expect } from "@jest/globals";

describe("getOptions", () => {
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
});
