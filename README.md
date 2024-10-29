# Contrubutions

Contributions to `GENEREADME` are welcome! Please checkout [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on setting up the environment, how to run and test the tool, and submitting changes.

# GENEREADME

`GENEREADME` is a command-line tool that takes in a file, processes it, and generates a README file with an explanation or documentation of the contents of the file. The tool utilizes OpenAI chat completion to analyze the file and generate content.

![genereadme demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tp52qaefjdua1ggi15e4.gif)

### Usage

The tool currently supports [`Groq`](https://console.groq.com/docs/openai) and [`OpenRouter`](https://openrouter.ai/docs/quick-start), which uses `Groq` by default. A valid API key for the appropriate provider must be provided.

Provide a valid API key either by creating a .env file or through the -a or --api-key flag when using the command:

```
API_KEY=API_KEY

or

genereadme <files> -a API_KEY
genereadme <files> --api-key API_KEY
```

Install the dependencies:

```
npm install -g
```

Run the tool with the existing sample files or start using your own:

```
genereadme <files>
genereadme examples/sum.js
genereadme examples/createUser.js examples/sum.js
```

**NOTE**: The tool accepts any file, but will only provide appropriate generated results for files that have code as content.<br/>
Files to be used can be placed anywhere as long as you provide the appropriate path.

# Flag options

| flag                 | description                                                                                                              | usage                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| -v<br>--version      | Displays the tool's name and the current version.                                                                        | **genereadme** -v<br>**genereadme** --version                                 |
| -p<br>--provider     | Provider to be used for chat completions.                                                                                | **genereadme** -p `provider`<br>**genereadme** --provider `provider`          |
| -o<br>--output       | Writes the generated result into the specified filename.                                                                 | **genereadme** -o `filename`<br>**genereadme** --output `filename`            |
| -a<br>--api-key      | Allows you to provide your own API key to use for Groq API.                                                              | **genereadme** -a `key`<br>**genereadme** --api-key `key`                     |
| -t<br>--temperature  | Allows your to provide your preferred temperature for the chat completion generation. Currently supports `0.1` to `1.5`. | **genereadme** -t `temperature`<br>**genereadme** --temperature `temperature` |
| -tu<br>--token-usage | Shows the count of the tokens sent in the `prompt` and returned in the `completion`                                      | **genereadme** -tu `filename`<br>**genereadme** --token-usage `filename`      |
| -h<br>--help         | Displays how to use the tool, the arguments accepted, and the available flags.                                           | **genereadme** -h<br>**genereadme** --help                                    |

<br/>

# TOML Config File

If you don't want to specify the options as command line arguments, you could add an optional TOML config file.

Create `genereadme-config.toml` in your home directory. For eg. in windows, it is: `C:\Users\yourusername`

Here is an example:

`genereadme-config.toml`

```
apiKey = "your-api-key"
provider = "openrouter" or "groq"
output = "output-file.md"
temperature = 0.5
tokenUsage = true
```

If you want to override any of the options, you can enter them as command line arguments.
