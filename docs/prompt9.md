Now build the Mechanic Dashboard at /mechanics/dashboard. This is where partner mechanics submit part requests, manage quotes, track earnings, and refer other mechanics.

Layout:
- Left sidebar adapted for mechanics: "AutoMotor for Mechanics" wordmark, shop name with tier badge (Silver / Gold / Platinum).
- Nav links: 📊 Dashboard, 🔧 Part Requests, 💬 Active Quotes, 👥 Customers, 💰 Earnings, 🎁 Referrals, 🤖 AI Tools, ⚙️ Settings.

DASHBOARD HOME (/mechanics/dashboard):

Top greeting:
- "Welcome back, Mike's Auto."
- This month row of stat cards: "$4,280 earned," "12 jobs closed," "2.3× avg margin," "Platinum status progress: 7 of 9 deals."
- Tier progress bar with tier-up celebration animation when hit.

Big primary CTA button: "+ New Part Request." Full width, orange, taking prominent position.

Active quotes section:
- List of active quotes, 3 rows.
- Each row: vehicle + part, customer first name, base price, retail price, status (waiting/viewed/accepted/lost), time open.
- Example: "2014 Silverado · 5.3 engine · Base $1,800 · Your quote $2,350 · Dave M. · Viewing (3x) — call him."

AI Intelligence cards:
- Card 1: "🔥 Dave Martinez just opened your quote for the 4th time — 83% likely to buy. Call him now."
- Card 2: "Jessica hasn't opened her quote in 72 hours — likely lost. Send re-engagement? [Yes, draft one]."

Live earnings ticker in corner: "+$640 · Closed Silverado engine · 2 days ago."

NEW PART REQUEST FLOW (/mechanics/requests/new):

Multi-step form, one question per screen on mobile.

Step 1 — Vehicle:
- Three tabs: VIN, License Plate, Manual.
- VIN input with auto-decode.
- Show decoded year/make/model confirmation before proceeding.

Step 2 — What's needed:
- Structured dropdown: Engine, Transmission, Transfer case, Differential, Axle, Turbo, Head, Other.
- Sub-options appear based on pick (e.g., engine: complete long block / short block / cylinder heads).
- Additional constraints: max miles, max price, urgency.

Step 3 — Customer info (optional, skip in Model B):
- Customer name, phone, vehicle concerns, budget range.
- Toggle: "Handle pricing myself (Markup model)" or "Let AutoMotor quote customer directly (Commission model)."

Step 4 — Submit:
- Big button: "Submit request — Get base quotes in 90 seconds."
- Show a loading state with "📞 Calling 15 yards..." animation.

Step 5 — Base quotes arrive:
- Display as Quote Cards but labeled "Your cost" instead of "price."
- Each card: yard name, base price, shipping, total cost to mechanic, mileage, warranty.

Step 6 — Quote Builder (the killer feature):
- User selects one quote, then sees:
  - "Total cost to you: $2,045."
  - AI Pricing Assistant block with 3 suggested retail tiers:
    - Low: $2,400 (15% margin).
    - Mid 🔥: $2,650 (22% margin) — highlighted.
    - High: $2,950 (31% margin).
  - Editable retail price input.
  - Live calculation showing "Your profit: $605."
  - Big button: "Generate customer quote."

Step 7 — Customer quote delivery:
- Branded PDF preview with mechanic's shop name, logo, and contact info — AutoMotor branding invisible.
- Send options: SMS, email, or share link.
- Button: "Send quote."
- Below: AI-drafted SMS message preview that mechanic can edit.

ACTIVE QUOTES PAGE (/mechanics/quotes):

Filterable list of all sent quotes.
Columns: customer, vehicle + part, your price, status, last activity, AI intent score.
Each row expandable to show conversation history and "Call customer" and "Send follow-up" buttons.

EARNINGS PAGE (/mechanics/earnings):

Big hero number: "Lifetime earnings: $47,820."
This month breakdown: gross earnings, platform fees, net payout.
Payout history table with Stripe transfer IDs.
Tier progress toward next level with benefits unlocked visualization.

REFERRALS PAGE (/mechanics/referrals):

Top card: "Refer another mechanic. Earn $200 + 10% override for 12 months."
Unique referral link with copy button.
Social share buttons for Facebook, WhatsApp, SMS.
Your referrals table: each referred mechanic, their status (signed up / first deal / active), and your override earnings to date.
Top of page leaderboard: "You're #12 in Texas this month."

AI TOOLS PAGE (/mechanics/ai-tools):

Pricing AI: enter part + vehicle, get instant price suggestions.
Quote drafting AI: paste customer's concerns, get a draft quote and SMS.
Customer message AI: see suggested follow-ups for each active quote.

Mobile adaptations:
- New Part Request becomes a swipeable multi-screen flow.
- Customer quote delivery is 100% from phone, camera-friendly.
- One-tap actions everywhere.

Do not build admin panel yet.