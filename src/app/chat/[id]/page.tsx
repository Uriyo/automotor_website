"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wrench, MoreHorizontal } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import type { ImageAttachment } from "@/components/ChatInput";

type MessageType = {
  role: "user" | "assistant";
  content: string;
  imagePreview?: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [title, setTitle] = useState("New chat");
  const bottomRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    if (initialQuery && messages.length === 0) {
      initRef.current = true;
      sendMessage(initialQuery);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  async function sendMessage(text: string, image?: ImageAttachment) {
    if ((!text.trim() && !image) || isStreaming) return;

    const displayText = text.trim() || "What is this part?";

    if (title === "New chat") {
      setTitle(displayText.slice(0, 40));
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: displayText, imagePreview: image?.preview },
    ]);
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const payload: Record<string, unknown> = {
        message: displayText,
        conversationId,
      };
      if (image) {
        payload.image = { data: image.data, mimeType: image.mimeType };
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: err.error || "Something went wrong. Please try again.",
          };
          return updated;
        });
        setIsStreaming(false);
        return;
      }

      const newConvId = res.headers.get("X-Conversation-Id");
      if (newConvId && !conversationId) {
        setConversationId(newConvId);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
        };
        return updated;
      });
    }

    setIsStreaming(false);
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-line flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            New chat
          </Link>
          <h2 className="font-medium text-text-primary text-sm truncate max-w-[200px] lg:max-w-sm">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="More options"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Conversation"
          className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4"
        >
          {messages.map((msg, i) => (
            <div key={i} className="message-enter">
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-panel border-l-2 border-orange-DEFAULT/40 rounded-xl px-4 py-3 text-text-primary text-sm leading-relaxed">
                    <span className="sr-only">You said: </span>
                    {msg.imagePreview && (
                      <img
                        src={msg.imagePreview}
                        alt="Attached"
                        className="h-20 w-20 object-cover rounded-lg mb-2"
                      />
                    )}
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Wrench size={13} className="text-orange-DEFAULT" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-panel rounded-xl px-4 py-3 text-text-primary text-sm leading-relaxed whitespace-pre-wrap">
                      <span className="sr-only">AutoMotor said: </span>
                      {msg.content || "\u00A0"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <div role="status" aria-label="AutoMotor is typing" className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Wrench size={13} className="text-orange-DEFAULT" />
              </div>
              <div className="bg-panel rounded-xl px-4 py-3.5">
                <div className="dot-pulse flex items-center gap-1" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="px-4 lg:px-6 py-4 border-t border-line flex-shrink-0 pb-safe">
          <ChatInput onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
}
