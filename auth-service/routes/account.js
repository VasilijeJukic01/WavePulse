const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Account } = require('../models');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
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
        // TODO: Send verification email with token
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

module.exports = router;
