import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }

  client = createClient(url, key);
  return client;
}

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  topic: string;
  message: string;
  created_at?: string;
};

export type YardSignup = {
  id?: string;
  phone: string;
  yard_name?: string | null;
  owner_name?: string | null;
  address?: string | null;
  ein?: string | null;
  service_radius?: number | null;
  specialties?: string[];
  inventory_choice?: string | null;
  stripe_connected?: boolean;
  created_at?: string;
};

export type MechanicSignup = {
  id?: string;
  phone: string;
  shop_name?: string | null;
  owner_name?: string | null;
  address?: string | null;
  specialties?: string[];
  ase_certified?: boolean;
  years_in_business?: number | null;
  earning_model?: string | null;
  created_at?: string;
};
