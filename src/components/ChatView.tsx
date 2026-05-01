"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wrench, MoreHorizontal, Trash2 } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import type { ImageAttachment } from "@/components/ChatInput";
import { getSupabase } from "@/lib/supabase";

type MessageType = {
  role: "user" | "assistant";
  content: string;
  imagePreview?: string;
};

type ChatViewProps = {
  /** Existing conversation ID to load, or null for a new chat */
  existingConversationId?: string | null;
  /** Initial query to send immediately (from ?q= param) */
  initialQuery?: string;
};

export default function ChatView({
  existingConversationId = null,
  initialQuery = "",
}: ChatViewProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(
    existingConversationId
  );
  const [title, setTitle] = useState(existingConversationId ? "" : "New chat");
  const [loadingHistory, setLoadingHistory] = useState(!!existingConversationId);
  const [showMenu, setShowMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!existingConversationId) return;

    let cancelled = false;
    async function load() {
      const supabase = getSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (!cancelled) {
          setLoadingHistory(false);
          setTitle("New chat");
        }
        return;
      }

      const { data: conv } = await supabase
        .from("conversations")
        .select("title")
        .eq("id", existingConversationId)
        .single();

      if (cancelled) return;

      if (!conv) {
        router.replace("/chat/new");
        return;
      }

      setTitle(conv.title || "Untitled");

      const { data: msgs } = await supabase
        .from("messages")
        .select("role, content")
        .eq("conversation_id", existingConversationId)
        .order("created_at", { ascending: true });

      if (cancelled) return;

      if (msgs && msgs.length > 0) {
        setMessages(
          msgs.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }))
        );
      }

      setLoadingHistory(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [existingConversationId, router]);

  useEffect(() => {
    if (initRef.current) return;
    if (initialQuery && messages.length === 0 && !loadingHistory) {
      initRef.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, loadingHistory]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (!showMenu) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  const sendMessage = useCallback(
    async (text: string, image?: ImageAttachment) => {
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

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        const supabase = getSupabase();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers["Authorization"] = `Bearer ${session.access_token}`;
        }

        const res = await fetch("/api/chat", {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ error: "Unknown error" }));
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
          router.replace(`/chat/${newConvId}`);
          window.dispatchEvent(new Event("conversation-created"));
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
            content:
              "Network error. Please check your connection and try again.",
          };
          return updated;
        });
      }

      setIsStreaming(false);
    },
    [conversationId, isStreaming, title, router]
  );

  async function handleDelete() {
    if (!conversationId) return;
    const supabase = getSupabase();
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    if (error) {
      console.error("Failed to delete conversation:", error);
      return;
    }

    window.dispatchEvent(new Event("conversation-created"));
    router.replace("/");
  }

  if (loadingHistory) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="dot-pulse flex items-center gap-1" aria-label="Loading conversation">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
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
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="More options"
              onClick={() => setShowMenu((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
            >
              <MoreHorizontal size={16} />
            </button>
            {showMenu && conversationId && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-panel border border-line rounded-xl shadow-lg z-50 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-elevated transition-colors"
                >
                  <Trash2 size={14} />
                  Delete conversation
                </button>
              </div>
            )}
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
                  <div
                    className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
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
            <div
              role="status"
              aria-label="AutoMotor is typing"
              className="flex items-start gap-3"
            >
              <div
                className="w-7 h-7 rounded-full bg-orange-DEFAULT/10 border border-orange-DEFAULT/20 flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <Wrench size={13} className="text-orange-DEFAULT" />
              </div>
              <div className="bg-panel rounded-xl px-4 py-3.5">
                <div
                  className="dot-pulse flex items-center gap-1"
                  aria-hidden="true"
                >
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
