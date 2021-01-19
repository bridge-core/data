import JSON5 from 'https://cdn.skypack.dev/json5'

await Promise.all([
	Deno.writeTextFile(
		'./dist/file-definitions.js',
		`(() => JSON.parse("${JSON.stringify(
			JSON5.parse(
				await Deno.readTextFile('./packages/data/fileDefinitions.json'),
				null
			)
		).replace(/\"/g, '\\"')}"))()`
	),
	Deno.copyFile(
		'./packages/data/fileDefinitions.json',
		'./dist/file-definitions.json'
	),
])
