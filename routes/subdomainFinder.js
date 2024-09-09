const express = require('express')
const { exec } = require('child_process')

const router = express.Router()

router.get('/subdomains/:domain', async (req, res) => {
	const { domain } = req.params

	exec(`assetfinder ${domain}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`)
			return res.status(500).json({ error: 'Assetfinder process error' })
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`)
			return res.status(500).json({ error: 'Assetfinder error' })
		}

		const subdomains = stdout.split('\n').filter(Boolean)
		res.json({ subdomains })
	})
})

module.exports = router
