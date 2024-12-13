"use client";

import { useEffect } from "react";

import { useAiProviderStore } from "../ai-provider";

const AiProviderHydration = () => {
  useEffect(() => {
    useAiProviderStore.persist.rehydrate();
  }, []);

  return null;
};

export default AiProviderHydration;
