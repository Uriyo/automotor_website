import { LLMProvider } from "./types";
import { GeminiProvider } from "./gemini";
import { OpenAIProvider } from "./openai";

export type { LLMProvider, LLMMessage, LLMMessageContent, LLMStreamOptions } from "./types";
export { getTextContent } from "./types";

let provider: LLMProvider | null = null;

export function getLLMProvider(): LLMProvider {
  if (provider) return provider;

  const providerName = process.env.LLM_PROVIDER;

  if (!providerName) {
    throw new Error(
      "LLM_PROVIDER is not set. Set it to 'gemini' or 'openai' in .env.local."
    );
  }

  switch (providerName) {
    case "gemini":
      provider = new GeminiProvider();
      break;
    case "openai":
      provider = new OpenAIProvider();
      break;
    default:
      throw new Error(
        `Unknown LLM_PROVIDER: "${providerName}". Must be "gemini" or "openai".`
      );
  }

  return provider;
}
