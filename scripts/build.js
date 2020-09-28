const { mkdir } = require('fs').promises

;(async () => {
	try {
		await mkdir('./dist')
	} catch {}

	require('./bundleAutoCompletions.js')
})()
