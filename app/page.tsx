import Link from 'next/link';

const auctionSites = [
  {
    name: 'GSA Auctions',
    description: 'Federal surplus vehicles, fleet cars, trucks, and equipment.',
    href: 'https://gsaauctions.gov',
  },
  {
    name: 'GovDeals',
    description: 'City, county, police, school, and local government surplus.',
    href: 'https://www.govdeals.com',
  },
  {
    name: 'GovPlanet',
    description: 'Government fleet trucks, heavy equipment, trailers, and utility vehicles.',
    href: 'https://www.govplanet.com',
  },
  {
    name: 'Public Surplus',
    description: 'Local agency, school district, and municipal auction listings.',
    href: 'https://www.publicsurplus.com',
  },
];

const categories = [
  {
    title: 'Police Vehicles',
    icon: '🚓',
    href: 'https://gsaauctions.gov/auctions/auctions-list/?q=police',
  },
  {
    title: 'Pickup Trucks',
    icon: '🛻',
    href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=pickup',
  },
  {
    title: 'SUVs',
    icon: '🚙',
    href: 'https://www.publicsurplus.com/sms/browse/search?keyword=suv',
  },
  {
    title: 'Seized Vehicles',
    icon: '🔑',
    href: 'https://www.usa.gov/car-auctions',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
              Police Interceptors · Government Vehicle Auction Hub
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Find government vehicle auctions without searching dozens of sites.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Police Interceptors helps buyers find official auction platforms for police cars,
              trucks, SUVs, fleet vehicles, and seized government surplus vehicles nationwide.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/search"
                className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-orange-500/20 hover:bg-orange-400"
              >
                Start Searching
              </Link>

              <Link
                href="/guides"
                className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:border-orange-400"
              >
                Learn Before You Bid
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-2xl">
            <h2 className="text-xl font-bold">Popular Auction Searches</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {categories.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-700 bg-slate-950 p-5 transition hover:border-orange-400 hover:bg-slate-900"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="mt-3 font-bold">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-400">Search official listings</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-slate-800 bg-slate-950/80">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 text-center sm:grid-cols-3">
          <div>
            <div className="text-2xl font-black text-orange-400">Nationwide</div>
            <p className="text-sm text-slate-400">Federal, state, and local sources</p>
          </div>
          <div>
            <div className="text-2xl font-black text-orange-400">Official Links</div>
            <p className="text-sm text-slate-400">Bid directly through auction platforms</p>
          </div>
          <div>
            <div className="text-2xl font-black text-orange-400">Buyer Tools</div>
            <p className="text-sm text-slate-400">Guides, inspectors, and shipping help</p>
          </div>
        </div>
      </section>

      {/* AUCTION SITES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-black sm:text-4xl">Top government auction sources</h2>
          <p className="mt-4 text-slate-300">
            Start with the major platforms where government agencies, municipalities,
            and surplus sellers list vehicles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {auctionSites.map((site) => (
            <a
              key={site.name}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl border border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">{site.name}</h3>
                  <p className="mt-3 text-slate-400">{site.description}</p>
                </div>
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-300">
                  Visit
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-black sm:text-4xl">How Police Interceptors works</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-[#07111f] p-6">
              <div className="text-3xl font-black text-orange-400">01</div>
              <h3 className="mt-4 text-xl font-bold">Choose a vehicle type</h3>
              <p className="mt-3 text-slate-400">
                Search police cars, trucks, SUVs, seized vehicles, and surplus fleet units.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#07111f] p-6">
              <div className="text-3xl font-black text-orange-400">02</div>
              <h3 className="mt-4 text-xl font-bold">Use official auction links</h3>
              <p className="mt-3 text-slate-400">
                We send you directly to real auction platforms where listings and bidding happen.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#07111f] p-6">
              <div className="text-3xl font-black text-orange-400">03</div>
              <h3 className="mt-4 text-xl font-bold">Buy smarter</h3>
              <p className="mt-3 text-slate-400">
                Use buyer guides, inspection resources, and shipping help before placing a bid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-10 shadow-2xl">
          <h2 className="text-3xl font-black sm:text-4xl">
            Stop hunting across scattered auction sites.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Use Police Interceptors as your shortcut hub for finding government surplus vehicles,
            learning the buying process, and connecting with inspection and shipping resources.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 hover:bg-orange-400"
            >
              Search Auctions
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-slate-600 px-6 py-3 font-bold hover:border-orange-400"
            >
              View Membership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
