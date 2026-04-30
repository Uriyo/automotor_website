import OpenAI from "openai";
import type {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";
import { LLMProvider, LLMStreamOptions, LLMMessageContent } from "./types";

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.");
  }

  openaiClient = new OpenAI({ apiKey });
  return openaiClient;
}

function toOpenAIContent(
  content: LLMMessageContent
): string | ChatCompletionContentPart[] {
  if (typeof content === "string") return content;
  return content.map((part) => {
    if (part.type === "text") return { type: "text" as const, text: part.text };
    return {
      type: "image_url" as const,
      image_url: { url: `data:${part.mimeType};base64,${part.data}` },
    };
  });
}

export class OpenAIProvider implements LLMProvider {
  async stream(options: LLMStreamOptions): Promise<ReadableStream<string>> {
    const client = getClient();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: options.messages.map((m) => ({
        role: m.role,
        content: toOpenAIContent(m.content),
      })) as ChatCompletionMessageParam[],
      stream: true,
      ...(options.temperature !== undefined && {
        temperature: options.temperature,
      }),
      ...(options.maxTokens !== undefined && {
        max_tokens: options.maxTokens,
      }),
    });

    return new ReadableStream<string>({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) controller.enqueue(text);
        }
        controller.close();
      },
    });
  }
}
