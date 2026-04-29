Now build the homepage at the root route /. It should feel chat-first, not marketing-first. The chat input is the hero — not an image of a car.

Top navigation (inside main content area, not sidebar):
- Minimal. Left: empty (logo is already in sidebar). Right: "Sign in" text button and a filled orange "Get Quote" button.
- On mobile: hamburger menu icon left, centered logo, profile icon right.

Hero section (takes up the first 85vh on desktop, full 100svh on mobile):
- Centered content, max-width around 760px.
- Massive headline in Space Grotesk: "Your AI mechanic." on one line (72px desktop, 48px mobile, bold).
- Second line: "Quotes in 90 seconds." in lighter weight and muted gray color (48px desktop, 32px mobile).
- Subhead one sentence below: "We call 15 junkyards so you don't have to." (18px, muted).

Main chat input (the hero element):
- A large rounded textarea, 2xl corners, minimum height 120px.
- Placeholder text: "What's wrong with your ride?"
- Soft dark panel background (#141419), subtle border.
- Inside the textarea bottom-left: three icon buttons — microphone, camera, small car icon (for VIN).
- Inside bottom-right: a bold orange "Ask" pill button with a paper plane icon. Disabled state when textarea empty.
- On desktop, auto-focus on page load.
- On mobile, the input is the tallest element above the fold.

Suggestion chips (directly below input, horizontal scrollable row):
- "My truck won't start"
- "Need a used 5.3 motor"
- "Transmission shudders on my F-150"
- "What's my totaled car worth?"
- "Looking for a Cummins diesel"
- "Need a Mercruiser marine engine"
- Pill shape, dark background, subtle border, white text. Tap pre-fills the input.

Trust ticker (below chips, small text, centered):
- "⭐ 4.9 · 12,847 drivers · $3.2M saved this year"
- The dollar figure slowly ticks upward (fake animation every 3–5 seconds, adds $47–$320).

Below-the-fold sections (stack vertically):

Section A — 90-second demo video:
- Full-width dark card, rounded-2xl.
- Placeholder video thumbnail (use a dark automotive shop image).
- Big orange play button centered.
- Caption below: "Watch our AI call 15 junkyards in 90 seconds."
- Subcaption: "Real calls. Real yards. Real savings."

Section B — How it works (three horizontal steps on desktop, stacked on mobile):
- Step 1: 💬 Icon. Headline "Describe your problem." Subtext "Tell our AI what's wrong — it diagnoses in seconds."
- Step 2: 📞 Icon. Headline "AI calls 15 yards." Subtext "Parallel calls. Live quotes. No waiting on hold."
- Step 3: ✅ Icon. Headline "Pick your quote." Subtext "Compare prices, warranties, and shipping. We handle the rest."

Section C — Built for every American driver (four category cards in a grid):
- Card 1: 🚗 "Cars" — "Used engines and transmissions for every make and model."
- Card 2: 🚛 "Trucks" — "F-150, Silverado, Ram, Duramax, Cummins, Powerstroke. We've got it."
- Card 3: ⚓ "Marine" — "Mercruiser, Volvo Penta, Yamaha, OMC. Dock-to-dock delivery."
- Card 4: 🔧 "Commercial" — "Peterbilt, Kenworth, Freightliner. Fleet-ready parts."
- Each card has a hover lift effect, an arrow that slides right on hover, and a "Browse →" link.

Section D — Live savings feed (two columns on desktop, stacked on mobile):
- Left column: a vertical live-feed list of recent savings, styled like chat messages. Each entry: "Marcus in Phoenix just saved $2,400 on a 6.7 Cummins engine · 2 min ago." Fade a new one in every 8 seconds. Show 5 at a time.
- Right column: trust badges stacked vertically: BBB A+ Accredited, 30-Day Fitment Guarantee, Escrow Payment Protection, 250,000+ Partner Yards, Secured by Stripe.

Section E — Social proof / testimonials (horizontal scroll carousel):
- Three testimonial cards. Each has: a star rating, a short quote, a name and location, and the vehicle they saved on.
- Example: "Saved me $2,800 on a transmission for my F-250. Took 94 seconds." — Dave M., Houston TX, 2018 F-250 Super Duty.

Section F — For mechanics and junkyards (two side-by-side cards on desktop):
- Card 1 (orange accent border): "Are you a mechanic? Earn $200–$500 per engine job by sourcing through AutoMotor." Button: "Become a Partner Mechanic →"
- Card 2 (white/gray border): "Run a junkyard? Get qualified leads delivered by AI. First 90 days free." Button: "Join as a Yard →"

Section G — Final CTA:
- Centered block: "Stop calling 15 yards. Let AI do it." in huge Space Grotesk.
- Below: another instance of the chat input (same as hero).
- Another row of suggestion chips.

Footer:
- Four columns on desktop, stacked on mobile.
- Column 1: Product — How it works, Pricing, My Garage, For Mechanics, For Junkyards.
- Column 2: Categories — Cars, Trucks, Marine, Commercial, Diesel, Performance.
- Column 3: Company — About, Blog, Careers, Press, Contact.
- Column 4: Legal — Terms, Privacy, CCPA, Do Not Sell My Info, Accessibility.
- Below: AutoMotor.AI logo, social icons (X, Instagram, TikTok, YouTube), and "© 2025 AutoMotor.AI — Built in Texas. Powered by AI."

Mobile-first rules for this page:
- Hero chat input is always above the fold.
- Sticky call button stays visible throughout scroll.
- All sections stack vertically on mobile.
- Suggestion chips horizontally scroll with no scrollbar visible.

Do not build the chat conversation view yet. Only the homepage.