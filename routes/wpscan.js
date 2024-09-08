const express = require('express')
const { exec } = require('child_process')

const router = express.Router()

// Dirbuster route using dirb command
router.get('/dirb/:domain', (req, res) => {
	const { domain } = req.params
	const url = domain.startsWith('http') ? domain : `https://${domain}/`
})

module.exports = router
