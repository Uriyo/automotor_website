Now build the Yard Dashboard at /yards/dashboard. This is where partner junkyards manage leads, inventory, calls, and earnings.

Layout:
- Left sidebar replaces the consumer sidebar. Still 260px wide on desktop, hamburger on mobile.
- Yard sidebar contents:
  - Logo + "AutoMotor for Yards" wordmark.
  - Yard name with tier badge (Basic, Pro, or Exclusive).
  - Nav links: 📊 Dashboard, 📨 Leads, 📞 Calls, 📦 Inventory, ⭐ Reviews, 💰 Billing, 👥 Team, ⚙️ Settings, 📚 Help.
  - Bottom: logout button.

Main content area.

DASHBOARD HOME (/yards/dashboard):

Top greeting card:
- "Good morning, Tommy's Auto Salvage."
- Today's summary row: 4 stat cards side by side:
  - "12 new leads today" (green up arrow).
  - "4 calls completed."
  - "$2,180 revenue won."
  - "ROI: 6.2× this month."

Big hero card: "Lifetime profit through AutoMotor: $87,420." In huge Space Grotesk, orange. This is the number that justifies the subscription.

Live leads feed (main column):
- "Live leads" header.
- Each lead row: score badge (orange pill showing 87/100), vehicle, part, city, budget, time elapsed since arrival, and two buttons: "Quote" and "Decline."
- Example row: "87 · 2015 F-150 · 5.0L engine · Dallas · $2,400 budget · 2 min ago · [Quote] [Decline]."

Chart block (right column on desktop):
- "This week" line chart showing leads, quotes sent, and deals won over 7 days.
- Toggle between week, month, quarter.

Alerts section:
- "3 leads awaiting response — respond within 10 min to stay at priority."
- "2 inventory items have stale pricing — update for better match rate."
- "Monthly ROI report ready — [View]."

LEADS PAGE (/yards/leads):

Kanban board with 5 columns: New, Quoted, Won, Lost, Refunded.
- Each column has lead cards that can be drag-and-dropped between columns.
- Lead card content: score badge, vehicle + part, budget, customer first name + last initial, 2-sentence AI-generated conversation summary, timestamp.
- Filter bar at top: score range, part category, zip code, date, status.
- Bulk action: select multiple + "Quote with template."
- Every lead card has a "Dispute lead" button — opens a modal with reason dropdown: fitment mismatch, fake lead, duplicate, other.

LEAD DETAIL (/yards/leads/[id]):

Two-column layout.
- Left: full conversation between customer and AI, read-only, styled like the consumer chat.
- Right: quote submission panel.
  - AI-suggested quote pre-filled: price range, mileage, warranty.
  - Editable fields: price, mileage, warranty days, shipping availability, condition, notes.
  - Big orange button: "Send quote."
  - Below: "Quote will be sent as SMS to customer and appear in their chat."

CALLS PAGE (/yards/calls):

Table of all AI-dispatched calls to this yard.
- Columns: date, vehicle, part, outcome (available, not available, voicemail, declined), duration, transcript link.
- Click any row to expand transcript + audio player.
- Button to "Flag transcript" if inaccurate.

INVENTORY PAGE (/yards/inventory):

Top: "Upload inventory CSV" and "Add single part" buttons.
Table of inventory:
- Columns: Photo thumbnail, part description, Hollander #, vehicle tags, mileage, condition, asking price, status (available/pending/sold), last updated.
- Filter and search at top.
- Stale pricing warning: rows older than 90 days get a subtle amber badge "Update price for better matches."

BILLING PAGE (/yards/billing):

Top card: current plan (Basic/Pro/Exclusive) with upgrade button.
This month usage block: leads received, PPL spend, subscription cost, total spend.
ROI block: Revenue generated / Total spend = ROI multiple (big number).
Invoices table with download PDF links.
Payout schedule: "Next payout: Friday, Oct 25 — $1,847.00 to Chase ****4821."

TIER UPGRADE CTA (site-wide persistent banner for Basic yards):
- "You're leaving money on the table — upgrade to Pro saves you $180/month at your current lead volume. [Upgrade]."

Mobile adaptations:
- Kanban board becomes horizontal scroll.
- Tables become cards.
- Inventory upload is via mobile camera for single items.

Do not build mechanic dashboard or admin yet.