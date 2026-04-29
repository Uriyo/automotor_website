"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MessageSquare, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { getSupabase, ContactSubmission } from "@/lib/supabase";

const topics = [
  "General question",
  "I'm a customer / buyer",
  "I'm a junkyard",
  "I'm a mechanic",
  "Press / partnerships",
  "Bug or issue",
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactSubmission>({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ContactSubmission>(key: K, value: ContactSubmission[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    let supabase;
    try {
      supabase = getSupabase();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Supabase not configured");
      return;
    }

    const { error: insertError } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || null,
      topic: form.topic,
      message: form.message.trim(),
    });

    if (insertError) {
      setStatus("error");
      setError(insertError.message);
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", phone: "", topic: topics[0], message: "" });
  }

  return (
    <div className="min-h-screen px-4 lg:px-8 py-8 lg:py-16 mb-16 lg:mb-0">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to home
        </Link>

        <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-3">
          Contact us
        </h1>
        <p className="text-text-secondary text-base mb-8 max-w-xl">
          Questions, partnerships, press, or just want to say hi? Fill out the form below or reach
          us directly — we typically reply within one business day.
        </p>

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { icon: Phone, label: "Call us", value: "(800) 555-1234", href: "tel:+18005551234" },
            { icon: Mail, label: "Email", value: "hello@automotor.ai", href: "mailto:hello@automotor.ai" },
            { icon: MapPin, label: "HQ", value: "Austin, TX", href: "#" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="bg-panel rounded-xl border border-line p-4 hover:border-orange-DEFAULT/40 transition-colors"
            >
              <c.icon size={16} className="text-orange-DEFAULT mb-2" aria-hidden="true" />
              <p className="text-xs text-text-secondary">{c.label}</p>
              <p className="text-sm font-semibold text-text-primary">{c.value}</p>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="bg-panel rounded-xl border border-line p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={18} className="text-orange-DEFAULT" aria-hidden="true" />
            <h2 className="font-semibold tracking-tight text-lg text-text-primary">Send us a message</h2>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={48} className="text-green-400 mb-3" aria-hidden="true" />
              <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-1">
                Message sent!
              </h3>
              <p className="text-text-secondary text-sm mb-5 max-w-sm">
                Thanks for reaching out — we&apos;ll get back to you within one business day.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-4 py-2 rounded-xl border border-line text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 placeholder:text-text-secondary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 placeholder:text-text-secondary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5">
                    Phone <span className="text-text-secondary/60">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone ?? ""}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 placeholder:text-text-secondary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5">Topic</label>
                  <select
                    value={form.topic}
                    onChange={(e) => update("topic", e.target.value)}
                    className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-text-secondary block mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full bg-bg border border-line rounded-xl px-3 py-2.5 text-text-primary text-sm outline-none focus:border-orange-DEFAULT/50 placeholder:text-text-secondary resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {status === "error" && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                  Couldn&apos;t send your message: {error ?? "unknown error"}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-text-secondary">
                  By submitting, you agree to our{" "}
                  <a href="#" className="underline hover:text-text-primary">privacy policy</a>.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-5 py-2.5 rounded-xl bg-orange-DEFAULT text-white text-sm font-semibold hover:bg-orange-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
