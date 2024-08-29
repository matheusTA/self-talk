import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import CreateChatForm from "./create-chat-form";

export default function CreateChatPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Chat</CardTitle>
          <CardDescription>
            Choose your topic, language, and duration to start a conversation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Separator />
          <CreateChatForm />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" form="create-chat-form">
            Start
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
