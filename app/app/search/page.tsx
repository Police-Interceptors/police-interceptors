const searchCategories = [
  {
    title: 'Police Vehicles',
    description: 'Search police interceptors, patrol cars, retired cruisers, and law enforcement SUVs.',
    links: [
      { label: 'GSA police vehicles', href: 'https://gsaauctions.gov/auctions/auctions-list/?q=police' },
      { label: 'GovDeals police vehicles', href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=police' },
      { label: 'Public Surplus police vehicles', href: 'https://www.publicsurplus.com/sms/browse/search?keyword=police' },
    ],
  },
  {
    title: 'Pickup Trucks',
    description: 'Find government-owned work trucks, fleet pickups, utility trucks, and surplus 4x4s.',
    links: [
      { label: 'GovDeals pickup trucks', href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=pickup' },
      { label: 'GSA trucks', href: 'https://gsaauctions.gov/auctions/auctions-list/?q=truck' },
      { label: 'Public Surplus trucks', href: 'https://www.publicsurplus.com/sms/browse/search?keyword=truck' },
    ],
  },
  {
    title: 'SUVs',
    description: 'Search surplus SUVs from police departments, agencies, schools, and fleet operators.',
    links: [
      { label: 'GSA SUVs', href: 'https://gsaauctions.gov/auctions/auctions-list/?q=suv' },
      { label: 'GovDeals SUVs', href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=suv' },
      { label: 'Public Surplus SUVs', href: 'https://www.publicsurplus.com/sms/browse/search?keyword=suv' },
    ],
  },
  {
    title: 'Seized Vehicles',
    description: 'Search federal seized vehicle sources, forfeiture sales, and official government auction hubs.',
    links: [
      { label: 'USA.gov vehicle auction guide', href: 'https://www.usa.gov/car-auctions' },
      { label: 'U.S. Marshals auctions', href: 'https://www.usmarshals.gov/what-we-do/asset-forfeiture/sales' },
      { label: 'Treasury auctions', href: 'https://home.treasury.gov/services/treasury-auctions' },
    ],
  },
  {
    title: 'Heavy Equipment & Utility Vehicles',
    description: 'Search dump trucks, service trucks, trailers, buses, and heavy fleet equipment.',
    links: [
      { label: 'GovPlanet government surplus', href: 'https://www.govplanet.com/Government+Surplus' },
      { label: 'GovDeals heavy equipment', href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=equipment' },
      { label: 'Public Surplus equipment', href: 'https://www.publicsurplus.com/sms/browse/search?keyword=equipment' },
    ],
  },
  {
    title: 'Cheap Auction Vehicles',
    description: 'Start broad searches for low-cost surplus cars, trucks, SUVs, and fleet vehicles.',
    links: [
      { label: 'GovDeals cars', href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=car' },
      { label: 'GSA cars', href: 'https://gsaauctions.gov/auctions/auctions-list/?q=car' },
      { label: 'Public Surplus cars', href: 'https://www.publicsurplus.com/sms/browse/search?keyword=car' },
    ],
  },
];

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 max-w-4xl">
          <div className="mb-5 inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
            Auction Search Shortcuts
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Search government vehicle auctions faster.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Use these shortcut links to jump directly into official auction searches for police
            vehicles, trucks, SUVs, seized vehicles, fleet vehicles, and surplus equipment.
          </p>
        </div>

        <div className="grid gap-6">
          {searchCategories.map((category) => (
            <section
              key={category.title}
              className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-start">
                <div>
                  <h2 className="text-2xl font-black">{category.title}</h2>
                  <p className="mt-3 text-slate-400">{category.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {category.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-slate-700 bg-slate-950 p-4 font-bold text-slate-100 transition hover:-translate-y-1 hover:border-orange-400 hover:text-orange-300"
                    >
                      {link.label}
                      <div className="mt-2 text-sm font-normal text-slate-500">
                        Opens official site
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center">
          <h2 className="text-3xl font-black">Want this organized by state next?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            The next upgrade is a state-by-state surplus auction directory with direct links to
            official state surplus, city, county, and police auction pages.
          </p>
        </section>
      </section>
    </main>
  );
}
