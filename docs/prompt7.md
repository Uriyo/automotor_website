Now build the onboarding flows for both yards and mechanics. Keep them fast, mobile-first, and frictionless. Both should feel like premium consumer-grade signups, not enterprise software.

FLOW 1: Yard signup at /junkyards/signup

Step 1 — Phone number:
- Single input: phone number, auto-formatted as (555) 123-4567.
- Button: "Send code."
- Reassurance text: "No password needed. We text you a 6-digit code."

Step 2 — OTP code:
- 6 input boxes, auto-advancing.
- Resend code link after 30 seconds.

Step 3 — Business info:
- Yard name.
- Owner name.
- Business address (full address input with Google Places–style autocomplete mock).
- EIN (optional).
- Service radius (slider, 10 to 500 miles, default 250).

Step 4 — Specialties:
- Multi-select pill buttons: Engines, Transmissions, Transfer cases, Differentials, Marine engines, Diesel engines, Classic/Vintage, Performance, Commercial truck parts.

Step 5 — Inventory upload:
- Three options as cards:
  - "Upload CSV" — drag and drop zone. Supports Hollander, Checkmate, Pinnacle, Powerlink exports.
  - "Connect existing system" — API sync (list of supported systems with logos).
  - "Skip for now — I'll add inventory later."

Step 6 — Stripe Connect:
- Embedded Stripe onboarding placeholder. Text: "Set up payouts with Stripe."
- Button: "Connect Stripe →."

Step 7 — Success screen:
- 🎉 illustration.
- Headline: "You're in. First leads arrive within 48 hours."
- Below: three cards showing "Next steps": Install mobile app, Review lead settings, Watch 2-min welcome video.
- Big button: "Go to dashboard →."

Progress bar at the top of every step showing current position.

FLOW 2: Mechanic signup at /mechanics/signup

Step 1 — Phone + OTP (same as yards).

Step 2 — Shop info:
- Shop name.
- Your name.
- Shop address.
- Specialties multi-select: General repair, Diesel, European, Japanese, Domestic trucks, Classic cars, Performance, Transmissions, Marine.

Step 3 — Certifications (optional):
- ASE Certified checkbox.
- Upload credentials.
- Years in business.

Step 4 — Pick earning model:
- Three large cards:
  - Commission — "We source and price. You get a flat referral fee."
  - Markup (recommended) — "We source. You set the final price. Keep the margin."
  - Hybrid — "Both. Reserved for Platinum partners after 3 months."
- Radio-style selection, orange highlight on selected card.

Step 5 — Stripe Connect (same as yards).

Step 6 — Success screen:
- "Welcome to the network."
- Two cards: "Submit your first part request" and "Invite another mechanic — earn 10% override for 12 months."
- Big button: "Go to dashboard →."

Both flows must be mobile-first with huge tap targets, single-question-per-screen feel, and smooth transitions between steps.

Do not build the full dashboards yet — just the onboarding.