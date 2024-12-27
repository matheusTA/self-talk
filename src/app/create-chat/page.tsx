import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreateChatForm from "./components/create-chat-form";

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
        <CreateChatForm />
      </Card>
    </div>
  );
}
