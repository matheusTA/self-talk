import MessageList from "./components/message-list";
import SpeechRecognitionForm from "./components/speech-recognition-form";

export default function ChatPage() {
  return (
    <div className="size-full">
      <div className="flex size-full flex-col">
        <MessageList />
        <SpeechRecognitionForm />
      </div>
    </div>
  );
}
