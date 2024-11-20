import { Command } from "commander";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import addProgramOptions from "./addProgramOptions.js";
import addProgramArguments from "./addProgramArguments.js";
import overrideErrorOutput from "./overrideErrorOutput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

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
