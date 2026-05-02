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
          closingTime: {
            gte: new Date(),
            lte: new Date(Date.now() + 1000 * 60 * 60 * 48)
          }
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

  return (
    <div className="space-y-10">
      {/* rest of your UI stays the same */}
    </div>
  );
}
