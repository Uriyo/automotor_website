import { getSupabase } from "@/lib/supabase";

export type ConversationRow = {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
};

export type MessageRow = {
  id?: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
};

/**
 * Create a conversation row for the signed-in user. Uses the
 * client-side authenticated Supabase session so RLS evaluates
 * `user_id = auth.uid()` correctly.
 *
 * Returns the new row's id, or null if not signed in / insert failed.
 */
export async function createConversation(title: string): Promise<string | null> {
  const supabase = getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.warn(
      "[conversations] not signed in — skipping conversation persistence"
    );
    return null;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: session.user.id, title })
    .select("id")
    .single();

  if (error) {
    console.error("[conversations] insert failed:", error);
    return null;
  }

  console.log("[conversations] created", data.id, `title="${title}"`);
  return data.id;
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });
  if (error) {
    console.error("[conversations] saveMessage failed:", error);
    return;
  }
  console.log(
    `[conversations] saved ${role} message in ${conversationId} (${content.length} chars)`
  );
}

export async function bumpConversationUpdatedAt(
  conversationId: string
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);
  if (error) console.error("[conversations] bump failed:", error);
}
