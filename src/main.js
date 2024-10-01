#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import toml from "toml";
import program from "./commander/setup.js";
import { getOptions } from "./commander/argHandlers.js";
import generateCompletion from "./openai/generateCompletion.js";

program.action(async (files) => {
  try {
    const config = readConfigFile();
    console.log("Config file content:", config);
    const options = getOptions();
    console.log("Options:", options);

    // Filter out undefined values from options
    Object.keys(options).forEach(key => options[key] === undefined ? delete options[key] : {})

    console.log("Filtered Options:", options);
    
    const finalOptions = { ...config, ...options };

    const { apiKey, provider, outputFile, temperature, tokenUsage } = finalOptions;

    console.log("Final Options:", finalOptions);

    let totalPromptTokensUsed = 0;
    let totalCompletionTokensUsed = 0;
    let combinedContent = "";

    for (const file of files) {
      const { promptTokensUsed, completionTokensUsed, outputContent } =
        await generateCompletion(
          file,
          apiKey,
          provider,
          outputFile,
          temperature
        );

      if (tokenUsage) {
        totalPromptTokensUsed += promptTokensUsed;
        totalCompletionTokensUsed += completionTokensUsed;
      }

      if (outputFile) {
        combinedContent += outputContent + "\n\n";
      }
    }

    if (outputFile) {
      fs.writeFileSync(`./outputs/${outputFile}`, combinedContent, "utf-8");
      console.log(`${outputFile} has been generated successfully!`);
      console.log(`${combinedContent}`);
    }

    if (tokenUsage) {
      console.error(`Prompt tokens used: [${totalPromptTokensUsed}]`);
      console.error(`Completion tokens used: [${totalCompletionTokensUsed}]`);
    }
  } catch (error) {
    console.error("Error generating README:", error.message);
    process.exit(1);
  }
});

function readConfigFile() {
  const homeDir = os.homedir();
  const configFilePath = path.join(homeDir, "./genereadme-config.toml");

  if (fs.existsSync(configFilePath)) {
    try {
      const configFileContent = fs.readFileSync(configFilePath, "utf-8");
     
      return toml.parse(configFileContent);
    } catch (error) {
      console.error("Error parsing the config file:", error.message);
      process.exit(1);
    }
  }
  return {};
}

function main() {
  program.parse(process.argv);
}

main();
