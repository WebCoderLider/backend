const express = require('express');
const dns = require('dns');
const whoisJson = require('whois-json');
const util = require('util');

const router = express.Router();

// Promisify dns.lookup for easier async/await handling
const dnsLookup = util.promisify(dns.lookup);

// Route to get OSINT data for a domain
router.get('/osint/:domain', async (req, res) => {
  const { domain } = req.params;
  
  try {
    // Perform DNS lookup
    const dnsResult = await dnsLookup(domain);
    
    // Perform WHOIS query
    const whoisResult = await whoisJson(domain);
    
    // Respond with combined DNS and WHOIS data
    res.json({
      domain,
      dns: dnsResult,
      whois: whoisResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
