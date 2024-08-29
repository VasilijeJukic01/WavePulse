const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secrets = {
    serviceRegistry: config.tokenSecretServiceRegistry,
    apiGateway: config.tokenSecretApiGateway,
    authService: config.tokenSecretAuthService,
    apiService: config.tokenSecretApiService,
    logService: config.tokenSecretLogService
};

const generateToken = (serviceName) => {
    const secret = secrets[serviceName];
    if (!secret) throw new Error(`No secret found for service: ${serviceName}`);
    return jwt.sign({ service: serviceName }, secret, { expiresIn: '1h' });
};

const verifyToken = (serviceName) => (req, res, next) => {
    const token = req.headers['authorization'];
    const secret = secrets[serviceName];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.serviceName = decoded.service;
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken
};
