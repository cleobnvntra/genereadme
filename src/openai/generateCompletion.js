import fs from "fs";
import path from "path";
import createClient from "./client.js";
import generatePrompt from "../prompts/generatePrompt.js";

/**
 * Generate a README file from the source code.
 * @param {string} file - The path to the source code file.
 * @param {string} apiKey - The OpenAI API key.
 * @param {string} provider - The OpenAI API provider.
 * @param {string} outputFile - The output file path.
 * @param {number} temp - The temperature value for the completion.
 * @returns {Object} The prompt tokens, completion tokens, and output content.
 */
export default async function generateCompletion(
  file,
  apiKey,
  provider="Groq",
  outputFile,
  temp=0.7
) {
  const { client, model } = createClient(provider, apiKey);
  const codeContent = fs.readFileSync(file, "utf-8");
  const prompt = generatePrompt(codeContent);

  let response;

  try {
    console.log(`Generating README...`);
    console.log(`Provider: ${provider}`);
    console.log(`Temperature: ${temp}`);
    response = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
      temperature: temp,
    });
  } catch (error) {
    console.error("Error generating README:", error.message);
    process.exit(1);
  }

  let promptTokensUsed = response.usage.prompt_tokens;
  let completionTokensUsed = response.usage.completion_tokens;
  const outputContent = response.choices[0].message.content;
  if (outputContent === "Invalid file") {
    throw new Error(
      "The file passed is either not majorly a source code, does not contain any code, or is not a valid file."
    );
  }

  if (!outputFile) {
    const fileName = path.parse(file).name;
    const outputPath = `./outputs/${fileName}_README.md`;

    fs.writeFileSync(outputPath, outputContent, "utf-8");
    console.log(`${fileName}_README.md has been generated successfully!`);
    console.log(`${outputContent}`);
  }

  return { promptTokensUsed, completionTokensUsed, outputContent };
}
