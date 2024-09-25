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
        window.speechSynthesis.cancel(); // cancel any current speech
      }

      // fragment the text into chunks
      const chunkSize = 150; // define the chunk size
      const textChunks = text.match(new RegExp(`.{1,${chunkSize}}`, "g")) || []; // split the text into chunks

      const speakChunks = (chunks: string[], currentIndex = 0) => {
        if (currentIndex >= chunks.length) {
          return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[currentIndex]);
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
          if (currentIndex < chunks.length - 1) {
            // speak the next chunk
            speakChunks(chunks, currentIndex + 1);
          } else {
            setIsSpeaking(false);
          }
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
        utteranceRef.current = utterance;
      };

      // start speaking the chunks
      speakChunks(textChunks);
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
