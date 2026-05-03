"use client";

import ChatView from "@/components/ChatView";

export default function ExistingChatPage({
  params,
}: {
  params: { id: string };
}) {
  return <ChatView existingConversationId={params.id} />;
}
