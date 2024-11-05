export const mockGroqResponse = {
  id: "chatcmpl-56ba2f5e-23d1-4ee8-9cec-29ebdb24a9a7",
  object: "chat.completion",
  created: 1730773792,
  model: "llama-3.1-70b-versatile",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "Mocked content from Groq",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    queue_time: 0.003472937999999995,
    prompt_tokens: 600,
    prompt_time: 0.116071872,
    completion_tokens: 181,
    completion_time: 0.724,
    total_tokens: 781,
    total_time: 0.840071872,
  },
  system_fingerprint: "fp_b3ae7e594e",
  x_groq: { id: "req_01jbx2gdnpefbbgjg6zx71whe2" },
};

export const mockOpenRouterResponse = {
  id: "gen-1730774863-jKNzyiObKbWkWxuhcBAc",
  provider: "SambaNova",
  model: "meta-llama/llama-3.1-8b-instruct:free",
  object: "chat.completion",
  created: 1730774863,
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "Mocked content from OpenRouter",
        refusal: "",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  system_fingerprint: "fastcoe",
  usage: { prompt_tokens: 600, completion_tokens: 132, total_tokens: 732 },
};
