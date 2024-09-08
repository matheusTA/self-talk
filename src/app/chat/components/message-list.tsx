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
    <div className="flex size-full flex-col overflow-y-scroll" ref={listRef}>
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
      <MessageBalloon />
    </div>
  );
}
