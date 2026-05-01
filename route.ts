import { NextResponse } from 'next/server';
import { ingestGsaAuctions } from '@/lib/gsa';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (!process.env.INGEST_SECRET || secret !== process.env.INGEST_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startedAt = new Date();
  const result = await ingestGsaAuctions();
  return NextResponse.json({ startedAt, finishedAt: new Date(), result });
}
