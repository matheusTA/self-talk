"use client";
import { useState } from "react";

import { Eye, EyeOff, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MessageBalloonProps {
  owner: "user" | "bot";
}

export default function MessageBalloon({ owner }: MessageBalloonProps) {
  const [isMessageBlur, setIsMessageBlur] = useState(true);

  function handleToggleBlur() {
    setIsMessageBlur((prev) => !prev);
  }

  return (
    <Card
      data-owner={owner}
      className="group max-w-xl data-[owner=bot]:mr-auto data-[owner=user]:ml-auto data-[owner=bot]:rounded-tl-none data-[owner=user]:rounded-tr-none"
    >
      <CardContent className="p-3">
        <p
          data-blur={isMessageBlur}
          className="data-[blur=false]:blur-0 data-[blur=true]:blur-[2px]"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s,
        </p>
      </CardContent>
      <CardFooter className="flex justify-start gap-2 group-data-[owner=bot]:justify-end">
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
        <Button size="icon" variant="secondary" className="size-6">
          <Volume2 className="size-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
