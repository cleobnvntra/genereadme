import program from "./setup.js";

/**
 * Retrieves the flag options in the command line arguments.
 * @returns {Object} The options object.
 */
export function getOptions() {
  const apiKey = program.opts().apiKey;
  const provider = program.opts().provider;
  const outputFile = program.opts().output;
  const temperature = program.opts().temperature;
  const tokenUsage = program.opts().tokenUsage;

  if (outputFile && !outputFile.endsWith(".md")) {
    throw new Error(
      "Invalid filename provided. The filename must be a markdown file (.md)."
    );
  }

  if (temperature && (temperature <= 0 || temperature > 1.5)) {
    throw new Error(
      "Invalid temperature provided. The temperature can only be from 0.1 to 1.5."
    );
  }

  return { apiKey, provider, outputFile, temperature, tokenUsage };
}
