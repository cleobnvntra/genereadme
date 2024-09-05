# GENERATEME
RM Generator is a command-line tool that takes in a file and generates a README.md file that explains what the inputted file does by utilizing an LLM.

## Dependencies

### Ollama

A tool that allows running of open-source large language models (LLMs) locally. It supports a huge variety of models such as codellama, an LLM that can use text prompts to generate and discuss code, which is being utilized by the tool.
```
npm install ollama
```

### Commander.js

A library for creating command-line interfaces in Node.js. It provides a user-friendly way to define commands, arguments, and even subcommands for a CLI tool. It handles parsing of trhe command-line arguments, provides help and error messages, and makes it easy to organize your tool's functionality.
```
npm install commander
```