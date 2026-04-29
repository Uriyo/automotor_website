"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import { Gift, MessageSquare, Phone, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const liveSavings = [
  "Maria in San Antonio just saved $1,840 on a Ram engine · 1 min ago",
  "Jeff in Austin just saved $2,100 on a Silverado engine · 4 min ago",
  "Carlos in Houston just saved $1,450 on a transmission · 7 min ago",
  "Lisa in Phoenix just saved $3,200 on a Cummins diesel · 11 min ago",
];

const faqs = [
  { q: "Is this free?", a: "Yes. Getting quotes is completely free. You only pay if you choose to reserve a part." },
  { q: "How is this possible?", a: "AutoMotor uses AI to call 15 junkyards simultaneously. The competition drives prices down — you get the savings." },
  { q: "What if I don't find what I need?", a: "You'll know within 90 seconds. If no yards have your part, we alert our entire network and follow up when it becomes available." },
];

export default function ShareLandingPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Referral credit banner */}
      <div className="bg-orange-DEFAULT/20 border-b border-orange-DEFAULT/30 text-center py-3 px-4">
        <p className="text-sm font-semibold text-orange-DEFAULT inline-flex items-center gap-2">
          <Gift size={14} aria-hidden="true" /> Your friend Mike sent you $25 off your first purchase.
        </p>
      </div>

      {/* Hero */}
      <section className="px-4 lg:px-8 py-12 lg:py-16 text-center max-w-3xl mx-auto">
        {/* Shared receipt card */}
        <div className="bg-panel border border-line rounded-xl p-6 mb-8 inline-block w-full">
          <p className="text-xs text-text-secondary mb-1">Mike saved</p>
          <p className="font-semibold tracking-tight text-4xl text-text-primary mb-1">$1,240</p>
          <p className="text-text-secondary text-sm">on their 2014 Silverado engine.</p>
          <p className="text-text-secondary text-sm">using <span className="text-orange-DEFAULT font-semibold">AutoMotor.AI</span>.</p>
          <p className="text-text-secondary text-sm">in 94 seconds.</p>
        </div>

        <h1 className="font-semibold tracking-tight text-3xl lg:text-4xl text-text-primary mb-3">
          Mike saved $1,240 on their engine.
          <br />
          <span className="text-orange-DEFAULT">You can too.</span>
        </h1>
        <p className="text-text-secondary mb-6">The same AI is standing by right now.</p>

        <ChatInput
          placeholder="What's wrong with your ride?"
          onSubmit={(val) => router.push(`/chat/new?q=${encodeURIComponent(val)}`)}
          className="mb-3"
        />
        <p className="text-xs text-text-secondary">$25 credit auto-applied when you get a quote.</p>
      </section>

      {/* How it works */}
      <section className="px-4 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {([
              { icon: MessageSquare, title: "Describe your problem.", desc: "Tell our AI what's wrong." },
              { icon: Phone, title: "AI calls 15 yards.", desc: "Parallel calls. Live quotes in 90 seconds." },
              { icon: CheckCircle, title: "Pick your quote.", desc: "Best price, guaranteed fitment." },
            ] as { icon: LucideIcon; title: string; desc: string }[]).map((s, i) => (
              <div key={i} className="bg-panel rounded-xl border border-line p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-DEFAULT/10 flex items-center justify-center mx-auto mb-2">
                  <s.icon size={22} className="text-orange-DEFAULT" aria-hidden="true" />
                </div>
                <p className="font-semibold tracking-tight text-text-primary mb-1">{s.title}</p>
                <p className="text-sm text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live savings */}
      <section className="px-4 lg:px-8 mb-12">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-semibold tracking-tight text-xl text-text-primary text-center mb-4">
            Real savings happening right now
          </h3>
          <div className="space-y-2">
            {liveSavings.map((s, i) => (
              <div key={i} className="bg-panel rounded-xl border border-line px-4 py-2.5 text-sm text-text-secondary">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 lg:px-8 mb-12">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-semibold tracking-tight text-xl text-text-primary mb-4 text-center">Quick questions</h3>
          <div className="bg-panel rounded-xl border border-line p-5 space-y-4">
            {faqs.map((f, i) => (
              <div key={i}>
                <p className="font-medium text-text-primary text-sm mb-1">{f.q}</p>
                <p className="text-sm text-text-secondary">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-panel border-t border-line p-4 pb-safe">
        <button
          onClick={() => router.push("/chat/new")}
          className="w-full py-4 rounded-xl bg-orange-DEFAULT text-white font-semibold hover:bg-orange-hover transition-colors"
        >
          Chat now — $25 credit included
        </button>
      </div>
    </div>
  );
}
