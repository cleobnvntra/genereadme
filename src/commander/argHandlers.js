import program from "./setup.js";
import { readConfigFile } from "../../utils/readConfig.js";

/**
 * Retrieves the flag options in the command line arguments.
 * @returns {Object} The options object.
 */
export function getOptions() {

   //If arguments are passed in the command line, they will override the config file values.
  const config = readConfigFile();
  const apiKey = program.opts().apiKey || config.apiKey;
  const provider = program.opts().provider || config.provider;
  const outputFile = program.opts().output || config.outputFile;
  const temperature = program.opts().temperature  || config.temperature;
  const tokenUsage = program.opts().tokenUsage || config.tokenUsage;

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
