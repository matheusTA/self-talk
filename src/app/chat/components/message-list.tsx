"use client";

import { useEffect, useRef } from "react";

import MessageBalloon from "./message-balloon";

export default function MessageList() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  });

  return (
    <div
      className="mb-4 flex size-full flex-col gap-5 overflow-y-scroll pb-0"
      ref={listRef}
    >
      <MessageBalloon
        message={{
          owner: "bot",
          text: "Sara and Lily had been best friends since kindergarten. They shared everything, from secrets to toys. One day, they had a big argument over a small misunderstanding. After a day of silence, they realized their friendship was more important than any argument. They made up, promising to always stick together.",
        }}
      />
    </div>
  );
}
