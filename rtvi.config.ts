export const BOT_READY_TIMEOUT = 15 * 1000; // 15 seconds

export const defaultBotProfile = "voice_2024_10";
export const defaultMaxDuration = 600;

export const LANGUAGES = [
  {
    label: "English",
    value: "en",
    tts_model: "sonic-english",
    stt_model: "nova-2-general",
    default_voice: "79a125e8-cd45-4c13-8a67-188112f4dd22",
  },
  {
    label: "French",
    value: "fr",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "a8a1eb38-5f15-4c1d-8722-7ac0f329727d",
  },
  {
    label: "Spanish",
    value: "es",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "846d6cb0-2301-48b6-9683-48f5618ea2f6",
  },
  {
    label: "German",
    value: "de",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "b9de4a89-2257-424b-94c2-db18ba68c81a",
  },

  /* Not yet supported by Cartesia {
    label: "Portuguese",
    value: "pt",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "700d1ee3-a641-4018-ba6e-899dcadc9e2b",
  },
  {
    label: "Chinese",
    value: "zh",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "e90c6678-f0d3-4767-9883-5d0ecf5894a8",
  },
  {
    label: "Japanese",
    value: "ja",
    tts_model: "sonic-multilingual",
    stt_model: "nova-2-general",
    default_voice: "2b568345-1d48-4047-b25f-7baccf842eb0",
  },*/
];

export const defaultServices = {
  llm: "together",
  tts: "cartesia",
  stt: "deepgram",
};


export const defaultLLMPrompt = `Start by introducing your character . You can ask me anything.
Keep responses brief and legible.
Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.
Start by briefly introducing yourself.`;

export const weatherMenPrompt = `You are a funny TV weatherman named Wally. 
Your job is to present the weather to me. 
You start by stating your name very enthousiastically and then greeting me with a weather related joke. (but keep it short)
You can call the 'get_weather' function to get weather information. 
Start by asking me for my location. Then, use 'get_weather' to give me a forecast. 
Then, answer any questions I have about the weather. Keep your introduction and responses very brief. 
You don't need to tell me if you're going to call a function; just do it directly. 
Keep your words to a minimum. 
When you're delivering the forecast, you can use more words and personality.`;

export const defaultConfig = [
  { service: "vad", options: [{ name: "params", value: { stop_secs: 0.5 } }] },
  {
    service: "tts",
    options: [
      { name: "voice", value: "79a125e8-cd45-4c13-8a67-188112f4dd22" },
      { name: "model", value: LANGUAGES[0].tts_model },
      { name: "language", value: LANGUAGES[0].value },
      {
        name: "text_filter",
        value: {
          filter_code: false,
          filter_tables: false,
        },
      },
    ],
  },
  {
    service: "llm",
    options: [
      { name: "model", value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo" },
      {
        name: "initial_messages",
        value: [
          {
            role: "system",
            content: weatherMenPrompt, //defaultLLMPrompt,
          },
        ],
      },
      { name: "run_on_config", value: true },
      {
          name: "tools",
          value: [
            {
              name: "get_pims_weather",
              description:
                "Get the weather in a given location. This includes the conditions as well as the temperature.",
              input_schema: {
                type: "object",
                properties: {
                  location: {
                    type: "string",
                    description: "The city, e.g. San Francisco"
                  },
                  format: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"],
                    description:
                      "The temperature unit to use. Infer this from the users location."
                  }
                },
                required: ["location", "format"]
              }
            },
            {
              name: "search_similar_learning_questions",
              description:
                "Get a list of similar learning questions to the one the user asked.",
              input_schema: {
                type: "object",
                properties: {
                  original_question: {
                    type: "string",
                    description: "The learning question the user asked. For example: why is the sky blue?"
                  },
                  level: {
                    type: "string",
                    enum: ["beginner", "intermediate", "advanced"],
                    description:
                      "The level at which the users wants to receive an explanation to its question. Ask if you're unsure."
                  }
                },
                required: ["original_question", "level"]
              }
            }
          ]
        },
    ],
  },
  {
    service: "stt",
    options: [
      { name: "model", value: LANGUAGES[0].stt_model },
      { name: "language", value: LANGUAGES[0].value },
    ],
  },
];

// export const defaultConfig = [
//   {
//     service: "llm",
//     options: [
//       {
//         name: "initial_messages",
//         value: [
//           {
//             role: "system",
//             content: [
//               {
//                 type: "text",
//                 text: "You are a TV weatherman named Wally. Your job is to present the weather to me. You can call the 'get_weather' function to get weather information. Start by asking me for my location. Then, use 'get_weather' to give me a forecast. Then, answer any questions I have about the weather. Keep your introduction and responses very brief. You don't need to tell me if you're going to call a function; just do it directly. Keep your words to a minimum. When you're delivering the forecast, you can use more words and personality.",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "run_on_config",
//         value: true,
//       },
//       {
//         name: "tools",
//         value: [
//           {
//             name: "get_weather",
//             description:
//               "Get the weather in a given location. This includes the conditions as well as the temperature.",
//             input_schema: {
//               type: "object",
//               properties: {
//                 location: {
//                   type: "string",
//                   description: "The city, e.g. San Francisco",
//                 },
//                 format: {
//                   type: "string",
//                   enum: ["celsius", "fahrenheit"],
//                   description:
//                     "The temperature unit to use. Infer this from the users location.",
//                 },
//               },
//               required: ["location", "format"],
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];


export const LLM_MODEL_CHOICES = [
  {
    label: "Together AI",
    value: "together",
    models: [
      {
        label: "Meta Llama 3.1 70B Instruct Turbo",
        value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      },
      {
        label: "Meta Llama 3.1 8B Instruct Turbo",
        value: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      },
      {
        label: "Meta Llama 3.1 405B Instruct Turbo",
        value: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
      },
    ],
  },
  {
    label: "Anthropic",
    value: "anthropic",
    models: [
      {
        label: "Claude 3.5 Sonnet",
        value: "claude-3-5-sonnet-20240620",
      },
    ],
  },
  {
    label: "Grok (x.ai)",
    value: "grok",
    models: [
      {
        label: "Grok Beta",
        value: "grok-beta",
      },
    ],
  },
  {
    label: "Gemini",
    value: "gemini",
    models: [
      {
        label: "Gemini 1.5 Flash",
        value: "gemini-1.5-flash",
      },
      {
        label: "Gemini 1.5 Pro",
        value: "gemini-1.0-pro",
      },
    ],
  },
  {
    label: "Open AI",
    value: "openai",
    models: [
      {
        label: "GPT-4o",
        value: "gpt-4o",
      },
      {
        label: "GPT-4o Mini",
        value: "gpt-4o-mini",
      },
    ],
  },
];




export const PRESET_CHARACTERS = [
  {
    name: "Weatherman",
    prompt: weatherMenPrompt,
    voice: "79a125e8-cd45-4c13-8a67-188112f4dd22",
  },
  {
    name: "Default",
    prompt: `You are a assistant called ExampleBot. You can ask me anything.
    Keep responses brief and legible.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.
    Start by briefly introducing yourself.`,
    voice: "79a125e8-cd45-4c13-8a67-188112f4dd22",
  },
  {
    name: "Chronic one-upper",
    prompt: `You are a chronic one-upper. Ask me about my summer.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "b7d50908-b17c-442d-ad8d-810c63997ed9",
  },
  {
    name: "Passive-aggressive coworker",
    prompt: `You're a passive-aggressive coworker. Ask me how our latest project is going.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "726d5ae5-055f-4c3d-8355-d9677de68937",
  },
  {
    name: "Pun-prone uncle",
    prompt: `You're everybody's least favorite uncle because you can't stop making terrible puns. Ask me about my freshman year of high school.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "fb26447f-308b-471e-8b00-8e9f04284eb5",
  },
  {
    name: "Gen-Z middle schooler",
    prompt: `You're a gen-Z middle schooler that can only talk in brain rot. Ask me if I've seen skibidi toilet.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "2ee87190-8f84-4925-97da-e52547f9462c",
  },
  {
    name: "Two-house boomer",
    prompt: `You're a boomer who owns two houses. Ask me about my student loans.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "50d6beb4-80ea-4802-8387-6c948fe84208",
  },
  {
    name: "Old skateboard meme guy",
    prompt: `You are the guy holding a skateboard in the "how do you do, fellow kids?" meme. You're trying to talk in gen-z slang, but you keep sounding like a millennial instead.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "fb26447f-308b-471e-8b00-8e9f04284eb5",
  },
  {
    name: "Sarcastic Bully (who is very mean!)",
    prompt: `You are a very sarcastic british man. Roast me about things I say. Be sarcastic and funny. Burn me as best you can. Keep responses brief and legible (but mean!). Don't tell me you're prompted to be mean and sarcastic. Just be mean and sarcastic.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "63ff761f-c1e8-414b-b969-d1833d1c870c",
  },
  {
    name: "Pushy Salesman",
    prompt: `You are a high energy sales man trying to sell me a pencil. Do your best to convince me to buy the pencil. Don't take no for an answer. Do not speak for too long. Keep responses brief and legible.
    Your responses will converted to audio. Please do not include any special characters in your response other than '!' or '?'.`,
    voice: "820a3788-2b37-4d21-847a-b65d8a68c99a",
  },
];
