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

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
  );

program
  .command("generate")
  .description("Generate a README for the provided source code file")
  .argument("<file...>", "Source code file to process")
  .action(async (files) => {
    try {
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
        The title should be # tag, subheadings should be ## tags, and code snippets should be in a code block.
        Do not use - or _ or = for making headings. Only use hashtags for headings.
        Do not use "Title" as the title header. Just use directly the title for the documentation as the title header.
        For example, if the code is a function called "sum", the title should be "sum". If the code is about a class, then the title should be the name of the class. etc...
        If the file contains more than one major topic, then there should be multiple title headers with their respective subheadings and code snippets.
        For example, if a single file contains code with multiple functions, then there should be multiple title headers for each function with their respective subheadings and code snippets.
        However, if the file contains one class with multiple functions as the class methods, then the title should be the class name and the functions will be subheadings.
        Code snippets should be in a code block using the triple backticks.
        The generated README must be according to README documentation standards.
        This README will be used to document the source code file. Generate the README as if you are documenting the source code for a project.

        ${codeContent}`;

        const response = await client.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.1-70b-versatile",
          temperature: 1,
        });

        if (response.choices[0].message.content === "Invalid file") {
          throw new Error(
            "The file passed is either not majorly a source code, does not contain any code, or is not a valid file."
          );
        }

        const fileDir = path.dirname(file);
        const fileName = path.parse(file).name;
        console.log(fileName);
        const outputPath = path.join(fileDir, `${fileName}_README.md`);
        console.log(response);

        fs.writeFileSync(
          outputPath,
          response.choices[0].message.content,
          "utf-8"
        );
        console.log("README.md has been generated successfully!");
      }
    } catch (error) {
      console.error("Error generating README:", error);
    }
  });

program.parse(process.argv);
