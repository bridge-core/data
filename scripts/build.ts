try {
	await Deno.mkdir('./dist')
} catch {}

await import('./bundleAutoCompletions.ts')
await import('./bundleFileDefs.ts')
