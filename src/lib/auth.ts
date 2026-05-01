import { createClient } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
};

export async function getCurrentUser(
  request: { headers: { get(name: string): string | null } }
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.slice(7);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    const supabase = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user || !user.email) return null;
    return { id: user.id, email: user.email };
  } catch {
    return null;
  }
}
