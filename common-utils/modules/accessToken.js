const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (checkFn) => (req, res, next) => {
    const token = req.headers['authorization'];
    const secret = config.tokenSecret;

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        if (!checkFn(decoded)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        next();
    });
};

const verifyTokenUser = () => verifyToken(decoded => decoded.status === 'ACTIVE');
const verifyTokenAdmin = () => verifyToken(decoded => decoded.role === 'Admin');
const verifyTokenArtist= () => verifyToken(decoded => decoded.role === 'Admin' || decoded.role === 'Artist');

module.exports = {
    verifyTokenUser,
    verifyTokenAdmin,
    verifyTokenArtist
};