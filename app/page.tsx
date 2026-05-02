export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12 p-6 max-w-6xl mx-auto">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          Find Government Vehicle Auctions Nationwide
        </h1>
        <p className="text-lg text-gray-400">
          Search police cars, trucks, SUVs, and seized vehicles across all major auction platforms — in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="/search" className="bg-blue-600 px-6 py-3 rounded-lg font-semibold">
            Start Searching
          </a>
          <a href="/guides" className="border px-6 py-3 rounded-lg">
            Learn How It Works
          </a>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Search Popular Categories</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://gsaauctions.gov/auctions/auctions-list/?q=police" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            🚓 Police Vehicles
          </a>
          <a href="https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=truck" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            🚚 Trucks
          </a>
          <a href="https://www.publicsurplus.com/sms/browse/search?keyword=suv" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            🚙 SUVs
          </a>
        </div>
      </section>

      {/* AUCTION SITES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Top Government Auction Sites</h2>

        <div className="grid md:grid-cols-2 gap-4">

          <a href="https://gsaauctions.gov" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            <h3 className="font-semibold">GSA Auctions</h3>
            <p className="text-gray-400 text-sm">Federal government vehicles and surplus</p>
          </a>

          <a href="https://www.govdeals.com" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            <h3 className="font-semibold">GovDeals</h3>
            <p className="text-gray-400 text-sm">City and county surplus vehicles</p>
          </a>

          <a href="https://www.govplanet.com" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            <h3 className="font-semibold">GovPlanet</h3>
            <p className="text-gray-400 text-sm">Heavy equipment and fleet vehicles</p>
          </a>

          <a href="https://www.publicsurplus.com" target="_blank" className="p-4 border rounded-lg hover:bg-gray-800">
            <h3 className="font-semibold">Public Surplus</h3>
            <p className="text-gray-400 text-sm">School districts and local agencies</p>
          </a>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-4 text-sm">

          <div className="p-4 border rounded-lg">
            1. Choose a category or auction site
          </div>

          <div className="p-4 border rounded-lg">
            2. Browse real listings on official platforms
          </div>

          <div className="p-4 border rounded-lg">
            3. Bid directly through the auction site
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          Want Better Deals & Shortcuts?
        </h2>

        <p className="text-gray-400">
          Get curated search links, inspection contacts, and insider buying strategies.
        </p>

        <a href="/pricing" className="bg-green-600 px-6 py-3 rounded-lg font-semibold">
          Unlock Full Access
        </a>
      </section>

    </div>
  );
}
