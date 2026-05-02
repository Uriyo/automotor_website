import { NextRequest } from "next/server";
import { getLLMProvider } from "@/lib/llm";
import { searchParts } from "@/lib/parts-search";
import { buildSystemPrompt } from "@/lib/parts-search-prompt";
import type { LLMMessage, LLMMessageContent } from "@/lib/llm";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB base64

type ClientHistoryItem = { role: "user" | "assistant"; content: string };

/**
 * Stateless streaming LLM proxy.
 *
 * Persistence is owned by the CLIENT (see src/lib/conversations.ts and
 * src/components/ChatView.tsx). The client sends the prior history in
 * each request so the LLM has full context. This route does no DB I/O.
 */
export async function POST(request: NextRequest) {
  let body: {
    message?: string;
    history?: ClientHistoryItem[];
    image?: { data: string; mimeType: string };
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, history = [], image } = body;

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
      return Response.json({ error: "Invalid image type." }, { status: 400 });
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
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: userContent },
  ];

  let llmStream: ReadableStream<string>;
  try {
    const provider = getLLMProvider();
    llmStream = await provider.stream({ messages });
  } catch (err) {
    console.error("[chat] LLM error:", err);
    return Response.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }

  // Encode the LLM's text stream as bytes.
  const encoder = new TextEncoder();
  const transform = new TransformStream<string, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(encoder.encode(chunk));
    },
  });

  llmStream.pipeTo(transform.writable).catch((err) => {
    console.error("[chat] pipeTo error:", err);
  });

  return new Response(transform.readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
