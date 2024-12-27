"use client";

import { useEffect } from "react";

import { useChatStore } from "../chat";

const ChatHydration = () => {
  useEffect(() => {
    useChatStore.persist.rehydrate();
  }, []);

  return null;
};

export default ChatHydration;
