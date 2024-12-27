"use client";

import { CoreMessage } from "ai";
import { CircleStop, CornerDownLeft, Mic, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { GoogleGenerativeAiService } from "@/services/google-generative-ai-service";
import { useAiProviderStore } from "@/store/ai-provider";
import { useChatStore } from "@/store/chat";

export default function SpeechRecognitionForm() {
  const { config, messages, addMessage } = useChatStore();
  const { aiProvider } = useAiProviderStore();
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

  async function handleSendMessage() {
    if (aiProvider && config) {
      const newMessage: CoreMessage = {
        role: "user",
        content: transcript,
      };

      const aiResponse = await GoogleGenerativeAiService.continueConversation(
        aiProvider.accessKey,
        [...messages, newMessage]
      );

      addMessage([newMessage, { role: "assistant", content: aiResponse }]);

      resetTranscript();
    }
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
