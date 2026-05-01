import { prisma } from '@/lib/db';

type Props = { searchParams: Record<string, string | string[] | undefined> };

function param(searchParams: Props['searchParams'], key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function ListingsPage({ searchParams }: Props) {
  const q = param(searchParams, 'q')?.trim();
  const state = param(searchParams, 'state')?.trim().toUpperCase();
  const endingSoon = param(searchParams, 'endingSoon') === '1';
  const now = new Date();

  const listings = await prisma.auctionListing.findMany({
    where: {
      status: 'active',
      state: state || undefined,
      closingTime: endingSoon ? { gte: now, lte: new Date(Date.now() + 1000 * 60 * 60 * 48) } : undefined,
      OR: q ? [{ title: { contains: q } }, { description: { contains: q } }, { city: { contains: q } }] : undefined
    },
    orderBy: [{ closingTime: 'asc' }, { updatedAt: 'desc' }],
    take: 100
  });

  return (
    <div className="space-y-6">
      <div>
        <a href="/" className="text-sm text-slate-400">← Home</a>
        <h1 className="mt-2 text-4xl font-black">Live listings</h1>
      </div>

      <form className="card grid gap-3 p-4 md:grid-cols-[1fr_120px_150px_120px]" action="/listings">
        <input className="input" name="q" placeholder="Search Ford, truck, ambulance..." defaultValue={q} />
        <input className="input" name="state" placeholder="State" defaultValue={state} maxLength={2} />
        <label className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 text-slate-300">
          <input type="checkbox" name="endingSoon" value="1" defaultChecked={endingSoon} /> Ending soon
        </label>
        <button className="button">Search</button>
      </form>

      <div className="grid gap-4">
        {listings.map((listing) => (
          <article key={listing.id} className="card overflow-hidden p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              {listing.imageUrl ? <img src={listing.imageUrl} alt="" className="h-32 w-full rounded-xl object-cover sm:w-48" /> : <div className="h-32 w-full rounded-xl bg-slate-800 sm:w-48" />}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="badge">{listing.source}</span>
                  {listing.state ? <span className="badge">{listing.state}</span> : null}
                  {listing.currentBid !== null ? <span className="badge">Bid ${listing.currentBid.toLocaleString()}</span> : null}
                </div>
                <h2 className="mt-3 text-xl font-bold">{listing.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{[listing.city, listing.state, listing.zip].filter(Boolean).join(', ') || 'Location not listed'}</p>
                <p className="mt-2 text-sm text-slate-300">Closes: {listing.closingTime ? listing.closingTime.toLocaleString() : 'Not listed'}</p>
                <a className="mt-4 inline-flex button" href={listing.sourceUrl} target="_blank" rel="noreferrer">View auction source</a>
              </div>
            </div>
          </article>
        ))}
        {listings.length === 0 ? <div className="card p-8 text-slate-300">No listings found. Run the GSA ingestion job or adjust filters.</div> : null}
      </div>
    </div>
  );
}
