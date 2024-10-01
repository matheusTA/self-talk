import { create } from "zustand";
import { persist } from "zustand/middleware";

export const AiProviderModelEnum = {
  OPENAI: "openai",
  GEMINI: "gemini",
} as const;

export type AiProviderModel =
  (typeof AiProviderModelEnum)[keyof typeof AiProviderModelEnum];

export type AiProvider = {
  model: AiProviderModel;
  accessKey: string;
};

type State = {
  aiProvider: AiProvider | null;
};

type Actions = {
  setAiProvider: (aiProvider: AiProvider) => void;
  removeAiProvider: () => void;
};

export const useAiProviderStore = create<State & Actions>()(
  persist(
    (set) => ({
      aiProvider: null,
      setAiProvider: (aiProvider) => set({ aiProvider }),
      removeAiProvider: () => set({ aiProvider: null }),
    }),
    { name: "@self-talk-ai-provider", skipHydration: true }
  )
);
