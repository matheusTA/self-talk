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
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
      <MessageBalloon owner="bot" />
      <MessageBalloon owner="user" />
    </div>
  );
}
