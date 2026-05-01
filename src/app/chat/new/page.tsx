"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatView from "@/components/ChatView";

function NewChat() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  return <ChatView initialQuery={query} />;
}

export default function NewChatPage() {
  return (
    <Suspense>
      <NewChat />
    </Suspense>
  );
}
