const express = require('express');
const router = express.Router();
const client = require('./redisClient');

router.post('/images/:releaseId', async (req, res) => {
    if (!client.isOpen) {
        return res.status(500).json({ error: 'Redis client is not connected' });
    }
    const releaseId = req.params.releaseId;
    const { base64 } = req.body;
    try {
        await client.set(releaseId, base64);
        return res.status(200).json({ message: 'Image cached successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to cache image' });
    }
});

router.get('/images/:releaseId', async (req, res) => {
    if (!client.isOpen) {
        return res.status(500).json({ error: 'Redis client is not connected' });
    }
    const releaseId = req.params.releaseId;
    try {
        const base64Image = await client.get(releaseId);
        if (base64Image) {
            return res.status(200).json(base64Image);
        } else {
            return res.status(404).json({ error: 'Image not found in cache' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Failed to retrieve image from cache' });
    }
});

module.exports = router;
