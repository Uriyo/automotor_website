Now build the Quote Detail page at the route /quotes/[id]. This is where users land when they tap a Quote Card inside the chat.

Layout: two columns on desktop (60/40 split), stacked on mobile.

Top of page:
- Breadcrumb: "← Back to chat."
- Page title: part name + vehicle. Example: "5.3L Vortec Engine — 2014 Silverado 1500."
- Small orange badge: "🏆 BEST MATCH."

Left column (main content):

Image gallery at top:
- Large primary photo, rounded-2xl.
- 4 thumbnail photos below that swap the primary on tap.
- Use dark automotive stock-image placeholders.

Key details block (below gallery):
- Big headline price: "$1,800" in Space Grotesk, 48px.
- Below: "Market average: $2,100 · You're saving $300 (14%)" with a green checkmark.
- Two-column specs grid:
  - Mileage: 87,432 mi
  - Condition: Tested & verified
  - Warranty: 90 days parts
  - Ships: Monday, arrives Thursday
  - Donor vehicle: 2015 Silverado 1500, 5.3L V8
  - Compression test: Passed
  - Stock number: T-22847

"What's included" section:
- Bulleted list: Engine assembly, intake manifold, valve covers, oil pan, timing cover, accessory brackets.

"What's NOT included" section:
- Bulleted list: Exhaust manifolds, turbo/supercharger (N/A), wiring harness, ECU, accessories (alternator, power steering pump, AC compressor).

Fitment compatibility block:
- Green checkmark: "Confirmed fits your 2014 Silverado 1500 5.3L V8."
- Smaller text: "Cross-reference: GM part # 12624676. Also fits 2010–2014 Silverado/Sierra/Tahoe/Yukon 5.3L."

Yard info card:
- Yard name in bold: "Tommy's Auto Salvage."
- Star rating + reviews: "⭐ 4.8 (312 reviews)."
- Address with a small embedded map placeholder (use a dark map style).
- Distance: "23 miles from you."
- Hours: "Mon–Sat 8 AM – 6 PM."
- "Verified partner since 2021" orange badge.

Reviews section:
- "Reviews of this yard" header.
- 4 review cards. Each has star rating, reviewer first name + last initial + state, the vehicle they bought a part for, a short quote, and a date.

Similar quotes section (below):
- Horizontal scroll row of 4 more Quote Cards (lower priority alternatives).

Right column (sticky on desktop):

Reserve card (the conversion hero):
- Dark panel, rounded-2xl, thick orange border.
- Top: "Reserve this engine."
- Refundable hold: "$99 refundable deposit."
- Three checkmark lines: ✅ Holds the engine for 48 hours. ✅ Fitment guarantee — full refund if it doesn't fit. ✅ Escrow protected — pay yard on delivery.
- Big orange button: "Reserve for $99 →."
- Below: smaller outlined button: "📞 Call yard directly."
- Even smaller text link: "💬 Ask AI about this."
- Divider.
- "2 other shoppers viewing this in the last hour" in muted text.
- "Price valid for 4 hours" with a live countdown timer.

Shipping calculator (below Reserve card):
- Input: ZIP code.
- On entry: "Ships to 75001 — $245 freight. Delivered Thursday, Oct 24."

Installation helper (below shipping):
- Headline: "Need it installed?"
- Subtext: "We'll match you with 3 certified mechanics near you."
- Orange outlined button: "Find a mechanic →."
- Below: "Average install cost for this job: $1,400–$1,800."

Mobile behavior:
- The Reserve card becomes a sticky bottom bar with the price and "Reserve for $99" button always visible. Tapping expands the full Reserve card as a bottom sheet.
- Image gallery becomes a swipeable carousel.
- All sections stack.

Do not build supplier or mechanic pages yet.