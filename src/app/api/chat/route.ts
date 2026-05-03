import { NextRequest } from "next/server";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB base64

/**
 * Thin proxy from Next.js to the FastAPI agent service.
 *
 * Why this is just a proxy
 * ------------------------
 * The agent (LangGraph + checkpointer + tools) lives in a separate
 * Python service under apps/agent so it can hold long-lived stateful
 * resources, run turns past serverless timeouts, and be resumed by
 * webhook. Next's job here is:
 *   1. Validate the request shape.
 *   2. Forward the user's Supabase access token (so the agent can
 *      identify the user via JWT verification — no DB round-trip).
 *   3. Stream the response body back to the browser as-is.
 */

function getAgentBaseUrl(): string {
  const url = process.env.AGENT_BASE_URL || process.env.NEXT_PUBLIC_AGENT_BASE_URL;
  if (!url) {
    throw new Error(
      "AGENT_BASE_URL is not set. Point it at your FastAPI agent service " +
        "(e.g. http://localhost:8001 in dev). See apps/agent/README.md."
    );
  }
  return url.replace(/\/$/, "");
}

export async function POST(request: NextRequest) {
  let body: {
    thread_id?: string;
    message?: string;
    image?: { data: string; mimeType: string };
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { thread_id, message, image } = body;

  if (!thread_id || typeof thread_id !== "string") {
    return Response.json(
      { error: "thread_id is required (use the conversation id)." },
      { status: 400 }
    );
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return Response.json(
      { error: "message is required and must be a non-empty string." },
      { status: 400 }
    );
  }
  if (image) {
    if (!image.data || !image.mimeType) {
      return Response.json(
        { error: "image must include data and mimeType." },
        { status: 400 }
      );
    }
    if (image.data.length > MAX_IMAGE_SIZE) {
      return Response.json(
        { error: "image too large (max 4MB base64)." },
        { status: 400 }
      );
    }
    if (!image.mimeType.startsWith("image/")) {
      return Response.json({ error: "invalid image type" }, { status: 400 });
    }
  }

  let agentUrl: string;
  try {
    agentUrl = `${getAgentBaseUrl()}/chat`;
  } catch (err) {
    console.error("[chat-proxy] agent URL not configured:", err);
    return Response.json(
      { error: "Agent service URL is not configured on the server." },
      { status: 500 }
    );
  }

  // Forward the user's auth header verbatim so the agent can verify
  // the JWT and bind the checkpoint to the correct user.
  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const auth = request.headers.get("authorization");
  if (auth) upstreamHeaders["Authorization"] = auth;

  let upstream: Response;
  try {
    upstream = await fetch(agentUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify({ thread_id, message, image }),
      // Important: streaming. Don't await body, just hand it off.
      // @ts-expect-error - duplex is a valid Node fetch option but not in TS lib types.
      duplex: "half",
    });
  } catch (err) {
    console.error("[chat-proxy] failed to reach agent service:", err);
    return Response.json(
      {
        error:
          "Could not reach the agent service. Make sure it is running and AGENT_BASE_URL is correct.",
      },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error(
      `[chat-proxy] agent returned ${upstream.status}: ${detail.slice(0, 200)}`
    );
    return Response.json(
      { error: "Agent service returned an error.", status: upstream.status },
      { status: upstream.status }
    );
  }

  // Forward the streamed body and a small whitelist of headers.
  const headers: Record<string, string> = {
    "Content-Type": "text/plain; charset=utf-8",
    "Transfer-Encoding": "chunked",
  };
  const passthrough = ["x-persistence", "x-conversation-id"];
  for (const name of passthrough) {
    const v = upstream.headers.get(name);
    if (v) headers[name] = v;
  }

  return new Response(upstream.body, { headers });
}
