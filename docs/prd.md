# Automotor.ai — Engineering Requirements Document

## What We're Building

**Automotor.ai** is a high-ticket online marketplace for used engines and transmissions covering three verticals: passenger vehicles, commercial trucks, and marine. The primary buyer interface is a **ChatGPT-style conversational UI** backed by an AI "Master Mechanic" that handles fitment, diagnosis, and inventory search. Salvage yards list inventory and manage sales through a dedicated dashboard. Payments flow through a **Stripe Connect escrow model** — funds are held until the buyer confirms the part runs.

**Business model:**
- Free for buyers
- Subscription for yards: $99 Starter / $249 Growth / $499 Fleet monthly
- 3–5% commission per transaction
- Freight: hybrid model (API estimate upfront, yard confirms final at checkout)

---

## The Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend framework | **Next.js 14 (App Router)** on Vercel | Server-side rendering is mandatory for SEO; SPA will not rank |
| UI | React 18 + TypeScript + Tailwind + shadcn/ui | Lovable-native |
| Auth + DB | Supabase (Postgres + Auth + Storage + Edge Functions) | Unified backend, RLS security |
| Database extensions | pgvector, PostGIS, pg_trgm, pgcrypto | Semantic search, geo queries, fuzzy text |
| Payments | Stripe Connect (Express accounts) | Escrow-capable marketplace payments |
| AI | OpenAI API (GPT-4 class + Whisper + embeddings) | Chat brain, audio triage, semantic search |
| Freight | LTL broker API (uShip or Freightquote) | Live shipping quotes |
| VIN decoding | NHTSA vPIC API (free) | Authoritative source |
| Email | Resend | Transactional + lead notifications |
| Analytics | Vercel Analytics + PostHog | Core Web Vitals + product events |
| Monitoring | Sentry | Error tracking |
| CDN / Hosting | Vercel + Supabase CDN | Edge caching for ISR pages |

---

## Functional Requirements

### FR-1: Authentication & User Management
- Email magic-link + Google OAuth via Supabase Auth
- Unified `profiles` table with roles: `buyer`, `yard_owner`, `yard_staff`, `admin`
- Auto-create profile row on signup via Postgres trigger
- Role-based route protection (buyers cannot access `/yard/**`, etc.)
- Session refresh via Next.js middleware

### FR-2: Yard Onboarding & Management
- Yard registration with business verification (EIN, address, contact)
- Stripe Connect Express onboarding flow with return/refresh URLs
- Subscription selection & Stripe billing integration
- Verification status badge (manual admin approval for MVP)
- Yard staff invitations (sub-users under one yard)
- Yard dashboard with 7 sections: Dashboard (KPIs), Inventory, Leads, Orders, Payouts, Subscription, Settings

### FR-3: Inventory Management
- Multi-step listing creation wizard:
  1. VIN/HIN decode → auto-populate vehicle data
  2. Part details (category, condition, mileage/hours, specs)
  3. Pricing (base + core charge)
  4. Media upload (min 3 photos + run-video + optional teardown PDF)
  5. SEO preview + publish
- Listing statuses: `draft`, `active`, `pending_sale`, `sold`, `archived`
- Auto-generate `seo_slug` and `embedding` (OpenAI text-embedding-3-small) on publish
- Bulk CSV import (post-MVP)
- Listing edit history/audit log (post-MVP)

### FR-4: Buyer Chat Experience
- Full-viewport chat on homepage with hero input
- Chat threads persistent per buyer × listing combination (`leads` table)
- Message types: buyer text, yard text, AI text (streaming), system events, inline listing cards, inline spec cards
- Attachments: images + audio (for engine-sound triage)
- Real-time updates via Supabase Realtime subscriptions
- Rate limiting for unauthenticated users (5 messages before signup wall)
- Transaction Shield UI: live escrow state machine during active deals

### FR-5: AI Brain (Fitment Expert)
- Streaming responses via Edge runtime API route
- System prompt: "Master Mechanic" persona with VIN/HIN decoding, sound triage, fitment rules
- Structured JSON output alongside natural language (intent, extracted entities, inventory queries)
- Tool functions:
  - `decode_vin(vin)` — NHTSA API with 30-day cache
  - `decode_hin(hin)` — MIC lookup + build date parse
  - `search_inventory(filters, embedding)` — hybrid semantic + structured search
  - `create_lead(buyer_id, inventory_id)` — hand off to yard
- Audio triage: upload → Whisper transcription → chat injection
- Hard guardrails: never quote unlisted prices, never promise fitment without yard confirmation, refuse off-platform payment requests

### FR-6: Part Detail Pages (SEO-Critical)
- Route: `/parts/{vertical}/{make}/{model}/{year}/{category}/{slug}-{id}`
- Server-rendered with ISR (`revalidate = 3600`)
- `generateStaticParams` pre-builds top 1000 listings at build time
- Dynamic metadata: title, description, canonical, OG image (via @vercel/og)
- JSON-LD: Product, Offer, Vehicle, VideoObject, BreadcrumbList, AggregateRating
- Photo gallery, run-video player, spec table, yard card, CTA to start chat
- Status-aware indexing: `active` = indexed, `sold` = `OutOfStock` but still indexed, `draft` = noindex

### FR-7: Programmatic SEO Hub Pages
- Catch-all routes for head terms:
  - `/used-engines/[[...segments]]`
  - `/used-transmissions/[[...segments]]`
  - `/used-marine-engines/[[...segments]]`
  - `/used-diesel-engines/[[...segments]]`
  - `/used-outboard-motors/[[...segments]]`
- Segment parser resolves URL into typed `pageParams` (pillar, make_hub, model_hub, year_hub, code_hub, geo_hub)
- Shared `buildHubPage()` function pulls template from `seo_templates` table and interpolates with live Supabase aggregates
- Template placeholders: `{make}`, `{model}`, `{year}`, `{code}`, `{count}`, `{avg_price}`, `{city}`, `{top_models}`, `{year_range}`
- Filter sidebar (make, model, year, price, mileage, condition, distance) with client-side URL updates
- ISR: `revalidate = 1800`
- Hide pages with <3 active listings (avoid thin content)
- 15–25 internal links per page to siblings + silo articles

### FR-8: Content Silo Articles
- Routes: `/engines/{passenger|commercial|marine}/[slug]`
- MDX-backed with frontmatter
- Article schema + BreadcrumbList JSON-LD
- Inline listing previews (database-queried by context)
- Each article links to 5+ hub pages + 3+ PDPs

### FR-9: Payment & Escrow
- Stripe Connect Express accounts per yard
- Checkout via Stripe Payment Intent with manual capture (funds held)
- Application fee = `subtotal × commission_rate`
- Transfer destination = yard's `stripe_account_id`
- Transaction states: `authorized → escrow_held → shipped → delivered → confirmed → released | refunded | disputed`
- Escrow release triggers:
  - Buyer clicks "Confirm engine runs" → immediate transfer
  - Auto-release 7 days post-delivery if no dispute
- Refund flow on dispute (within dispute window)
- Webhook handler for: `payment_intent.succeeded`, `charge.dispute.created`, `payout.paid`, `account.updated`

### FR-10: Freight Integration
- LTL broker API integration (uShip or Freightquote)
- Input: origin zip, destination zip, weight, dimensions
- Output: estimate, transit days, carrier options
- Cached 24h by zip-pair + weight bracket in `shipping_quotes` table
- Yard confirms final quote at checkout (hybrid model)

### FR-11: Sitemaps & Indexing
- Sitemap index at `/sitemap.xml`
- Per-vertical sitemaps (split at 45k URLs): passenger, commercial, marine, transmissions, yards, content
- Nightly regeneration via Supabase Edge Function + pg_cron
- IndexNow ping on every new active listing
- `robots.txt`: allow all public routes, disallow `/yard/**`, `/chat/**`, `/auth/**`, `/api/**`

### FR-12: Search (Internal)
- `/search` page with server-side search
- Hybrid: Postgres FTS (`tsvector`) + pgvector semantic (cosine similarity)
- Filters: vertical, category, make, model, year, price range, mileage range, condition, distance

### FR-13: Reviews & Reputation
- One review per completed transaction
- 1–5 star rating + text body
- Aggregate rating + count on yard profile
- Schema.org AggregateRating on yard pages when `rating_count >= 5`

### FR-14: Admin Console (MVP-light)
- Yard verification approval queue
- Dispute resolution dashboard
- Manual escrow release override
- Listing flag/takedown
- Platform-wide metrics

---

## Non-Functional Requirements

### NFR-1: Performance (SEO-Critical)
- **LCP < 1.5s** (p75) on PDPs and hub pages
- **CLS < 0.05**
- **INP < 200ms**
- **TTFB < 600ms** for ISR cache hits
- All images via `next/image` with AVIF/WebP
- Display font preloaded, body font `font-display: swap`
- No runtime CSS-in-JS
- Zero client-side JS for above-fold PDP content

### NFR-2: Scalability
- Support 10k active listings at launch → 100k within 18 months
- Support 1k concurrent chat sessions
- ISR handles ≥50k unique URLs without rebuild-storm
- Database indices on all hot paths (listed in schema)

### NFR-3: Security
- Row Level Security on every table
- Service role key only used in Edge Functions, never in client
- Stripe webhook signature verification with `STRIPE_WEBHOOK_SECRET`
- PII encryption at rest (Supabase default)
- HTTPS-only; HSTS enabled
- CSP headers blocking inline scripts (except JSON-LD)
- Rate limiting on chat API (per IP + per user)
- Signed URLs for teardown reports and sensitive media

### NFR-4: Reliability
- 99.9% uptime target
- Stripe webhook idempotency (via event ID deduplication)
- Database backups: Supabase daily + weekly PITR
- Graceful degradation: if NHTSA is down, allow manual entry; if freight API is down, yard quotes manually
- Sentry error tracking with Slack alerts for critical errors

### NFR-5: SEO Compliance
- All PDPs + hub pages server-rendered HTML on first byte
- Valid JSON-LD on 100% of public pages (CI check required)
- Canonical URLs on every page
- No content depends on client-side JavaScript to render
- Proper 301 redirects (not 302) for URL changes
- `noindex` on user-generated pages that shouldn't rank (drafts, search results, etc.)

### NFR-6: Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML, proper ARIA where needed
- Keyboard navigation for chat, dashboard, forms
- Color contrast meets AA standards (dark theme palette validated)
- Screen reader tested for core flows

### NFR-7: Observability
- PostHog events: chat_started, vin_decoded, listing_viewed, lead_created, checkout_started, payment_authorized, escrow_released, yard_signup, yard_listing_published, dispute_opened
- Vercel Analytics for Core Web Vitals
- Sentry for error tracking across frontend, API routes, Edge Functions
- Supabase logs for DB query performance
- Stripe Dashboard for payment monitoring

### NFR-8: Compliance
- PCI-DSS: handled by Stripe (never touch card data)
- GDPR/CCPA: user data export + delete flows
- Terms of Service, Privacy Policy, Acceptable Use Policy, Dispute Policy, Refund Policy pages
- Cookie consent banner (required in EU)
- Business registration, EIN, liability insurance documented

---

## Database Schema Summary

Full DDL in the `automotor-schema.sql` file generated earlier. Tables:

| Table | Purpose | Row Count Estimate (Y1) |
|---|---|---|
| `profiles` | Unified user accounts | 10k–50k |
| `yards` | Salvage yard businesses + subscription state | 100–500 |
| `inventory` | Part listings with VIN/HIN, specs, media, embedding | 5k–50k |
| `leads` | Buyer × listing chat thread | 20k–200k |
| `lead_messages` | Individual messages in a thread | 500k–5M |
| `transactions` | Escrow state + commission tracking | 1k–10k |
| `reviews` | Post-transaction ratings | 500–5k |
| `seo_templates` | Programmatic SEO content templates | ~20 rows (hand-curated) |
| `vin_decode_cache` | NHTSA API cache | 10k–100k |
| `shipping_quotes` | Freight API cache | 50k–500k |

**Required extensions:** uuid-ossp, pgcrypto, postgis, vector, pg_trgm.

---

## API Surface

### Next.js API Routes (frontend + backend)
- `POST /api/chat` — streaming AI chat
- `POST /api/triage` — audio transcription
- `POST /api/stripe/create-checkout` — initiate payment with escrow hold
- `POST /api/stripe/webhook` — Stripe event handler
- `POST /api/stripe/change-subscription` — yard subscription updates
- `POST /api/stripe/connect-onboard` — Connect Express account link
- `POST /api/revalidate` — ISR invalidation trigger from DB webhooks
- `GET /api/og/listing/[id]` — dynamic OG image for PDPs
- `GET /api/og/hub/[...segments]` — dynamic OG image for hub pages

### Supabase Edge Functions (server-side background jobs)
- `decode-vin` — NHTSA vPIC wrapper with cache
- `decode-hin` — Marine HIN parser
- `freight-estimate` — LTL broker API wrapper
- `generate-sitemap` — nightly sitemap build
- `release-escrow` — Stripe Transfer trigger on buyer confirmation / auto-release timer
- `send-lead-notification` — Resend email to yard on new lead

### Supabase Database Webhooks
- `inventory` insert/update → `/api/revalidate` for affected PDP + sibling hub paths
- `leads` insert → `send-lead-notification`
- `transactions` status change → in-app notification + email

---

## Storage Buckets

| Bucket | Access | Purpose |
|---|---|---|
| `inventory-media` | Public read, yard-owner write | Listing photos |
| `run-videos` | Public read, yard-owner write | Engine run-video proof |
| `teardowns` | Signed URLs only, yard-owner write | Teardown report PDFs |
| `profile-avatars` | Public read, self write | User avatars |
| `lead-attachments` | Authenticated read, authenticated write | Chat uploads (images, audio) |
| `public-assets` | Public read, service-role write | Sitemaps, OG image cache |

---

## Third-Party Integrations

| Service | Purpose | Critical Path? |
|---|---|---|
| Stripe | Payments, subscriptions, Connect escrow | Yes |
| OpenAI | Chat, embeddings, Whisper | Yes |
| Supabase | Auth, DB, storage, Edge Functions, Realtime | Yes |
| Vercel | Hosting, ISR, Edge runtime | Yes |
| NHTSA vPIC | VIN decoding | Yes (with fallback) |
| uShip / Freightquote | Freight quotes | Yes (with yard manual fallback) |
| Resend | Transactional email | Yes |
| PostHog | Product analytics | No |
| Sentry | Error tracking | No |
| Google Search Console | SEO monitoring | No |

---

## Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Stripe
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# OpenAI
OPENAI_API_KEY

# Freight
FREIGHT_API_KEY
FREIGHT_API_URL

# Resend
RESEND_API_KEY

# App
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_POSTHOG_KEY
SENTRY_DSN
```

---

## Build Sequence (7 Prompts, Previously Defined)

1. **Foundation** — Next.js scaffold, Supabase client, design tokens, auth
2. **Buyer Chat** — chat UI, AI streaming, message persistence, Transaction Shield
3. **Yard Dashboard** — side-nav, inventory wizard, leads, orders, payouts, subscription
4. **Part Detail Pages** — ISR-rendered PDPs with full JSON-LD + metadata
5. **Programmatic SEO Hubs** — catch-all routes, template engine, filter sidebar
6. **Integrations** — Edge Functions, Stripe webhooks, VIN/HIN/freight APIs, OG images
7. **Polish** — content silos, sitemaps, analytics, trust pages, launch checklist

---

## Open Engineering Decisions

These need resolution before Prompt 6:

1. **Freight broker:** uShip API vs Freightquote vs direct XPO/Estes integration
2. **Dispute window length:** 7 days post-delivery vs 14 days
3. **Auto-release timer:** runs on pg_cron or Vercel Cron Jobs
4. **Realtime strategy:** Supabase Realtime channels vs polling for chat updates
5. **Image processing:** on-upload Sharp transform vs on-request via Vercel
6. **Rate limiting backend:** Upstash Redis vs Supabase table with time-windowed counts
7. **Search ranking weights:** how to blend FTS score + embedding similarity + recency + distance

---

## Deliverables Already Generated in This Thread

Files available in `/mnt/user-data/outputs/`:
- `automotor-schema.sql` — complete Supabase DDL with RLS policies
- `automotor-ai-implementation-brief.md` — original brief (branding, SEO strategy, AI brain prompt, launch prompt)
- `automotor-lovable-build-plan.md` — 7-prompt sequential build plan with programmatic SEO architecture

---
