const JSON5 = require('json5')
const { readFile, writeFile } = require('fs').promises

;(async () =>
	await writeFile(
		'./dist/file-definitions.js',
		`(() => JSON.parse("${JSON.stringify(
			JSON5.parse(
				(
					await readFile('./packages/data/file_definitions.json')
				).toString('utf-8')
			)
		).replace(/\"/g, '\\"')}"))()`
	))()
