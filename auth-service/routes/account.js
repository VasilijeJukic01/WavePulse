const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Account } = require('../models');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const axios = require("axios");
require('dotenv').config();

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Validation rules
const registerValidationRules = [
    body('username').isString().isLength({ min: 3 }),
    body('firstname').isString().isLength({ min: 2 }),
    body('lastname').isString().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('countryId').isInt()
];

const loginValidationRules = [
    body('username').isString(),
    body('password').isString()
];

const generateToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

// Register
router.post('/register', registerValidationRules, async (req, res) => {
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }*/
    const { username, firstname, lastname, email, password, countryId, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userObj = {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        registrationDate: new Date(),
        countryId,
        role,
        accountStatus: 'PENDING',
        emailVerified: false
    };

    try {
        const user = await Account.create(userObj);
        const tokenPayload = { userId: user.id, username: user.username, role: user.role, status: user.status };
        const token = generateToken(tokenPayload);
        await createUser(userObj, res).then(apiResponse => {
            res.json({ token, message: 'User created successfully', userDetails: apiResponse });
        }).catch(error => {
            res.status(500).json({ error: 'Failed to create user in API service', details: error.message });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

function createUser(userObj, res) {
    const userCreationPayload = {
        username: userObj.username,
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        email: userObj.email,
        countryId: userObj.countryId,
        roleId: 2
    };
    return axios.post('http://localhost:8080/api/user', userCreationPayload)
        .then(apiResponse => {
            return apiResponse.data;
        })
        .catch(error => {
            console.error('API Error:', error.message);
            throw error;
        });
}

// Login
router.post('/login', loginValidationRules, loginLimiter, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await Account.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (user.accountStatus === 'PENDING') {
            return res.status(403).json({ error: 'Account is pending verification' });
        }
        else if (user.accountStatus === 'LOCKED') {
            return res.status(403).json({ error: 'Account is locked' });
        }
        else if (user.accountStatus === 'DISABLED') {
            return res.status(403).json({ error: 'Account is disabled' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            user.lastLogin = new Date();
            user.loginAttempts = 0;
            await user.save();
            const tokenPayload = { userId: user.id, username: user.username, role: user.role, status: user.accountStatus };
            const token = generateToken(tokenPayload);
            res.json({ token });
        } else {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.accountStatus = 'LOCKED';
            }
            await user.save();
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Password reset
router.post('/password-reset-request', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Account.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email not found' });
        }
        const token = generateToken({ userId: user.id });
        user.passwordResetToken = token;
        user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
        await user.save();
        // TODO: Send reset token to user's email
        res.json({ message: 'Password reset token sent' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/password-reset', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Account.findOne({ where: { id: decoded.userId, passwordResetToken: token } });
        if (!user || user.passwordResetExpires < new Date()) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        user.password = await bcrypt.hash(newPassword, 12);
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/edit-profile/:id', async (req, res) => {
    const { id } = req.params;
    const { username, firstname, lastname, email } = req.body;

    try {
        const user = await Account.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        await user.save();

        const apiServicePayload = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
        };

        await axios.put(`http://localhost:8080/api/user/${id}`, apiServicePayload)
            .then(apiRes => {
                console.log('User updated in api-service successfully', apiRes.data);
            })
            .catch(apiErr => {
                console.error('Failed to update user in api-service', apiErr.response.data);
                throw new Error('Failed to update user in api-service');
            });

        res.json({ message: 'User updated successfully in both services' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
