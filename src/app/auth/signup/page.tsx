"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { LogoLockup } from "@/components/Logo";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const supabase = getSupabase();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8">
            <LogoLockup size={32} textClassName="text-xl" />
          </div>
          <div className="bg-panel border border-line rounded-2xl p-6 text-center">
            <h1 className="text-lg font-semibold text-text-primary mb-3">
              Check your email
            </h1>
            <p className="text-sm text-text-secondary mb-5">
              We sent a confirmation link to <strong className="text-text-primary">{email}</strong>.
              Click it to activate your account.
            </p>
            <Link
              href="/auth/login"
              className="text-sm text-orange-DEFAULT hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-8">
          <LogoLockup size={20} textClassName="text-lg" />
        </div>

        <div className="bg-panel border border-line rounded-2xl p-6">
          <h1 className="text-lg font-semibold text-text-primary text-center mb-6">
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 rounded-lg bg-bg border border-line text-text-primary text-sm placeholder:text-text-tertiary focus:border-orange-DEFAULT/50 outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-text-secondary mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg bg-bg border border-line text-text-primary text-sm placeholder:text-text-tertiary focus:border-orange-DEFAULT/50 outline-none transition-colors"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-text-secondary mb-1.5">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg bg-bg border border-line text-text-primary text-sm placeholder:text-text-tertiary focus:border-orange-DEFAULT/50 outline-none transition-colors"
                placeholder="Repeat password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-orange-DEFAULT text-white font-medium text-sm hover:bg-orange-DEFAULT/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-text-secondary text-center mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-DEFAULT hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
