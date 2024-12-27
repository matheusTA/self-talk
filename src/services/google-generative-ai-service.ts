import { generateText, CoreMessage } from "ai";

import { getGoogleGenerativeAIProvider } from "@/lib/google-generative-ai";

export const GoogleGenerativeAiService = {
  startConversation: async (apiKey: string, prompt: string) => {
    const { text } = await generateText({
      model: getGoogleGenerativeAIProvider(apiKey),
      prompt,
    });

    return text;
  },

  continueConversation: async (apiKey: string, messages: CoreMessage[]) => {
    const { text } = await generateText({
      model: getGoogleGenerativeAIProvider(apiKey),
      messages,
    });

    return text;
  },
};
