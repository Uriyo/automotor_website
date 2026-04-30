import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { LLMProvider, LLMStreamOptions, LLMMessageContent } from "./types";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (genAI) return genAI;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

function toGeminiParts(content: LLMMessageContent): Part[] {
  if (typeof content === "string") return [{ text: content }];
  return content.map((part) => {
    if (part.type === "text") return { text: part.text };
    return { inlineData: { mimeType: part.mimeType, data: part.data } };
  });
}

function getTextFromContent(content: LLMMessageContent): string {
  if (typeof content === "string") return content;
  return content
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

export class GeminiProvider implements LLMProvider {
  async stream(options: LLMStreamOptions): Promise<ReadableStream<string>> {
    const client = getClient();
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemMessage = options.messages.find((m) => m.role === "system");
    const chatMessages = options.messages.filter((m) => m.role !== "system");

    const historyMessages = chatMessages.slice(0, -1);
    const lastMessage = chatMessages[chatMessages.length - 1];

    const history = historyMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: toGeminiParts(m.content),
    }));

    const chat = model.startChat({
      history,
      ...(systemMessage && {
        systemInstruction: {
          role: "user",
          parts: [{ text: getTextFromContent(systemMessage.content) }],
        },
      }),
      generationConfig: {
        ...(options.temperature !== undefined && {
          temperature: options.temperature,
        }),
        ...(options.maxTokens !== undefined && {
          maxOutputTokens: options.maxTokens,
        }),
      },
    });

    const result = await chat.sendMessageStream(toGeminiParts(lastMessage.content));

    return new ReadableStream<string>({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(text);
        }
        controller.close();
      },
    });
  }
}
