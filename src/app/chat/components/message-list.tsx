"use client";

import { useEffect, useRef } from "react";

import { useChatStore } from "@/store/chat";

import MessageBalloon from "./message-balloon";

export default function MessageList() {
  const listRef = useRef<HTMLDivElement>(null);
  const { messages } = useChatStore();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  });

  return (
    <div
      className="mb-4 flex size-full flex-col gap-5 overflow-y-scroll pb-0 pr-1.5"
      ref={listRef}
    >
      {messages.map((message, index) => (
        <MessageBalloon key={index} message={message} />
      ))}
    </div>
  );
}
