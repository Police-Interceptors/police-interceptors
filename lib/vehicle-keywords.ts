export const VEHICLE_KEYWORDS = [
  'vehicle', 'auto', 'automobile', 'car', 'sedan', 'coupe', 'suv', 'van', 'minivan',
  'pickup', 'truck', 'tractor', 'trailer', 'bus', 'ambulance', 'fire truck', 'motorcycle',
  'ford', 'chevrolet', 'chevy', 'dodge', 'ram', 'gmc', 'toyota', 'honda', 'nissan', 'jeep',
  'freightliner', 'international', 'kenworth', 'mack', 'peterbilt'
];

export function looksLikeVehicle(text: string): boolean {
  const lower = text.toLowerCase();
  return VEHICLE_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export function extractYear(text: string): number | null {
  const match = text.match(/\b(19[8-9]\d|20[0-3]\d)\b/);
  return match ? Number(match[1]) : null;
}
