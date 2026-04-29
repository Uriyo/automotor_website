Now build the chat conversation page at the route /chat/[id]. This is where users land after submitting their first message on the homepage.

Layout:
- Desktop: three-column layout. Left sidebar stays (already built). Center column is the message thread, max-width 760px, centered. Right column is a 320px "Live Status" panel that appears only when AI actions are running.
- Mobile: single column. Sidebar collapses to hamburger. The "Live Status" panel becomes a sticky collapsible card at the top of the chat.

Chat header (top of center column):
- Breadcrumb: "← New chat" on the left (returns to homepage).
- Center: conversation title auto-generated from first user message, like "5.3 engine for 2014 Silverado."
- Right: small garage icon and a three-dot menu.

Message thread (scrollable center area):
- User messages: right-aligned, max 85% width, soft dark bubble with subtle orange left border, white text, rounded-2xl.
- AI messages: left-aligned, max 85% width, slightly darker bubble, off-white text, rounded-2xl. Small wrench icon avatar to the left.
- Messages fade in from below with a 200ms ease-out.
- Typing indicator: three small orange dots with staggered pulse while AI is "thinking."
- Auto-scroll to bottom on new message, but pause if user has scrolled up.

AI messages can contain inline rich components. Build these as distinct component types the chat can render:

COMPONENT 1 — Diagnosis Card:
- Bordered card inside the AI bubble, slightly lighter background.
- Red dot + headline "Most likely: AFM Lifter Failure".
- Horizontal progress bar showing confidence (e.g., 78%).
- Below: two alternative causes in muted gray text with their own confidence percentages.
- Section: "Typical fix: Used engine swap — $1,800–$3,200."
- Two buttons side by side: filled orange "Get quotes →" and outlined "Learn more."

COMPONENT 2 — Phone Capture Card:
- Distinct bordered card, border-2 in primary orange, slightly brighter background.
- Top: 🚀 icon + headline "Ready to call 15 yards for you."
- Subtext: "Where should I text the quotes?"
- Single phone input that auto-formats as user types: (555) 123-4567. Big, tall input.
- Below input, two reassurance lines: "⚡ Quotes in 90 seconds" and "🔒 We never call you — SMS only."
- Big orange "Get My Quotes →" button, full width.
- Tiny gray text below: "No account needed · No spam."

COMPONENT 3 — Quote Card:
- Bordered dark card.
- Top: "🏆 BEST MATCH" orange badge (only on the first / highest-ranked quote).
- Yard name in bold, star rating and review count beside it.
- City and distance in muted gray.
- Part description line: "5.3L Vortec · 87,432 mi."
- Big bold price (text-3xl, white): "$1,800."
- Below price: smaller line "market avg: $2,100 ✓ good deal" (green checkmark if below market, amber warning if above).
- Three checkmark bullet rows: ✅ 90-day warranty, ✅ Ships Monday, ✅ Tested & verified.
- Two small buttons side-by-side: 📞 Call | 💬 Chat.
- One big orange button below: "Reserve for $99 →".
- Footer line in muted text: "👀 2 other shoppers viewing this."

COMPONENT 4 — Comparison Table:
- Appears once three or more quotes are in.
- Yards as columns, metrics as rows (Price, Mileage, Warranty, Ships in, Rating).
- Star icon on the best value in each row.
- "Pick this one" button under each column, filled orange.
- Horizontal scroll on mobile.

COMPONENT 5 — Mechanic Referral Card:
- Appears when the part typically requires professional installation.
- Header: "Need it installed? Here are 3 certified mechanics near you."
- Three mini-cards showing: shop name, star rating, distance, specialty badge.
- Below mini-cards, a prominent line: "Your mechanic can order this engine through AutoMotor and handle the whole job — one price, one warranty."
- Button: "Get install quotes →".

COMPONENT 6 — Suggestion Chips:
- Horizontal row of 3–4 small tappable pills below an AI message.
- Example chips: "Get quotes now," "What could cause this?," "Find a mechanic near me," "Is this a fair price?"
- Tapping a chip submits it as the next user message.

Live Status panel (right column on desktop, sticky card at top of chat on mobile):
- Only appears when AI has started an action like calling yards.
- Header: "🔍 Calling yards..."
- Progress bar: "8 of 15 complete."
- Timer: "1:12 elapsed."
- Subheader: "Currently calling:"
- Live-updating list of 3 yard names with small phone icons, like "📞 Pick-n-Pull Dallas," "📞 Tommy's Auto Salvage," "📞 LKQ Garland."
- Subheader: "Quotes received:"
- Inline mini Quote Cards as they come in.
- When all calls are done, header changes to "✅ Done — 3 quotes in 94 seconds."

Chat input (sticky at bottom of center column):
- Rounded textarea, similar styling to homepage.
- Left icons inside: microphone, camera, small car icon for VIN.
- Right: orange "Send" paper-plane button, disabled when empty.
- On mobile, sticky to bottom with safe-area-inset padding.
- When focused on mobile, the sticky call button shrinks to a floating circle.

Critical chat flow rules (build as mock sequential behavior):
- Turn 1–2: AI asks clarifying questions. Only one question per message.
- Turn 3: AI commits to a diagnosis, renders a Diagnosis Card.
- Turn 4: AI proposes action: "Want me to call 15 yards for you?"
- Turn 5: When user agrees, AI renders a Phone Capture Card inline in chat.
- After phone captured: AI renders a "Dispatching calls now..." message and the Live Status panel activates.
- Over 60–90 seconds (simulate with timers), Quote Cards stream in one at a time into the chat.
- Once 3 quotes are in, AI renders a Comparison Table and a Mechanic Referral Card.
- Final AI message: "Ready to lock one in? Tap Reserve on your favorite."

Do not build a backend. Use mock data and setTimeout animations to simulate the flow. The goal is for every click-through to feel real during a demo.

Do not build Garage, Quote Detail, or Share pages yet.