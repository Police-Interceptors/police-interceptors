import Link from 'next/link';

const categories = [
  {
    title: 'Police Vehicles',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=900&q=80',
    href: 'https://gsaauctions.gov/auctions/auctions-list/?q=police',
  },
  {
    title: 'Pickup Trucks',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=truck',
  },
  {
    title: 'SUVs',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    href: 'https://www.publicsurplus.com/sms/browse/search?keyword=suv',
  },
];

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>
            <div className="mb-6 inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
              Police Interceptors · Government Vehicle Auction Hub
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Find government vehicle auctions fast
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
                className="rounded
