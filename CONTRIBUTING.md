# Contributing to GENEREADME

Thank you for considering contributing to GENEREADME! Please follow the guidelines below to set up your environment to start contributing.

# Getting Started

1. **Fork and Clone the repo:** Start by forking the repository and cloning it to your local machine.

```bash
git clone https://github.com/<your-username>/genereadme.git
cd genereadme
```

2. **Install Dependencies:** Make sure you have Node.js installed and install the required dependencies.

```bash
npm install -g .
```

3. **Configuration:** Multiple ways to configure options.

#### .env

```env
API_KEY=your-api-key
```

#### genereadme-config.toml

```toml
apiKey = "your-api-key"
provider = "openrouter" or "groq"
output = "output-file.md"
temperature = 0.5
tokenUsage = true
```

4. **Formatting & Linting**: Commands you can use to ensure the formatting of the code stays consistent.

#### Formatting

This command will run the [prettier](https://prettier.io/docs/en/) formatter and formats the files in place according to the prettier rules.

```bash
npm run format
```

This command will run the [prettier](https://prettier.io/docs/en/) formatter to check whether the files are formatted or not. Unlike the previous command, this only checks and does not make any changes.

```bash
npm run format:check
```

#### Linting

This command will run the [ESLint](https://eslint.org/docs/latest/) linter and checks for any linting issues. This command only checks for any existing issues, but does not make any changes.

```bash
npm run lint
```

This command will run the [ESLint](https://eslint.org/docs/latest/) linter which checks for any linting issues while also fixing them.

```bash
npm run lint:fix
```

#### Pre-commit hooks

The project also has pre-commit hooks which will automatically run the formatter and linter on any staged files when committing changes, which uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged).

# Notable Dependencies

### [OpenAI](https://openai.com/)

OpenAI is an artificial intelligence research organization and technology provider that develops cutting-edge machine learning models, including large language models such as GPT, to enable natural language understanding and generation. These models can perform a wide variety of tasks, such as text completion, conversation, content creation, and more, by learning from vast datasets and generating human-like responses. OpenAI's APIs allow developers to integrate advanced AI capabilities into applications, making it a powerful tool for automation, chatbots, and natural language processing.

```
npm install openai
```

### [Commander.js](https://www.npmjs.com/package/commander)

A library for creating command-line interfaces in Node.js. It provides a user-friendly way to define commands, arguments, and even subcommands for a CLI tool. It handles parsing of trhe command-line arguments, provides help and error messages, and makes it easy to organize your tool's functionality.

```
npm install commander
```

# Running the Tool

Run the tool with the provided sample files or your own files:

```bash
genereadme <files>
genereadme examples/sum.js
genereadme examples/createUser.js examples/sum.js
```

# Submitting Changes

1. **Create a Branch:** Always create a new branch for your work.

```bash
git checkout -b fix/your-branch-name
git checkout -b feat/your-branch-name
```

2. **Make your changes:** Provide clear and concise commit messages and descriptions.

3. **Run tests:** Ensure that any changes made do not break any existing functionality.

4. **Submit a PR:** Push your branch to your forked repository and open a pull request to the main repository. In the following PR, please explain the changes made and how they work.
