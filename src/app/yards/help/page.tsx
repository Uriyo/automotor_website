"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare, Phone, BookOpen } from "lucide-react";

const faqs = [
  {
    q: "How does lead routing work?",
    a: "AutoMotor's AI matches each part request to yards based on your inventory, coverage radius, response history, and tier. Leads are sent to you via SMS and dashboard simultaneously. You have 30 minutes to respond before the lead widens to other yards.",
  },
  {
    q: "What happens when I quote a lead?",
    a: "Once you submit a quote through the Lead Detail page, our AI presents it to the customer alongside other quotes. If the customer accepts yours, they pay a $99 reservation fee and you receive a notification to confirm inventory availability.",
  },
  {
    q: "How do disputes work?",
    a: "Disputes can be filed by customers within 7 days of delivery. Our team reviews the dispute, contacts both parties, and makes a resolution decision within 24 hours. Keep your part descriptions accurate to minimize disputes.",
  },
  {
    q: "When do I get paid?",
    a: "Payouts are processed every Friday via Stripe for all completed sales from the prior week. The $99 reservation fee minus the 10% platform fee is transferred directly to your bank account on file.",
  },
  {
    q: "Can I pause my account temporarily?",
    a: "Yes — contact support and we can pause lead routing for up to 30 days without affecting your subscription status. After 30 days the account will be reviewed.",
  },
  {
    q: "How do I upload inventory?",
    a: "Go to Inventory in the sidebar. You can upload a CSV file, paste inventory data, or use our API. We support standard SEMA/AIAG part number formats. Accurate inventory data improves your lead match quality.",
  },
];

export default function YardHelpPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
      <h1 className="font-semibold tracking-tight text-2xl text-text-primary mb-2">Help Center</h1>
      <p className="text-text-secondary text-sm mb-8">Everything you need to get the most out of AutoMotor for Yards.</p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: MessageSquare, label: "Live chat", desc: "Avg. reply in 2 min", action: "Start chat", color: "text-orange-DEFAULT" },
          { icon: Phone, label: "Call support", desc: "Mon–Fri, 8am–8pm CT", action: "(800) 555-1234", color: "text-blue-400" },
          { icon: BookOpen, label: "Documentation", desc: "Full platform guide", action: "Browse docs", color: "text-green-400" },
        ].map((item) => (
          <div key={item.label} className="bg-panel rounded-xl border border-line p-4">
            <item.icon size={18} className={`${item.color} mb-2`} aria-hidden="true" />
            <p className="font-semibold text-text-primary text-sm">{item.label}</p>
            <p className="text-xs text-text-secondary mb-3">{item.desc}</p>
            <button className={`text-xs font-semibold ${item.color} hover:underline`}>{item.action}</button>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-panel rounded-xl border border-line p-5 mb-6">
        <h3 className="font-semibold text-text-primary mb-3">Quick links</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Getting started guide",
            "Inventory upload template (CSV)",
            "Lead response best practices",
            "Pricing your quotes to win",
            "Understanding your score",
            "Stripe payout setup",
          ].map((link) => (
            <button key={link} className="text-left text-sm text-orange-DEFAULT hover:underline py-1">{link} →</button>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-panel rounded-xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-text-primary">Frequently asked questions</h3>
        </div>
        <div className="divide-y divide-line">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-elevated transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-text-primary text-sm pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`text-text-secondary flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
