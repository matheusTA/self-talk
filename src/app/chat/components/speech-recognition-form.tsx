"use client";

import { CircleStop, CornerDownLeft, Mic, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useChatStore } from "@/store/chat";

export default function SpeechRecognitionForm() {
  const { config } = useChatStore();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const disabledSendMessageButton = !transcript || isListening;

  function handleStartListening() {
    if (!!config) {
      startListening(config.voice.lang);
    }
  }

  function handleSendMessage() {
    console.log("Send message", transcript);
  }

  return (
    <Card>
      <CardContent className="p-3">
        <Textarea
          className="max-h-24"
          placeholder="Speech recognition"
          disabled
          rows={4}
          value={transcript}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3 pt-0">
        <div className="flex items-center gap-2">
          {isListening && (
            <Button size="icon" variant="secondary" onClick={stopListening}>
              <CircleStop className="size-5" />
            </Button>
          )}

          {!isListening && (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleStartListening}
            >
              <Mic className="size-5" />
            </Button>
          )}

          {(!!transcript || isListening) && (
            <Button size="icon" variant="secondary" onClick={resetTranscript}>
              <Trash2 className="size-5" />
            </Button>
          )}
        </div>

        <Button
          onClick={handleSendMessage}
          disabled={disabledSendMessageButton}
        >
          Send message
          <CornerDownLeft className="size-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
