export default function overrideErrorOutput(program) {
  program.configureOutput({
    outputError: (str) => {
      if (str.includes("error: missing required argument")) {
        console.error(
          "Error: No source code file provided. Please provide a valid source code file to process.\n\nuse command: genereadme <files...>"
        );

        process.exit(1);
      } else {
        console.error(str);

        process.exit(1);
      }
    },
  });
}
