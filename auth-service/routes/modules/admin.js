const config = require('../../config/config');
const express = require('express');
const { validationResult } = require('express-validator');
const { sequelize } = require('../../models');
const { Account } = require('../../models');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { verifyTokenAdmin } = require('../../../common-utils/modules/accessToken');
const { updateAccountValidationRules,
        updatePasswordValidationRules
} = require('./validator/validationRules');
require('dotenv').config();

const router = express.Router();

axios.defaults.baseURL = config.apiGateway.url;

router.get('/account', verifyTokenAdmin(), async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/account/:id', verifyTokenAdmin(), async (req, res) => {
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

router.put('/account/status/:id', verifyTokenAdmin(), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const account = await Account.findByPk(id, { transaction });
        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Account not found' });
        }

        if (account.role === 'Artist') {
            const apiServicePayload = {
                name: account.username,
                establishmentYear: new Date().getFullYear(),
                description: ' ',
                userId: account.id,
                countryId: account.countryId
            }

            axios.defaults.headers.common['Authorization'] = req.headers['authorization'];
            await axios.post(`/api/artist/`, apiServicePayload)
                .catch(async () => {
                    await transaction.rollback();
                    throw new Error('Failed to add artist in api-service');
                });
        }

        account.accountStatus = status;
        await account.save({ transaction });

        await transaction.commit();
        res.json({ message: 'Account status updated successfully' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/account/:id', verifyTokenAdmin(), updateAccountValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');
        return res.status(400).json({ error: errorMessages });
    }

    const { id } = req.params;
    const { username, firstname, lastname, email, role, countryId, accountStatus } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const account = await Account.findByPk(id, { transaction });
        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Account not found' });
        }

        const usernameConflict = await Account.findOne({ where: { username, id: { [Op.ne]: id } }, transaction });
        if (usernameConflict) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Username already exists' });
        }

        const emailConflict = await Account.findOne({ where: { email, id: { [Op.ne]: id } }, transaction });
        if (emailConflict) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Email already exists' });
        }

        axios.defaults.headers.common['Authorization'] = req.headers['authorization'];
        const roleData = await axios.get(`/api/role/name/${role}`);
        if (!roleData.data) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Role not found' });
        }

        account.username = username;
        account.firstname = firstname;
        account.lastname = lastname;
        account.email = email;
        account.role = role;
        account.countryId = countryId;
        account.accountStatus = accountStatus;
        await account.save({ transaction });

        const apiServicePayload = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            countryId: countryId,
            roleId: roleData.data.id,
        }

        // Synchronous call to API service
        await axios.put(`/api/user/${id}`, apiServicePayload)
            .catch(async () => {
                await transaction.rollback();
                throw new Error('Failed to update user in api-service');
            });

        // Commit
        await transaction.commit();
        res.json({ message: 'User updated successfully in both services' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/account/password/:id', verifyTokenAdmin(), updatePasswordValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');
        return res.status(400).json({ error: errorMessages });
    }

    const { id } = req.params;
    const { password } = req.body;
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.password = await bcrypt.hash(password, 12);
        account.profileUpdated = new Date();
        await account.save();

        res.json(account);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/account/:id', verifyTokenAdmin(), async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();

    try {
        const account = await Account.findByPk(id, { transaction });
        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Account not found' });
        }

        await account.destroy({ transaction });

        // Synchronous call to API service
        await axios.delete(`/api/user/${id}`)
            .catch(async () => {
                await transaction.rollback();
                throw new Error('Failed to delete user in api-service');
            });

        // Commit
        await transaction.commit();
        res.json({ message: 'Account deleted successfully in both services' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;