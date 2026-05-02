import { createClient } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
};

export async function getCurrentUser(
  request: { headers: { get(name: string): string | null } }
): Promise<AuthUser | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("[auth] no Bearer token on request — user is anonymous, chat will not persist");
    return null;
  }

  const token = authHeader.slice(7);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error(
      "[auth] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing — cannot validate token"
    );
    return null;
  }

  try {
    const supabase = createClient(url, key, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.warn("[auth] supabase.auth.getUser rejected token:", error.message);
      return null;
    }
    if (!user) {
      console.warn("[auth] token valid but no user returned");
      return null;
    }
    if (!user.email) {
      console.warn("[auth] user has no email — treating as anonymous");
      return null;
    }
    return { id: user.id, email: user.email };
  } catch (err) {
    console.error("[auth] unexpected error validating token:", err);
    return null;
  }
}
