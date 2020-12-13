import { build } from './build.ts'

export async function watch() {
	const watcher = Deno.watchFs('./packages')
	await build()
	let isBuilding = false

	for await (const event of watcher) {
		if (!isBuilding) {
			isBuilding = true
			console.log(
				`Rebuilding packages - ${event.kind.toUpperCase()}: ${
					event.paths[0].split('./packages\\')[1]
				}`
			)
			await build()
			setTimeout(() => (isBuilding = false), 500)
		}
	}
}

if (import.meta.main) {
	await watch()
}
