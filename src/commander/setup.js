import { Command } from "commander";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

// https://www.npmjs.com/package/commander
const program = new Command();

program
  .name(packageJson.name)
  .usage("<filename> [options]")
  .description(
    "CLI tool to generate a README file explaining a source code file"
  )
  .helpCommand(false)
  .addHelpText("after", "\nSupported providers: [Groq, OpenRouter]")
  .version(
    `${packageJson.name} ${packageJson.version}`,
    "-v, --version",
    "Outputs the tool name and current version"
  )
  .option("-p, --provider <provider>", "Provider for the chat completions")
  .option("-o, --output <filename>", "output result to specified filename")
  .option("-a, --api-key <key>", "API key for the Groq API")
  .option(
    "-t, --temperature <temperature>",
    "Temperature for the chat completions"
  )
  .option("-tu, --token-usage", "Show prompt and completion token usage")
  .configureOutput({
    outputError: (str) => {
      if (str.includes("error: missing required argument")) {
        console.error(
          "Error: No source code file provided. Please provide a valid source code file to process.\n\nuse command: genereadme <files...>"
        );
        process.exit(1);
      } else {
        console.error(err);
        process.exit(1);
      }
    },
  })
  .argument("<file...>", "Source code file to process");

export default program;
