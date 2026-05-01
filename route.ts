import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim();
  const state = url.searchParams.get('state')?.trim().toUpperCase();
  const source = url.searchParams.get('source')?.trim();
  const status = url.searchParams.get('status')?.trim() || 'active';
  const endingSoon = url.searchParams.get('endingSoon') === '1';
  const take = Math.min(Number(url.searchParams.get('take') || 50), 100);

  const now = new Date();
  const soon = new Date(Date.now() + 1000 * 60 * 60 * 48);

  const listings = await prisma.auctionListing.findMany({
    where: {
      status: status === 'all' ? undefined : status,
      state: state || undefined,
      source: source || undefined,
      closingTime: endingSoon ? { gte: now, lte: soon } : undefined,
      OR: q
        ? [
            { title: { contains: q } },
            { description: { contains: q } },
            { city: { contains: q } },
            { make: { contains: q } },
            { model: { contains: q } }
          ]
        : undefined
    },
    orderBy: [{ closingTime: 'asc' }, { updatedAt: 'desc' }],
    take
  });

  return NextResponse.json({ count: listings.length, listings });
}
