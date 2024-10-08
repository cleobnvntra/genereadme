/**
 * Generates the prompt for the user to generate a README file for the given source code.
 * @param {string} codeContent - The content of the source code file.
 * @returns {string} The prompt for the user.
 */
export default function generatePrompt(codeContent) {
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
        Every block of code should have an explanation.
        The title should be # tag, subheadings should be ## tags, and code snippets should be in a code block.
        Do not use - or _ or = for making headings. Only use hashtags for headings.
        Do not use "Title" as the title header. Just use directly the title for the documentation as the title header.
        For example, if the code is a function called "sum", the title should be "sum". If the code is about a class, then the title should be the name of the class. etc...
        If the file contains more than one major topic, then there should be multiple title headers with their respective subheadings and code snippets.
        For example, if a single file contains code with multiple functions, then there should be multiple title headers for each function with their respective subheadings and code snippets.
        However, if the file contains one class with multiple functions as the class methods, then the title should be the class name and the functions will be subheadings.
        Code snippets should be in a code block using the triple backticks.
        When providing code snippets, you dont need to write a heading for it. Just provide the code snippet below its respective topic in the appropdiate code black backticks.
        There should not be a heading called "Code Snippets" when providing a code snippet based on the file.
        The generated README must be according to README documentation standards.
        This README will be used to document the source code file. Generate the README as if you are documenting the source code for a project.

        ${codeContent}`;
  return prompt;
}
