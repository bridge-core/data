const { readdir, readFile, writeFile } = require('fs').promises
const JSON5 = require('json5')
const { join, basename } = require('path')
const autoCompletions = {}

async function loadDir(dirPath, saveObj = autoCompletions) {
	const dirents = await readdir(dirPath, { withFileTypes: true })

	await Promise.all(
		dirents.map(async (dirent) => {
			if (dirent.isDirectory()) {
				if (saveObj[dirent.name] === undefined)
					saveObj[dirent.name] = {}
				return await loadDir(
					join(dirPath, dirent.name),
					saveObj[dirent.name]
				)
			} else {
				// console.log(
				// 	await (
				// 		await readFile(join(dirPath, dirent.name))
				// 	).toString()
				// )
				saveObj[basename(dirent.name, '.json')] = JSON5.parse(
					await (await readFile(join(dirPath, dirent.name))).toString(
						'utf-8'
					)
				)
			}
		})
	)
}
loadDir('./packages/auto_completions').then(async () => {
	await writeFile(
		'./dist/auto-completions.js',
		`const BridgeAutoCompletions = JSON.parse("${JSON.stringify(
			autoCompletions
		)
			.replace(/\\\"/g, '\\\\"')
			.replace(/\"/g, '\\"')}")`
	)
})
