# GENEREADME

`GENEREADME` is a command-line tool that takes in a file, processes it, and generates a README file with an explanation or documentation of the contents of the file. The tool utilizes OpenAI chat completion to analyze the file and generate content.

### Usage

Provide a valid API key either by creating a .env file or through the -a or --api-key flag:

```
GROQ_API_KEY=API_KEY

or

genereadme -a API_KEY
genereadme --api-key API_KEY
```

Install the dependencies:

```
npm install
```

Run the tool with the existing sample files or start using your own:

```
genereadme <files>
genereadme examples/sum.js
genereadme examples/createUser.js examples/sum.js
```

**NOTE**: The tool accepts any file, but will only provide appropriate generated results for files that have code as content.<br/>
Files to be used can be placed anywhere as long as you provide the appropriate path.

<br/>

# Flag options

| flag                 | description                                                                                                              | usage                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| -v<br>--version      | Displays the tool's name and the current version.                                                                        | **genereadme** -v<br>**genereadme** --version                                 |
| -o<br>--output       | Writes the generated result into the specified filename.                                                                 | **genereadme** -o `filename`<br>**genereadme** --output `filename`            |
| -a<br>--api-key      | Allows you to provide your own API key to use for Groq API.                                                              | **genereadme** -a `key`<br>**genereadme** --api-key `key`                     |
| -t<br>--temperature  | Allows your to provide your preferred temperature for the chat completion generation. Currently supports `0.1` to `1.5`. | **genereadme** -t `temperature`<br>**genereadme** --temperature `temperature` |
| -tu<br>--token-usage | Shows the count of the tokens sent in the `prompt` and returned in the `completion`                                      | **genereadme** -tu `filename`<br>**genereadme** --token-usage `filename`      |
| -h<br>--help         | Displays how to use the tool, the arguments accepted, and the available flags.                                           | **genereadme** -h<br>**genereadme** --help                                    |

<br/>

# Dependencies

### [Groq](https://groq.com/)

A powerful SDK that allows querying and processing data efficiently. In this project, Groq is used to generate README content by analyzing the provided source code file and generating human-readable documentation based on it.

```
npm install groq-sdk
```

### [Commander.js](https://www.npmjs.com/package/commander)

A library for creating command-line interfaces in Node.js. It provides a user-friendly way to define commands, arguments, and even subcommands for a CLI tool. It handles parsing of trhe command-line arguments, provides help and error messages, and makes it easy to organize your tool's functionality.

```
npm install commander
```
