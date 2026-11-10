# Business Insights – Bilingual Business Blog

Professional bilingual (Indonesian / English) business & entrepreneurship blog with a full admin dashboard for articles, translations, **advertisement script management**, Histats / analytics, and SEO.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Supabase**.

**Repository:** https://github.com/DediOneThai/business-blog

---

## Features

### Public Site
- `/id/` and `/en/` language routes
- Homepage with featured, latest, and popular articles
- Article detail pages with TOC, related articles, social sharing
- Category pages, search, About, Contact, Privacy, Terms, Disclaimer
- Mobile-first responsive design
- SEO: metadata, hreflang, sitemap, robots.txt, RSS, JSON-LD, Open Graph

### Admin Dashboard (`/admin`)
- Secure login via Supabase Auth
- Article CRUD with rich text editor (TipTap)
- Bilingual management via `translation_group_id`
- Draft / schedule / publish workflow
- Categories & media manager
- **Monetization / Ad Script Manager** (critical feature)
- **Histats + Analytics Script Manager**
- ads.txt management
- Site settings & global emergency switches

### Advertisement Management (No Code Deploy Needed)
Administrators can:
- Paste Adsterra, Google AdSense, or any HTML/JS embed codes
- Assign to 15+ placement slots
- Enable / disable individually or globally
- Target desktop / mobile
- Set priority & exclusion rules
- Manage multiple networks simultaneously
- Preview code as text only (never executed in admin)

### Analytics
- Paste complete Histats tracking script
- GA4, GTM, or any other script
- Independent enable/disable
- Exclude admin pages
- Global emergency kill switch

### Security
- RLS on all tables
- Only authenticated admins can manage scripts
- Scripts stored as text; rendered only on public pages after explicit enable
- Service role key never exposed to client
- Middleware protects `/admin/*`

---

## Quick Start

```bash
git clone https://github.com/DediOneThai/business-blog.git
cd business-blog
cp .env.example .env.local
npm install
```

1. Create Supabase project and fill `.env.local`
2. Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor
3. Create admin user and set `role = 'admin'` in `profiles`
4. `npm run dev`

Public: http://localhost:3000  |  Admin: http://localhost:3000/admin/login

Deploy to Vercel by importing this repo and adding the same env vars.

Changes to articles, ads, and analytics scripts **do not require redeploy**.

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_DEFAULT_LOCALE=id
```

---

## Ad Placements Supported

head, before_nav, below_nav, homepage_top, homepage_between, homepage_bottom, before_content, inside_content_1/2/3, after_content, article_sidebar, between_related, footer, custom

---

## Current Status

Foundation is production-oriented:
- Full DB schema + RLS + seed categories
- Auth middleware + Supabase clients
- Ad & analytics helpers with global kill switches
- Type definitions
- Bilingual homepage skeletons with AdSlot
- Admin login, dashboard, monetization & analytics list pages

Next steps: TipTap editor, article CRUD, media upload, remaining pages, create/edit forms for ads & analytics.
