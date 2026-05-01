import { NextRequest } from "next/server";
import { getLLMProvider, getTextContent } from "@/lib/llm";
import { searchParts } from "@/lib/parts-search";
import { buildSystemPrompt } from "@/lib/parts-search-prompt";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase-server";
import type { LLMMessage, LLMMessageContent } from "@/lib/llm";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB base64

export async function POST(request: NextRequest) {
  let body: { message?: string; conversationId?: string; image?: { data: string; mimeType: string } };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, conversationId, image } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return Response.json(
      { error: "Message is required and must be a non-empty string." },
      { status: 400 }
    );
  }

  if (image) {
    if (!image.data || !image.mimeType) {
      return Response.json(
        { error: "Image must include data and mimeType." },
        { status: 400 }
      );
    }
    if (image.data.length > MAX_IMAGE_SIZE) {
      return Response.json(
        { error: "Image too large. Maximum 4MB." },
        { status: 400 }
      );
    }
    if (!image.mimeType.startsWith("image/")) {
      return Response.json(
        { error: "Invalid image type." },
        { status: 400 }
      );
    }
  }

  const user = await getCurrentUser(request);

  let history: LLMMessage[] = [];
  if (user && conversationId) {
    const supabase = getSupabaseServer();
    const { data: msgs } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (msgs) {
      history = msgs.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
    }
  }

  const parts = await searchParts(message.trim());
  const systemPrompt = buildSystemPrompt(parts);

  let userContent: LLMMessageContent;
  if (image) {
    userContent = [
      { type: "text", text: message.trim() },
      { type: "image", data: image.data, mimeType: image.mimeType },
    ];
  } else {
    userContent = message.trim();
  }

  const messages: LLMMessage[] = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userContent },
  ];

  let llmStream: ReadableStream<string>;
  try {
    const provider = getLLMProvider();
    llmStream = await provider.stream({ messages });
  } catch (err) {
    console.error("LLM error:", err);
    return Response.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }

  let activeConversationId = conversationId || null;
  if (user && !activeConversationId) {
    const supabase = getSupabaseServer();
    const title = message.trim().slice(0, 50);
    const { data: conv } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, title })
      .select("id")
      .single();
    if (conv) activeConversationId = conv.id;
  }

  if (user && activeConversationId) {
    const supabase = getSupabaseServer();
    await supabase.from("messages").insert({
      conversation_id: activeConversationId,
      role: "user",
      content: getTextContent(userContent),
    });
  }

  let fullResponse = "";
  const transform = new TransformStream<string, Uint8Array>({
    transform(chunk, controller) {
      fullResponse += chunk;
      controller.enqueue(new TextEncoder().encode(chunk));
    },
    async flush() {
      if (user && activeConversationId) {
        const supabase = getSupabaseServer();
        await supabase.from("messages").insert({
          conversation_id: activeConversationId,
          role: "assistant",
          content: fullResponse,
        });
        await supabase
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", activeConversationId);
      }
    },
  });

  llmStream.pipeTo(transform.writable);

  const headers: Record<string, string> = {
    "Content-Type": "text/plain; charset=utf-8",
    "Transfer-Encoding": "chunked",
  };
  if (activeConversationId) {
    headers["X-Conversation-Id"] = activeConversationId;
  }

  return new Response(transform.readable, { headers });
}
