# Adding More Auction Sources

Create one adapter per source. Each adapter should return the same normalized listing object shape used by `lib/normalize.ts`.

Suggested sequence:

1. GSA Auctions API — already included.
2. GovDeals — request partner/API access first; otherwise review terms before scraping.
3. GovPlanet — request partner/API access first; otherwise review terms before scraping.
4. State surplus portals — add one state at a time.
5. Treasury / U.S. Marshals contractors — add feeds/pages as permitted.

## Source adapter pattern

```ts
export async function fetchSourceListings(): Promise<Record<string, unknown>[]> {
  // fetch source data
}

export function normalizeSourceListing(record: Record<string, unknown>): NormalizedListing | null {
  // return normalized listing or null
}
```

## Deduplication

Start with `source + auction_id + lot_id`. Later, add fuzzy matching using:

- VIN
- title similarity
- image similarity
- city/state/closing time

