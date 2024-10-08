const express = require('express')
const assetfinder = require('./routes/subdomainFinder')
const wpscan = require('./routes/wpscan')
const app = express()
const port = 3000


app.use('/', assetfinder)
app.use('/', wpscan)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
