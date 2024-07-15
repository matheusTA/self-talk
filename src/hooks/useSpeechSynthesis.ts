import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechSynthesis {
  speechSynthesisVoices: SpeechSynthesisVoice[];
  isSpeaking: boolean;
  startSpeak: (text: string, lang: string, voiceURI: string) => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesis {
  const [speechSynthesisVoices, setSpeechSynthesisVoicesVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startSpeak = useCallback(
    (text: string, lang: string = "en-US", voiceURI: string) => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      const selectedVoice = speechSynthesisVoices.find(
        (voice) => voice.voiceURI === voiceURI
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    },
    [speechSynthesisVoices]
  );

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setSpeechSynthesisVoicesVoices(synthVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return {
    speechSynthesisVoices,
    isSpeaking,
    startSpeak,
  };
}
