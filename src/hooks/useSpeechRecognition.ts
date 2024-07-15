import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechRecognition {
  transcript: string;
  isListening: boolean;
  isSpeechRecognitionSupported: boolean;
  speechRecognitionError: string | null;
  startListening: (lang: string) => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognition {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    useState<boolean>(true);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<
    string | null
  >(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback((lang: string) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    stopListening();
  }, [stopListening]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSpeechRecognitionSupported(false);
      setSpeechRecognitionError(
        "Speech Recognition is not supported in this browser. Please try again with a different browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment;
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setSpeechRecognitionError(`Speech Recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  return {
    transcript,
    isListening,
    isSpeechRecognitionSupported,
    speechRecognitionError,
    startListening,
    stopListening,
    resetTranscript,
  };
}
