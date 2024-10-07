import { readConfigFile } from "../utils/readConfig.js";

/**
 * Retrieves the flag options in the command line arguments.
 * @returns {Object} The options object.
 */
export function getOptions(options) {
  //If arguments are passed in the command line, they will override the config file values.
  const config = readConfigFile();
  const apiKey = options.apiKey || process.env.API_KEY || config.apiKey;
  const provider = options.provider || config.provider;
  const outputFile = options.output || config.outputFile;
  const temperature = options.temperature || config.temperature;
  const tokenUsage = options.tokenUsage || config.tokenUsage;

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
