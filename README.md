# Government Vehicle Auction Feed — Advanced Starter

A production-oriented starter for a public government vehicle auction aggregator.

## What it does

- Pulls live GSA Auctions API data.
- Filters likely vehicle listings.
- Normalizes listings into one database table.
- Exposes a public searchable listings API.
- Provides a Next.js UI with filters for state, source, status, and search.
- Includes a protected ingestion endpoint for GoDaddy cron jobs.

## Quick start

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run ingest:gsa
npm run dev
```

Visit `http://localhost:3000`.

## GoDaddy deployment path

Best GoDaddy setup:

1. Use GoDaddy for the domain.
2. Use GoDaddy VPS or cPanel Node.js hosting for the app.
3. Use GoDaddy MySQL or an external managed DB.
4. Add a cron job that calls `/api/ingest/gsa?secret=YOUR_SECRET` every 15–30 minutes.

Example cron command:

```bash
curl -fsS "https://yourdomain.com/api/ingest/gsa?secret=YOUR_SECRET" >/dev/null
```

## Add more sources later

Add source adapters under `lib/sources/`. Keep every adapter returning the same normalized listing shape.

