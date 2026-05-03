"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, X, MessageSquare } from "lucide-react";

export default function StickyCallButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileClick = () => {
    window.location.href = "tel:+18005551234";
  };

  // Hide entirely on routes that have their own bottom UI to avoid
  // stacking / covering content. The button is a marketing affordance —
  // not needed inside chat/dashboard contexts.
  const hide =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/yards/") ||
    pathname.startsWith("/mechanics/dashboard") ||
    pathname.startsWith("/mechanics/requests") ||
    pathname.startsWith("/mechanics/quotes") ||
    pathname.startsWith("/mechanics/customers") ||
    pathname.startsWith("/mechanics/earnings") ||
    pathname.startsWith("/mechanics/referrals") ||
    pathname.startsWith("/mechanics/ai-tools") ||
    pathname.startsWith("/mechanics/settings") ||
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/auth/");

  if (hide) return null;

  return (
    <>
      {/* Desktop: floating pill bottom-right */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange-DEFAULT text-white font-medium text-sm shadow-lg shadow-orange-DEFAULT/20 hover:bg-orange-hover transition-colors"
        >
          <Phone size={14} aria-hidden="true" />
          Talk to an expert
        </button>
      </div>

      {/* Mobile: full-width bar pinned to bottom (only on marketing
          surfaces — hidden on chat/dashboard via the early return above) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe border-t border-line bg-panel">
        <button
          onClick={handleMobileClick}
          className="w-full bg-orange-DEFAULT text-white font-medium py-3.5 text-sm flex items-center justify-center gap-2 tap-target"
          aria-label="Call AutoMotor for a free quote"
        >
          <Phone size={14} aria-hidden="true" />
          Call for a free quote
        </button>
      </div>

      {/* Desktop modal */}
      {modalOpen && (
        <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-to-expert-heading"
            className="relative bg-panel border border-line rounded-xl p-6 w-full max-w-sm"
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <h3 id="talk-to-expert-heading" className="font-semibold text-base text-text-primary mb-1">
              Talk to an expert
            </h3>
            <p className="text-sm text-text-secondary mb-5">
              Free consultation with a senior mechanic.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+18005551234"
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-lg bg-orange-DEFAULT text-white font-medium text-sm hover:bg-orange-hover transition-colors"
              >
                <Phone size={14} aria-hidden="true" />
                Call us now
              </a>
              <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors">
                <Phone size={14} className="text-text-secondary" aria-hidden="true" />
                Request a callback in 5 min
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-lg border border-line text-text-primary text-sm font-medium hover:bg-elevated transition-colors"
              >
                <MessageSquare size={14} className="text-text-secondary" aria-hidden="true" />
                Continue chatting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer that adds bottom padding on mobile so page content
          doesn't get stuck under the fixed bar. Only shown when the
          bar is. */}
      <div className="lg:hidden h-16 mb-safe" aria-hidden="true" />
    </>
  );
}
