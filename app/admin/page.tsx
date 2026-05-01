export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/db';

export default async function AdminPage() {
  const [total, active, inactive, latest] = await Promise.all([
    prisma.auctionListing.count(),
    prisma.auctionListing.count({ where: { status: 'active' } }),
    prisma.auctionListing.count({ where: { status: 'inactive' } }),
    prisma.auctionListing.findFirst({ orderBy: { lastSeen: 'desc' } })
  ]);

  return (
    <div className="space-y-6">
      <a href="/" className="text-sm text-slate-400">← Home</a>
      <h1 className="text-4xl font-black">Admin status</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card p-6"><div className="text-3xl font-bold">{total}</div><div className="text-slate-400">Total</div></div>
        <div className="card p-6"><div className="text-3xl font-bold">{active}</div><div className="text-slate-400">Active</div></div>
        <div className="card p-6"><div className="text-3xl font-bold">{inactive}</div><div className="text-slate-400">Inactive</div></div>
        <div className="card p-6"><div className="text-sm font-bold">{latest?.lastSeen?.toLocaleString() || 'Never'}</div><div className="text-slate-400">Last seen</div></div>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-bold">Cron endpoint</h2>
        <code className="mt-3 block overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-300">/api/ingest/gsa?secret=YOUR_INGEST_SECRET</code>
      </div>
    </div>
  );
}
