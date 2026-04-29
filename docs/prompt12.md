Now build the viral sharing system. This is the K-factor engine — every successful quote or transaction is a potential share.

COMPONENT 1: Savings Receipt Modal

Triggered automatically when:
- A user receives quotes that show meaningful savings (market avg vs best quote > 10%).
- A user completes a transaction via Reserve.

Modal design:
- Large dark centered modal, rounded-2xl, max-width 500px.
- Top: animated confetti burst when it opens (subtle, not obnoxious).
- Huge headline in Space Grotesk: "You just saved $1,240."
- Below: visual comparison — strikethrough "Market avg: $3,040" in muted text, then "Your best quote: $1,800" in bold white.
- Subtext: "On your 2014 Silverado engine — in 94 seconds."

Then a preview of the shareable image:
- A rectangular share card, dark background, orange accent, that says:
  - "I saved $1,240 on my 2014 Silverado engine."
  - "using AutoMotor.AI."
  - "in 94 seconds."
  - Small AutoMotor.AI logo bottom.
- This card is downloadable as a PNG.

Six share target buttons:
- 💬 iMessage
- 📱 WhatsApp
- 🎵 TikTok
- 📸 Instagram Stories
- 🐦 X
- 📘 Facebook
- 🔗 Copy link

Reward messaging:
- "Share your receipt — earn $25 credit + your friends get $25 off."

Close button: "Maybe later" (small, muted text link).

COMPONENT 2: Share Landing Page (/s/[code])

When someone clicks a shared link, they land on this page.

Layout:
- Sidebar hidden for cleaner conversion-focused landing.
- Top banner: "🎁 Your friend Mike sent you $25 off your first purchase."
- Large hero with the shared Savings Receipt card displayed prominently.
- Headline: "Mike saved $1,240 on their engine. You can too."
- Subhead: "The same AI is standing by."

Below hero: embedded chat input with pre-filled referral credit applied.
- Microcopy: "$25 credit auto-applied when you get a quote."

Section B: How it works (condensed 3-step block).

Section C: Live social proof feed of recent savings.

Section D: FAQ quick hits — "Is this free?", "How is this possible?", "What if I don't find what I need?"

Sticky bottom CTA on mobile: "Chat now — $25 credit included."

COMPONENT 3: Referral Dashboard (/referrals, accessible from user menu)

For logged-in users:
- Hero card: "You've earned $325 in referral credit."
- Unique referral link with copy button.
- Big share buttons (same 6 platforms).
- Progress ladder: "3 friends signed up. 5 more = Garage Gang status (lifetime 10% off install fees + priority access to rare parts)."
- Leaderboard: "You're #47 in Texas this month."
- List of all referred users and their status (signed up / quoted / purchased) with the credit earned for each.

COMPONENT 4: Mechanic Referral Share (inside mechanic dashboard, /mechanics/referrals — already built in Prompt 9, enhance now)

Add the full viral kit:
- "Refer another mechanic. Earn $200 + 10% override for 12 months per referred mechanic."
- Unique link with copy button.
- Pre-written SMS template: "Hey [name], been using AutoMotor to source used engines — been making an extra $3-4K/month. Worth checking out: [link]."
- Pre-written Facebook post.
- Pre-written email template.
- Order physical referral cards to hand to other mechanics: form to request 50 printed cards mailed free.

COMPONENT 5: Yard Referral (inside yard dashboard, /yards/referrals)

"Refer another yard. Earn $500 + 5% override for 12 months."
Similar mechanics.

MOBILE ADAPTATIONS:
- Savings Receipt modal becomes a bottom sheet on mobile.
- Share buttons use native iOS/Android share sheet where possible.
- Share landing page is fully mobile-optimized.
- All sharable images are optimized for the platform they'll land on (vertical for TikTok/IG Stories, horizontal for Facebook/X).

The whole viral system must feel celebratory, not salesy. This is the moment users feel pride — the UI should amplify that.

Do not build anything else. This completes the full frontend MVP.