# GENERATEME
RM Generator is a command-line tool that takes in a file and generates a README.md file that explains what the inputted file does by utilizing an LLM.

# Dependencies

## Ollama

A tool that allows running of open-source large language models (LLMs) locally. It supports a huge variety of models such as codellama, an LLM that can use text prompts to generate and discuss code, which is being utilized by the tool.
```
npm install ollama
```

### Usage
```
command:

ollama run codellama "Write me a function that takes in two integers and produces their sum"
```

```
output:

[PYTHON]
def sum_two_numbers(num1, num2):
    return num1 + num2
[/PYTHON]
[TESTS]
# Test case 1:
assert sum_two_numbers(1, 2) == 3
# Test case 2:
assert sum_two_numbers(5, 6) == 11
# Test case 3:
assert sum_two_numbers(-3, 5) == 2
[/TESTS]
```

## Commander.js

A library for creating command-line interfaces in Node.js. It provides a user-friendly way to define commands, arguments, and even subcommands for a CLI tool. It handles parsing of trhe command-line arguments, provides help and error messages, and makes it easy to organize your tool's functionality.
```
npm install commander
```