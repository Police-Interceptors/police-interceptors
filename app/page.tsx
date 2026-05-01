export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function Home() {
  let activeCount = 0;
let endingSoon = 0;
let states: any[] = [];

try {
  [activeCount, endingSoon, states] = await Promise.all([
    prisma.auctionListing.count({ where: { status: 'active' } }),
    prisma.auctionListing.count({
      where: {
        status: 'active',
        closingTime: { gte: new Date(), lte: new Date(Date.now() + 1000 * 60 * 60 * 48) }
      }
    }),
    prisma.auctionListing.findMany({
      where: { status: 'active', state: { not: null } },
      distinct: ['state'],
      select: { state: true },
      take: 10
    })
  ]);
} catch (e) {
  console.log('DB skipped during build');
}
    prisma.auctionListing.count({ where: { status: 'active', closingTime: { gte: new Date(), lte: new Date(Date.now() + 1000 * 60 * 60 * 48) } } }),
    prisma.auctionListing.findMany({ where: { status: 'active', state: { not: null } }, distinct: ['state'], select: { state: true }, take: 20 })
  ]);

  return (
    <div className="space-y-10">
      <section className="card p-8 sm:p-12">
        <div className="mb-4 inline-flex badge">Live government auction aggregator</div>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
          Nationwide government vehicle auctions in one searchable feed.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          This starter indexes official GSA Auctions data, normalizes listings, and links buyers back to the original auction source to bid.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="button" href="/listings">Browse listings</Link>
          <Link className="rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-100 hover:border-blue-400" href="/admin">Admin status</Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card p-6"><div className="text-3xl font-bold">{activeCount}</div><div className="text-slate-400">Active indexed listings</div></div>
        <div className="card p-6"><div className="text-3xl font-bold">{endingSoon}</div><div className="text-slate-400">Ending in 48 hours</div></div>
        <div className="card p-6"><div className="text-3xl font-bold">{states.length}</div><div className="text-slate-400">States currently represented</div></div>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold">Next sources to add</h2>
        <p className="mt-3 text-slate-300">GovDeals, GovPlanet, Public Surplus, and state surplus portals can be added as source adapters.</p>
      </section>
    </div>
  );
}
