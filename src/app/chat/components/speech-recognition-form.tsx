import { CornerDownLeft, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SpeechRecognitionForm() {
  return (
    <div className="w-full space-y-3 rounded-md border bg-white p-3 dark:bg-zinc-950">
      <Textarea
        className="max-h-24"
        placeholder="Speech recognition"
        disabled
        rows={4}
        value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />

      <div className="flex items-center justify-between">
        <Button size="icon" variant="secondary">
          <Mic className="size-5" />
        </Button>

        <Button>
          Send message
          <CornerDownLeft className="size-5" />
        </Button>
      </div>
    </div>
  );
}