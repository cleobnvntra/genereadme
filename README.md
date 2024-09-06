# GENEREADME
`GENEREADME` is a command-line tool that takes in a file, processes it, and generates a README file with an explanation or documentation of the contents of the file. The tool utilizes OpenAI chat completion to analyze the file and generate content.

# Dependencies

## Groq

A powerful SDK that allows querying and processing data efficiently. In this project, Groq is used to generate README content by analyzing the provided source code file and generating human-readable documentation based on it.
```
npm install groq-sdk
```

## Commander.js

A library for creating command-line interfaces in Node.js. It provides a user-friendly way to define commands, arguments, and even subcommands for a CLI tool. It handles parsing of trhe command-line arguments, provides help and error messages, and makes it easy to organize your tool's functionality.
```
npm install commander
```