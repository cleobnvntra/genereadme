#!/usr/bin/env node
import fs from "fs";
import createProgram from "./commander/setup.js";
import { getOptions } from "./args/argHandlers.js";
import generateCompletion from "./openai/generateCompletion.js";

export default async function main() {
  const program = createProgram();
  program.action(async (files, args) => {
    try {
      const { apiKey, provider, outputFile, temperature, tokenUsage } = getOptions(args);

      let totalPromptTokensUsed = 0;
      let totalCompletionTokensUsed = 0;
      let combinedContent = "";

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const { promptTokensUsed, completionTokensUsed, outputContent } = await generateCompletion(
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
          combinedContent += outputContent;
          if (i !== files.length - 1) {
            combinedContent += "\n\n";
          }
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
      console.error(`Error generating README: ${error.message}`);

      process.exit(1);
    }
  });
  await program.parseAsync(process.argv);
}

if (process.env.NODE_ENV !== "test") {
  main();
}
