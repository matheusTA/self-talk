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
};

type State = {
  config: ChatConfig | null;
};

type Actions = {
  setConfig: (config: ChatConfig) => void;
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set) => ({
      config: null,
      setConfig: (config) => set({ config }),
    }),
    { name: "@self-talk-chat", skipHydration: true }
  )
);
