"use client";
import { useState } from "react";

import { Eye, EyeOff, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface MessageBalloonProps {
  message: {
    owner: "bot" | "user";
    text: string;
  };
}

export default function MessageBalloon({ message }: MessageBalloonProps) {
  const [isMessageBlur, setIsMessageBlur] = useState(true);
  const { isSpeaking, startSpeak } = useSpeechSynthesis();

  function handleToggleBlur() {
    setIsMessageBlur((prev) => !prev);
  }

  function handleStartSpeak() {
    startSpeak(message.text, "en-US", "Google US English");
  }

  return (
    <Card
      data-owner={message.owner}
      className="group max-w-xl data-[owner=bot]:mr-auto data-[owner=user]:ml-auto data-[owner=bot]:rounded-tl-none data-[owner=user]:rounded-tr-none"
    >
      <CardContent className="p-3">
        <p
          data-blur={isMessageBlur}
          className="text-sm data-[blur=false]:blur-0 data-[blur=true]:blur-[2px]"
        >
          {message.text}
        </p>
      </CardContent>
      <CardFooter className="flex p-3 group-data-[owner=user]:justify-start group-data-[owner=bot]:justify-end">
        <div className="flex gap-2 group-data-[owner=bot]:flex-row group-data-[owner=user]:flex-row-reverse">
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
