import './bundleAutoCompletions.ts'
import './bundleFileDefs.ts'

try {
	await Deno.mkdir('./dist')
} catch {}
