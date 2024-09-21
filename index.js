import { Command } from "commander";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

// https://www.npmjs.com/package/commander
const program = new Command();

program
  .name(packageJson.name)
  .usage("[command] [options]")
  .description(
    "CLI tool to generate a README file explaining a source code file"
  )
  .helpCommand(false)
  .version(
    `${packageJson.name} ${packageJson.version}`,
    "-v, --version",
    "Outputs the tool name and current version"
  )
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
  .argument("<file...>", "Source code file to process")
  .action(async (files) => {
    try {
      const apiKey = program.opts().apiKey;
      let client;
      if (apiKey || process.env.GROQ_API_KEY) {
        client = new Groq({
          apiKey: apiKey ? apiKey : process.env.GROQ_API_KEY,
        });
      } else {
        throw new Error(
          "Error initializing Groq client. Please provide a valid GROQ_API_KEY in the .env file or use the -a or --api-key to provide a valid api key."
        );
      }

      const outputFile = program.opts().output;

      if (outputFile) {
        if (!outputFile.endsWith(".md")) {
          throw new Error(
            "Invalid filename provided. The filename must be a markdown file (.md)."
          );
        }
      }

      let promptTokens = 0;
      let completionTokens = 0;

      let combinedContent = "";
      for (const file of files) {
        const codeContent = fs.readFileSync(file, "utf-8");

        const prompt = `I want you to generate a README.md file explaining the contents of the given source code.
        VERY IMPORTANT NOTES:
        - Only process the file if the file is a source code file.
        - If the file does not contain any code, do not generate the README.
        - If the file is not a source code file, do not generate the README.
        - If the file is not a source code file or does not contain any code, just respond with "Invalid file" and nothing else.
        - It is okay if the file contains some non-related code or comments. As long as the content is majority code, generate the README.
        - **THIS IS VERY IMPORTANT**: The response must only contain "Invalid file" if the file is not a source code file or does not contain any code.

        When processing the file, generate the README with the following requirements:
        The README should have a title, description, and code snippets with explanations.
        The code snippet should be pieces of code from the source code file. Not the entire code.
        Every block of code should have an explanation.
        The title should be # tag, subheadings should be ## tags, and code snippets should be in a code block.
        Do not use - or _ or = for making headings. Only use hashtags for headings.
        Do not use "Title" as the title header. Just use directly the title for the documentation as the title header.
        For example, if the code is a function called "sum", the title should be "sum". If the code is about a class, then the title should be the name of the class. etc...
        If the file contains more than one major topic, then there should be multiple title headers with their respective subheadings and code snippets.
        For example, if a single file contains code with multiple functions, then there should be multiple title headers for each function with their respective subheadings and code snippets.
        However, if the file contains one class with multiple functions as the class methods, then the title should be the class name and the functions will be subheadings.
        Code snippets should be in a code block using the triple backticks.
        When providing code snippets, you dont need to write a heading for it. Just provide the code snippet below its respective topic in the appropdiate code black backticks.
        There should not be a heading called "Code Snippets" when providing a code snippet based on the file.
        The generated README must be according to README documentation standards.
        This README will be used to document the source code file. Generate the README as if you are documenting the source code for a project.

        ${codeContent}`;

        let response;
        const temp = program.opts().temperature
          ? parseFloat(program.opts().temperature)
          : 0.7;

        if (temp <= 0 || temp > 1.5) {
          throw new Error(
            "Invalid temperature provided. The temperature can only be from 0.1 to 1.5."
          );
        }

        try {
          console.log(`Generating README with ${temp} temperature...`);
          response = await client.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-70b-versatile",
            temperature: temp,
          });
        } catch (error) {
          console.error("Error generating README:", error.error.error.message);
          process.exit(1);
        }

        promptTokens += response.usage.prompt_tokens;
        completionTokens += response.usage.completion_tokens;

        if (response.choices[0].message.content === "Invalid file") {
          throw new Error(
            "The file passed is either not majorly a source code, does not contain any code, or is not a valid file."
          );
        }

        const outputContent = response.choices[0].message.content;

        if (outputFile) {
          combinedContent += outputContent + "\n\n";
        } else {
          const fileName = path.parse(file).name;
          const outputPath = `${fileName}_README.md`;

          fs.writeFileSync(
            outputPath,
            response.choices[0].message.content,
            "utf-8"
          );
          console.log(`${fileName}_README.md has been generated successfully!`);
          console.log(`${response.choices[0].message.content}`);
        }
      }

      if (outputFile) {
        fs.writeFileSync(outputFile, combinedContent, "utf-8");
        console.log(`${outputFile} has been generated successfully!`);
        console.log(`${combinedContent}`);
      }

      if (program.opts().tokenUsage) {
        console.error(`Prompt tokens: ${promptTokens}`);
        console.error(`Completion tokens: ${completionTokens}`);
      }
    } catch (error) {
      console.error("Error generating README:", error.message);
      process.exit(1);
    }
    process.exit(0);
  });

program.parse(process.argv);
