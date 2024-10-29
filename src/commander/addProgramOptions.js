export default function addProgramOptions(program) {
  program

    .option("-p, --provider <provider>", "Provider for the chat completions")

    .option("-o, --output <filename>", "output result to specified filename")

    .option("-a, --api-key <key>", "API key for the Groq API")

    .option("-t, --temperature <temperature>", "Temperature for the chat completions")

    .option("-tu, --token-usage", "Show prompt and completion token usage");
}
