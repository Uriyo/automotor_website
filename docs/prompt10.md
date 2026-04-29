Now build the internal Admin Panel at /admin. This is for the AutoMotor operations team to monitor everything.

Layout:
- Dark sidebar with admin-specific nav: 📊 Overview, 📨 Leads, 📞 Calls, 🏢 Yards, 🔧 Mechanics, 💳 Transactions, ⚖️ Disputes, 🤖 AI Monitor, 📈 SEO, 💰 Finance, 🚨 Anomalies, ⚙️ Settings.

OVERVIEW PAGE (/admin):

Top row of 6 KPI cards:
- "Today's GMV: $47,280" (with trend arrow).
- "Leads today: 347" with conversion rate.
- "Active yards: 312."
- "Active mechanics: 847."
- "Platform uptime: 99.98%."
- "AI call success rate: 91%."

Revenue chart:
- Big chart showing last 90 days, toggleable between GMV, lead fees, subscription revenue, and transaction take-rate.

Routing breakdown donut chart:
- Visual showing % of leads routed to yard_only, mechanic_primary, parallel_both, exclusive_yard, direct_connect.

Anomalies feed (right column):
- Real-time anomaly alerts: "Yard XYZ response rate dropped 40% in last 24h," "Spike in failed AI calls — 15% above baseline," "Dispute queue has 3 items older than 4 hours."

LEADS PAGE (/admin/leads):

Filterable table of all leads with score, routing path, status, attributed revenue.
Click any lead to open detailed view with full conversation replay (chat messages step-through), call transcripts, and routing decision reasoning.

CALLS PAGE (/admin/calls):

Table of all Vapi AI calls to yards. Columns: date, yard, lead, outcome, duration, cost.
Click any row to expand transcript + audio player.
Analytics: success rate by yard, average duration, common failure reasons.

YARDS PAGE (/admin/yards):

Table of all yards with filters: tier, quality score, GMV, state.
Click any yard to see full profile: quality score history, leads received, response rate, closed deals, reviews, disputes.
Admin actions: upgrade/downgrade tier, suspend, refund lead fees, send message.

MECHANICS PAGE (/admin/mechanics):

Similar to yards. Filterable table, full profile drill-down, admin actions.

TRANSACTIONS PAGE (/admin/transactions):

All transactions with Stripe details, status, dispute status, payout status.

DISPUTES PAGE (/admin/disputes):

Queue of open disputes grouped by urgency:
- Urgent (revenue > $2k): 15-min SLA timer.
- Standard (4-hour SLA).
- Low priority (24-hour SLA).
Each dispute card shows details and AI-suggested resolution ("Refund recommended based on fitment mismatch evidence").
Approve/reject/request more info buttons.

AI MONITOR PAGE (/admin/ai):

Tabs: Conversations, Calls, Prompts.
- Conversations: sample 100 random conversations per day. Flag anomalies. View replays.
- Calls: quality scoring of AI yard calls.
- Prompts: live-edit system prompts for AI agents. Version history. A/B test comparison (conversion rate by prompt version).

SEO PAGE (/admin/seo):

Dashboard showing:
- Total pages generated: 87,420.
- Pages indexed: 62,180.
- Monthly organic traffic: 1.3M visits.
- Top converting page types.
- Generation queue status.
- Deindex recommendations (pages with <3 visits/month).

FINANCE PAGE (/admin/finance):

Revenue breakdown by type: subscriptions, PPL, PPC, transaction take, ads.
Payout queue.
MRR chart, ARR chart, churn chart.

ANOMALIES PAGE (/admin/anomalies):

Real-time feed of system alerts. Severity levels (info, warning, critical). Auto-resolved and human-required.

SETTINGS PAGE (/admin/settings):

Feature flags. System prompts editor. Routing rules editor. Tier thresholds. Platform fee percentages.

Everything is read-heavy and scannable. Use dense tables with good filtering. Admin should feel like Stripe's dashboard — serious, fast, information-rich.

Do not build programmatic SEO pages yet.