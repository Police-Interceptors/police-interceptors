import Link from 'next/link';

const categories = [
  {
    title: 'Police Vehicles',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc',
    href: 'https://gsaauctions.gov/auctions/auctions-list/?q=police',
  },
  {
    title: 'Pickup Trucks',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    href: 'https://www.govdeals.com/index.cfm?fa=Main.AdvSearchResults&kWord=truck',
  },
  {
    title: 'SUVs',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
    href: 'https://www.publicsurplus.com/sms/browse/search?keyword=suv',
  },
];

const auctionSites = [
  {
    name: 'GSA Auctions',
    description: 'Federal surplus vehicles and fleet inventory.',
    href: 'https://gsaauctions.gov',
  },
  {
    name: 'GovDeals',
    description: 'City, county, and police surplus vehicles.',
    href: 'https://www.govdeals.com',
  },
  {
    name: 'GovPlanet',
    description: 'Heavy equipment and fleet vehicles.',
    href: 'https://www.govplanet.com',
  },
  {
    name: 'Public Surplus',
    description: 'School
