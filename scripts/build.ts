import { bundleFileDefs } from './bundleFileDefs.ts'
import { bundleAutoCompletions } from './bundleAutoCompletions.ts'

export async function build() {
	try {
		await Deno.mkdir('./dist')
	} catch {}

	await bundleFileDefs()
	await bundleAutoCompletions()
}

if (import.meta.main) {
	await build()
}
