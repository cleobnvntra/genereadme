#!/usr/bin/env node

import fs from "fs";
import program from "./commander/setup.js";
import { getOptions } from "./commander/argHandlers.js";
import generateCompletion from "./openai/generateCompletion.js";

program.action(async (files) => {
  try {
    const { apiKey, provider, outputFile, temperature, tokenUsage } =
      getOptions();

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
