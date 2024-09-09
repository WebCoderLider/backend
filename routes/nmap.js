const express = require('express')
const { exec } = require('child_process')
const dns = require('dns')

const router = express.Router()

// Nmap route using domain to IP lookup
router.get('/nmap/:domain', (req, res) => {
	const { domain } = req.params

	// Domenni IP manzilga aylantirish
	dns.lookup(domain, (err, address) => {
		if (err) {
			console.error(`DNS lookup error: ${err}`)
			return res.status(500).json({ error: 'DNS lookup failed' })
		}

		console.log(`Domain ${domain} resolved to IP: ${address}`)

		// IP manzil uchun faqat ochiq portlar bo'yicha nmap buyrug'i
		exec(`nmap -p- --open --max-retries 1 --min-rate 5000 ${address}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`Exec error: ${error}`)
				return res.status(500).json({ error: 'Nmap process error' })
			}
			if (stderr) {
				console.error(`Stderr: ${stderr}`)
				return res.status(500).json({ error: 'Nmap error' })
			}

			// Ochiq portlar bo'yicha natijalarni qaytarish
			const lines = stdout.split('\n')
			const filteredLines = lines.filter(line => !line.includes('unknown'))
			const filteredOutput = filteredLines.join('\n')

			res.send(`<pre>${filteredOutput}</pre>`)
		})
	})
})

module.exports = router
