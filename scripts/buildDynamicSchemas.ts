import JSON5 from 'https://cdn.skypack.dev/json5'
import { join, basename } from 'https://deno.land/std/path/mod.ts'

export async function buildDynamicSchemas() {
	const fileDefs = JSON5.parse(
		await Deno.readTextFile('./packages/data/fileDefinitions.json'),
		null
	)

	for (const { lightningCache, id } of fileDefs) {
		if (!lightningCache) continue

		const json = JSON5.parse(
			await Deno.readTextFile(
				join('./packages/lightningCache', lightningCache)
			),
			null
		)

		try {
			await Deno.remove(join('./packages/schema/dynamic', id), {
				recursive: true,
			})
		} catch {}
		await Deno.mkdir(join('./packages/schema/dynamic', id), {
			recursive: true,
		})
		for (const cacheDef of json) {
			const key = Object.keys(cacheDef).find(
				(key) => !key.startsWith('@')
			)
			if (!key) continue

			await Deno.writeTextFile(
				join('./packages/schema/dynamic', id, `${key}Enum.json`),
				JSON.stringify({
					$schema: 'http://json-schema.org/draft-07/schema',
					type: 'string',
					enum: [],
				})
			)
			await Deno.writeTextFile(
				join('./packages/schema/dynamic', id, `${key}Property.json`),
				JSON.stringify({
					$schema: 'http://json-schema.org/draft-07/schema',
					type: 'object',
					properties: {},
				})
			)
		}
	}
}
