export type LLMMessageContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "image"; data: string; mimeType: string }
    >;

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: LLMMessageContent;
};

export type LLMStreamOptions = {
  messages: LLMMessage[];
  temperature?: number;
  maxTokens?: number;
};

export interface LLMProvider {
  stream(options: LLMStreamOptions): Promise<ReadableStream<string>>;
}

/** Extract plain text from message content (for DB storage, search) */
export function getTextContent(content: LLMMessageContent): string {
  if (typeof content === "string") return content;
  return content
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}
