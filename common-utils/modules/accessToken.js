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

const verifyTokenAdmin = () => verifyToken(decoded => decoded.role === 'Admin');
const verifyTokenArtist = () => verifyToken(decoded => decoded.role === 'Artist' || decoded.role === 'Admin');
const verifyTokenUser = () => verifyToken(decoded => decoded.role === 'User' || decoded.role === 'Artist' || decoded.role === 'Admin');

module.exports = {
    verifyTokenUser,
    verifyTokenAdmin,
    verifyTokenArtist
};