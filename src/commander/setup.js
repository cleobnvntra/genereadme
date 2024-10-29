import { Command } from "commander";
import { createRequire } from "module";
import addProgramOptions from "./addProgramOptions.js";
import addProgramArguments from "./addProgramArguments.js";
import overrideErrorOutput from "./overrideErrorOutput.js";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

export default function createProgram() {
  // https://www.npmjs.com/package/commander
  const program = new Command();

  program
    .name(packageJson.name)
    .usage("<filename> [options]")
    .description("CLI tool to generate a README file explaining a source code file")
    .helpCommand(false)
    .addHelpText("after", "\nSupported providers: [Groq, OpenRouter]")
    .version(
      `${packageJson.name} ${packageJson.version}`,
      "-v, --version",
      "Outputs the tool name and current version"
    );

  addProgramOptions(program);
  addProgramArguments(program);
  overrideErrorOutput(program);

  return program;
}
