# GoDaddy Deployment Guide

## Recommended GoDaddy product

Use **GoDaddy VPS** if you want the fewest limitations. Shared cPanel Node.js hosting can work for a small MVP, but VPS is better for cron jobs, environment variables, logs, and scaling.

## Database choice

### Local development

The starter uses SQLite by default:

```env
DATABASE_URL="file:./dev.db"
```

### GoDaddy MySQL

If using GoDaddy MySQL, change `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Then set:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DBNAME"
```

Run:

```bash
npx prisma db push
```

## cPanel Node.js deployment

1. Upload the project files.
2. Create a Node.js app in cPanel.
3. Set the startup command to `npm run start` or `node node_modules/next/dist/bin/next start -p $PORT`.
4. Add environment variables from `.env.example`.
5. Run:

```bash
npm install
npm run build
npx prisma db push
```

## Cron job

In cPanel Cron Jobs, run every 30 minutes:

```bash
curl -fsS "https://yourdomain.com/api/ingest/gsa?secret=YOUR_SECRET" >/dev/null 2>&1
```

## VPS deployment

Install Node 20+, clone/upload the project, then:

```bash
npm install
npm run build
npx prisma db push
npm run start
```

Use PM2:

```bash
npm install -g pm2
pm2 start "npm run start" --name gov-auction-feed
pm2 save
```

Cron on VPS:

```bash
*/30 * * * * curl -fsS "https://yourdomain.com/api/ingest/gsa?secret=YOUR_SECRET" >/dev/null 2>&1
```

## Production notes

- Get your own GSA API key from api.data.gov.
- Keep `INGEST_SECRET` private.
- Link users to the source auction page to bid.
- Do not scrape sources that prohibit scraping in their terms.
- Add caching/CDN once traffic grows.
