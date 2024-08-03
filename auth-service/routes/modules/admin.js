const express = require('express');
const { Account } = require('../../models');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Admin routes
router.get('/account', async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/account/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(account);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// TODO: Update account
router.delete('/account/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.destroy();

        await axios.delete(`http://localhost:8080/api/user/${id}`);

        res.json({ message: 'Account deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;