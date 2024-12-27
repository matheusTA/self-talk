import { CoreMessage } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ChatConfigDurationEnum = {
  SHORT: "short",
  MEDIUM: "medium",
  LONG: "long",
} as const;

export type ChatConfigDuration =
  (typeof ChatConfigDurationEnum)[keyof typeof ChatConfigDurationEnum];

type ChatConfig = {
  topic: string;
  voice: {
    lang: string;
    name: string;
    uri: string;
  };
  duration: ChatConfigDuration;
  prompt: string;
};

type State = {
  config: ChatConfig | null;
  messages: CoreMessage[];
};

type Actions = {
  resetChatStore: () => void;
  setUpChatStore: (config: ChatConfig, prompt: CoreMessage) => void;
  setConfig: (config: ChatConfig) => void;
  addMessage: (messages: CoreMessage[]) => void;
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set) => ({
      config: null,
      messages: [],
      resetChatStore: () => set({ config: null, messages: [] }),
      setUpChatStore: (config, prompt) => set({ config, messages: [prompt] }),
      setConfig: (config) => set({ config }),
      addMessage: (messages) =>
        set((state) => ({ messages: [...state.messages, ...messages] })),
    }),
    { name: "@self-talk-chat", skipHydration: true }
  )
);
