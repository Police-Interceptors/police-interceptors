import { prisma } from './db';
import { normalizeGsaAuction } from './normalize';

const GSA_URL = 'https://api.gsa.gov/assets/gsaauctions/v2/auctions';

export async function fetchGsaAuctions() {
  const apiKey = process.env.GSA_API_KEY || 'DEMO_KEY';
  const url = `${GSA_URL}?api_key=${encodeURIComponent(apiKey)}&format=JSON`;

  const res = await fetch(url, {
    headers: { accept: 'application/json' },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`GSA API failed: ${res.status}`);
  }

  const payload = await res.json();

  // 🔥 DEBUG: see what API actually returns
  console.log("GSA RAW:", payload);

  // ✅ CORRECT handling of response
  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  // handle empty / error response
  if (payload?.error) {
    console.log("GSA ERROR:", payload.error);
    return [];
  }

  return [];
}

export async function ingestGsaAuctions() {
  const records = await fetchGsaAuctions();

  let inserted = 0;

  for (const record of records) {
    console.log("RECORD:", record);

    const normalized = normalizeGsaAuction(record);

    console.log("NORMALIZED:", normalized);

    if (!normalized) continue;

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
        sourceLotId: normalized.sourceLotId ?? '',
        rawData: JSON.stringify(normalized.rawData || {})
      },
      update: {
        ...normalized,
        sourceLotId: normalized.sourceLotId ?? '',
        rawData: JSON.stringify(normalized.rawData || {}),
        lastSeen: new Date(),
        status: normalized.status
      }
    });

    inserted++;
  }

  return { success: true, count: inserted };
}
