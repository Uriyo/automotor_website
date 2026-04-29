Create a new project called AutoMotor.AI — a ChatGPT-style AI platform for Americans who need used engines, used transmissions, commercial truck parts, and marine engines.

Set up the foundation first. Do not build any pages yet. Only set up the design system, global layout shell, branding, and theme.

Brand identity:
- Name: AutoMotor.AI
- Tagline: "Your AI mechanic. Quotes in 90 seconds."
- The product feels like talking to a master mechanic who has 500 junkyards on speed dial.
- Vibe: premium, American, blue-collar confidence meets Silicon Valley polish.
- Closer to Linear, Vercel, and Superhuman than to Car-Part.com or eBay Motors.

Visual system:
- Dark mode by default (no light mode toggle needed for MVP).
- Background: near-black charcoal (#0B0B0F).
- Panel and card background: slightly lighter charcoal (#141419).
- Primary accent: bold automotive orange (#FF6B1A) — use sparingly but boldly on primary buttons, active states, key numbers, and the sticky call button.
- Text primary: soft off-white (#F5F5F7).
- Text secondary: muted gray (#8A8A93).
- Borders: white at 6% opacity for subtle separation.
- Typography: Inter for all UI and body text. Space Grotesk for hero headlines, big numbers, and section titles.
- Rounded corners: 2xl (16px) on cards, full pill on buttons.
- All transitions: 200ms ease-out.
- Subtle animations: messages fade in from below, quote cards slide in from the right, the sticky call button has a gentle pulsing orange glow.

Global layout shell:
- Desktop: persistent left sidebar at 260px wide, main content area fills the rest.
- Mobile: sidebar collapses into a hamburger menu top-left, logo centers in the header, profile icon top-right.
- All tap targets minimum 44x44 points.
- Safe-area-inset padding on mobile bottom for iPhone notch/home indicator.

Left sidebar contents (build as a reusable component):
- Top: AutoMotor.AI logo (a small wrench icon in orange + wordmark in white).
- "+ New chat" button directly below, orange outline, rounded-full.
- Scrollable list of past conversations with timestamps (use 8 placeholder conversations like "5.3 Silverado engine", "F-150 transmission", "Cummins diesel search", etc.).
- Divider.
- Category links with small icons: 🚗 Cars, 🚛 Trucks, ⚓ Marine, 🔧 Commercial Parts.
- Divider.
- "🚗 My Garage" link.
- "For Mechanics" link.
- "For Junkyards" link.
- Bottom: user avatar circle with name "Guest" and a settings gear icon.

Sticky call button (build as a global component that appears on every page):
- Desktop: floats bottom-right as a pill with "📞 Talk to an expert · Free" and a pulsing orange glow.
- Mobile: full-width bar pinned to bottom of viewport just above safe-area-inset, reading "📞 Call now — Free quote in 2 min".
- When mobile chat input is focused, the sticky call button shrinks to a small floating circle in the bottom-right corner so it doesn't overlap the keyboard.
- Clicking on desktop opens a modal with three options: "Call us now," "Request a callback in 5 min," "Continue chatting."
- Clicking on mobile opens the device dialer with tel:+18005551234.

Do not build homepage or chat yet. Only confirm the design system, sidebar shell, and sticky call button work across desktop and mobile breakpoints.