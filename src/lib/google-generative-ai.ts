import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getGoogleGenerativeAIProvider(apiKey: string) {
  const googleAIProvider = createGoogleGenerativeAI({
    apiKey,
  });

  return googleAIProvider("gemini-1.5-pro");
}
