import { getSupabaseAuth } from "./supabase-server";

export type AuthUser = {
  id: string;
  email: string;
};

export async function getCurrentUser(
  cookieHeader: string
): Promise<AuthUser | null> {
  try {
    const supabase = getSupabaseAuth(cookieHeader);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) return null;

    return { id: user.id, email: user.email };
  } catch {
    return null;
  }
}
