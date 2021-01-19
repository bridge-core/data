import JSON5 from 'https://cdn.skypack.dev/json5'
import { join, basename } from 'https://deno.land/std/path/mod.ts'

const autoCompletions: any = {}

async function loadDir(
	dirPath: string,
	saveObj = autoCompletions
): Promise<void> {
	const dirents = Deno.readDir(dirPath)

	for await (const dirent of dirents) {
		if (dirent.isDirectory) {
			if (saveObj[dirent.name] === undefined) saveObj[dirent.name] = {}
			await loadDir(join(dirPath, dirent.name), saveObj[dirent.name])
		} else {
			saveObj[basename(dirent.name, '.json')] = JSON5.parse(
				await Deno.readTextFile(join(dirPath, dirent.name)),
				null
			)
		}
	}
}
loadDir('./packages/auto_completions').then(async () => {
	await Promise.all([
		Deno.writeTextFile(
			'./dist/auto-completions.js',
			`(() => JSON.parse("${JSON.stringify(autoCompletions)
				.replace(/\\\"/g, '\\\\"')
				.replace(/\"/g, '\\"')}"))()`
		),
		Deno.writeTextFile(
			'./dist/auto-completions.json',
			JSON.stringify(autoCompletions)
		),
	])
})
