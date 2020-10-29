try {
	await Deno.mkdir('./dist')
} catch {}

import('./bundleAutoCompletions.ts')
import('./bundleFileDefs.ts')
