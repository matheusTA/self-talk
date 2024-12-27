"use client";
import { useState } from "react";

import { CoreMessage } from "ai";
import { Eye, EyeOff, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useChatStore } from "@/store/chat";

interface MessageBalloonProps {
  message: CoreMessage;
}

export default function MessageBalloon({ message }: MessageBalloonProps) {
  const [isMessageBlur, setIsMessageBlur] = useState(true);
  const { config } = useChatStore();
  const { isSpeaking, startSpeak } = useSpeechSynthesis();

  function handleToggleBlur() {
    setIsMessageBlur((prev) => !prev);
  }

  function handleStartSpeak() {
    if (!config || typeof message.content !== "string") {
      return;
    }

    startSpeak(message.content, config.voice.lang, config.voice.uri);
  }

  return (
    <Card
      data-owner={message.role}
      className="group max-w-xl data-[owner=assistant]:mr-auto data-[owner=user]:ml-auto data-[owner=assistant]:rounded-tl-none data-[owner=user]:rounded-tr-none"
    >
      <CardContent className="p-3">
        <p
          data-blur={isMessageBlur}
          className="text-sm data-[blur=false]:blur-0 data-[blur=true]:blur-[2px]"
        >
          {message.content.toString()}
        </p>
      </CardContent>
      <CardFooter className="flex p-3 group-data-[owner=user]:justify-start group-data-[owner=assistant]:justify-end">
        <div className="flex gap-2 group-data-[owner=assistant]:flex-row group-data-[owner=user]:flex-row-reverse">
          <Button
            size="icon"
            variant="secondary"
            className="size-6"
            onClick={handleToggleBlur}
          >
            {isMessageBlur ? (
              <EyeOff className="size-3" />
            ) : (
              <Eye className="size-3" />
            )}
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="size-6"
            disabled={isSpeaking}
            onClick={handleStartSpeak}
          >
            <Volume2 className="size-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
