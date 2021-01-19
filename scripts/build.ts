import { buildDynamicSchemas } from './buildDynamicSchemas.ts'

try {
	await Deno.mkdir('./dist')
} catch {}

await import('./bundleAutoCompletions.ts')
await import('./bundleFileDefs.ts')

await buildDynamicSchemas()
