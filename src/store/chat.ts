import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ChatConfigDurationEnum = {
  SHORT: "short",
  MEDION: "medion",
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

type ChatMessages = {
  role: "user" | "assistant";
  content: string;
};

type State = {
  config: ChatConfig | null;
  messages: ChatMessages[];
};

type Actions = {
  setConfig: (config: ChatConfig) => void;
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set) => ({
      config: null,
      messages: [],
      setConfig: (config) => set({ config }),
    }),
    { name: "@self-talk-chat", skipHydration: true }
  )
);
