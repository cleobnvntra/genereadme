#!/usr/bin/env node
import fs from "fs";
import program from "./commander/setup.js";
import { getOptions } from "./commander/argHandlers.js";
import generateCompletion from "./openai/generateCompletion.js";
import { readConfigFile } from "./utils/readConfig.js";

program.action(async (files) => {
  try {
    const config = readConfigFile();
    const options = getOptions();

    // Filter out undefined values from options
    Object.keys(options).forEach(key => options[key] === undefined ? delete options[key] : {})
    
    //If arguments are passed in the command line, they will override the config file
    const finalOptions = { ...config, ...options };

    const { apiKey, provider, outputFile, temperature, tokenUsage } = finalOptions;

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

function main() {
  program.parse(process.argv);
}

main();
