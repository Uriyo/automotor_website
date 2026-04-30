import type { AutoPart } from "./supabase-server";

const STOP_WORDS = new Set([
  "a", "an", "the", "for", "and", "or", "is", "in", "on", "at", "to",
  "of", "with", "my", "i", "do", "you", "have", "need", "want", "get",
]);

function toSearchTerms(query: string): string {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  if (words.length === 0) return "";
  return words.join(" | ");
}

export async function searchParts(
  query: string,
  limit = 5
): Promise<AutoPart[]> {
  const terms = toSearchTerms(query);
  if (!terms) return [];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const { getSupabaseServer } = await import("./supabase-server");
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("auto_parts")
    .select("*")
    .textSearch("fts", terms)
    .limit(limit);

  if (error) {
    console.error("Parts search error:", error.message);
    return [];
  }

  return (data as AutoPart[]) || [];
}
