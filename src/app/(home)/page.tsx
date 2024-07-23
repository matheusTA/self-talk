import CreateChatForm from "./create-chat-form";

export default function HomePage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-10">
      <h1 className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-4xl font-bold text-transparent">
        The{" "}
        <span className="underline decoration-black decoration-wavy decoration-1 dark:decoration-white">
          newest way
        </span>{" "}
        to improve your conversation skills.
      </h1>

      <CreateChatForm />
    </div>
  );
}
