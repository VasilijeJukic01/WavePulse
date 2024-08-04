const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const setupSecurity = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
        referrerPolicy: { policy: 'strict-origin' },
        crossOriginResourcePolicy: { policy: 'same-origin' },
        frameguard: { action: 'deny' },
        hsts: {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true
        },
        noSniff: true,
        ieNoOpen: true,
        xssFilter: true
    }));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
};

module.exports = setupSecurity;