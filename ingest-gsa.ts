import 'dotenv/config';
import { ingestGsaAuctions } from '../lib/gsa';

async function main() {
  const result = await ingestGsaAuctions();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
