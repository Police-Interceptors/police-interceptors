import { looksLikeVehicle, extractYear } from './vehicle-keywords';

export type NormalizedListing = {
  source: string;
  sourceAuctionId: string;
  sourceLotId?: string | null;
  title: string;
  description?: string | null;
  category?: string | null;
  year?: number | null;
  make?: string | null;
  model?: string | null;
  vin?: string | null;
  currentBid?: number | null;
  bidCount?: number | null;
  reservePrice?: number | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  closingTime?: Date | null;
  startTime?: Date | null;
  status: string;
  sourceUrl: string;
  imageUrl?: string | null;
  rawData: unknown;
};

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(String(value).replace(/[$,]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function parseDate(value: unknown): Date | null {
  if (!value) return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

function value(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) if (record[key] !== undefined && record[key] !== null) return record[key];
  return undefined;
}

export function normalizeGsaAuction(record: Record<string, unknown>): NormalizedListing | null {
  const saleNo = String(value(record, ['SaleNo', 'saleNo', 'sale_no']) ?? '').trim();
  const lotNo = String(value(record, ['LotNo', 'lotNo', 'lot_no']) ?? '').trim();
  const itemName = String(value(record, ['ItemName', 'itemName', 'item_name']) ?? '').trim();
  const lotDescription = String(value(record, ['LotDescript', 'lotDescription', 'LotDescription']) ?? '').trim();
  const combinedText = `${itemName} ${lotDescription}`.trim();

  if (!saleNo || !combinedText || !looksLikeVehicle(combinedText)) return null;

  const itemUrl = String(value(record, ['ItemDescURL', 'itemDescURL', 'item_desc_url']) ?? '').trim();
  const fallbackUrl = `https://www.gsaauctions.gov/auctions/preview/${encodeURIComponent(saleNo)}`;

  return {
    source: 'GSA Auctions',
    sourceAuctionId: saleNo,
    sourceLotId: lotNo || null,
    title: itemName || lotDescription || `GSA Auction ${saleNo}`,
    description: lotDescription || null,
    category: 'Vehicle',
    year: extractYear(combinedText),
    make: null,
    model: null,
    vin: null,
    currentBid: toNumber(value(record, ['HighBidAmount', 'highBidAmount'])),
    bidCount: toNumber(value(record, ['BiddersCount', 'biddersCount'])) ?? null,
    reservePrice: toNumber(value(record, ['Reserve', 'reserve'])),
    city: String(value(record, ['PropertyCity', 'propertyCity']) ?? value(record, ['LocationCity']) ?? '').trim() || null,
    state: String(value(record, ['PropertyState', 'propertyState']) ?? value(record, ['LocationST']) ?? '').trim() || null,
    zip: String(value(record, ['PropertyZip', 'propertyZip']) ?? value(record, ['LocationZip']) ?? '').trim() || null,
    closingTime: parseDate(value(record, ['AucEndDt', 'aucEndDt'])),
    startTime: parseDate(value(record, ['AucStartDt', 'aucStartDt'])),
    status: String(value(record, ['AuctionStatus', 'auctionStatus']) ?? 'active').trim() || 'active',
    sourceUrl: itemUrl || fallbackUrl,
    imageUrl: String(value(record, ['ImageURL', 'imageURL']) ?? '').trim() || null,
    rawData: record
  };
}
