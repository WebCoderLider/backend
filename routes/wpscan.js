const express = require('express');
const crypto = require('crypto');
const base64 = require('base-64');
const utf8 = require('utf8');

const router = express.Router();

/**
 * Encode a string to Base64.
 * @param {string} text - The string to encode.
 * @returns {string} - The Base64 encoded string.
 */
function encodeBase64(text) {
    return base64.encode(text);
}

/**
 * Decode a Base64 encoded string.
 * @param {string} encoded - The Base64 encoded string.
 * @returns {string} - The decoded string.
 */
function decodeBase64(encoded) {
    return base64.decode(encoded);
}

/**
 * Encode a string to UTF-8.
 * @param {string} text - The string to encode.
 * @returns {Uint8Array} - The UTF-8 encoded bytes.
 */
function encodeUtf8(text) {
    return utf8.encode(text);
}

/**
 * Decode UTF-8 bytes to a string.
 * @param {Uint8Array} bytes - The UTF-8 encoded bytes.
 * @returns {string} - The decoded string.
 */
function decodeUtf8(bytes) {
    return utf8.decode(bytes);
}

/**
 * Hash a string with SHA-256.
 * @param {string} text - The string to hash.
 * @returns {string} - The SHA-256 hash of the string.
 */
function hashSha256(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Hash a string with SHA-512.
 * @param {string} text - The string to hash.
 * @returns {string} - The SHA-512 hash of the string.
 */
function hashSha512(text) {
    return crypto.createHash('sha512').update(text).digest('hex');
}

// Route to verify and decode a hash based on its type
router.get('/crypto/:type/:hash', (req, res) => {
    const { type, hash } = req.params;

    if (!type || !hash) {
        return res.status(400).json({ error: 'Type and hash are required' });
    }

    try {
        let decodedText;
        let match = false;

        switch (type) {
            case 'base64':
                try {
                    decodedText = decodeBase64(hash);
                    // Validate the Base64 decoded text
                    if (hash === encodeBase64(decodedText)) {
                        match = true;
                    }
                } catch (e) {
                    // Handle Base64 decoding errors
                }
                break;

            case 'sha256':
                const sha256Hash = hashSha256(decodedText || '');
                if (hash === sha256Hash) {
                    decodedText = decodedText || '';
                    match = true;
                }
                break;

            case 'sha512':
                const sha512Hash = hashSha512(decodedText || '');
                if (hash === sha512Hash) {
                    decodedText = decodedText || '';
                    match = true;
                }
                break;

            default:
                return res.status(400).json({ error: 'Invalid type specified' });
        }

        if (!match) {
            return res.status(400).json({ error: 'Hash does not match the specified type' });
        }

        res.json({
            hash,
            decodedText: decodedText || 'Hash matches the original text',
            match,
            type
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
