import { prisma } from './db';
import { normalizeGsaAuction } from './normalize';

const GSA_URL = 'https://api.gsa.gov/assets/gsaauctions/v2/auctions';

type IngestResult = {
  source: string;
  fetched: number;
  vehicleCandidates: number;
  upserted: number;
  expiredMarked: number;
};

function unwrapRecords(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload.filter(Boolean) as Record<string, unknown>[];
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    for (const key of ['Results', 'results', 'auctions', 'items', 'data']) {
      if (Array.isArray(obj[key])) return obj[key] as Record<string, unknown>[];
    }
  }
  return [];
}

export async function fetchGsaAuctions(): Promise<Record<string, unknown>[]> {
  const apiKey = process.env.GSA_API_KEY || 'DEMO_KEY';
  const url = `${GSA_URL}?api_key=${encodeURIComponent(apiKey)}&format=JSON`;
  const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error(`GSA API failed: ${res.status} ${res.statusText}`);
  const payload = await res.json();
  const records = unwrapRecords(payload);
  const noRecords = records.length === 1 && String(records[0]?.error || '').toUpperCase().includes('NO RECORDS');
  return noRecords ? [] : records;
}

export async function ingestGsaAuctions(): Promise<IngestResult> {
  const records = await fetchGsaAuctions();
  const seenKeys: Array<{ source: string; sourceAuctionId: string; sourceLotId: string | null }> = [];
  let vehicleCandidates = 0;
  let upserted = 0;

  for (const record of records) {
    const normalized = normalizeGsaAuction(record);
    if (!normalized) continue;
    vehicleCandidates++;
    seenKeys.push({ source: normalized.source, sourceAuctionId: normalized.sourceAuctionId, sourceLotId: normalized.sourceLotId ?? null });

    await prisma.auctionListing.upsert({
      where: {
        source_sourceAuctionId_sourceLotId: {
          source: normalized.source,
          sourceAuctionId: normalized.sourceAuctionId,
          sourceLotId: normalized.sourceLotId ?? ''
        }
      },
      create: {
  ...normalized,
  rawData: normalized.rawData ? JSON.stringify(normalized.rawData) : null,
  sourceLotId: normalized.sourceLotId ?? ''
},
update: {
  ...normalized,
  rawData: normalized.rawData ? JSON.stringify(normalized.rawData) : null,
  sourceLotId: normalized.sourceLotId ?? '',
  lastSeen: new Date(),
  status: normalized.status
}
    });
    upserted++;
  }

  // Conservative expiry: mark old GSA vehicle listings inactive if not seen in 2 ingestion cycles.
  const cutoff = new Date(Date.now() - 1000 * 60 * 90);
  const expired = await prisma.auctionListing.updateMany({
    where: { source: 'GSA Auctions', lastSeen: { lt: cutoff }, status: { not: 'inactive' } },
    data: { status: 'inactive' }
  });

  return { source: 'GSA Auctions', fetched: records.length, vehicleCandidates, upserted, expiredMarked: expired.count };
}
