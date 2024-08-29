const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const corsOptions = {
    origin: process.env.CORS_ORIGINS.split(','),
    optionsSuccessStatus: 200
};

const setupSecurity = (app) => {
    app.use(cors(corsOptions));
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
    app.use(cookieParser());

    if (process.env.NODE_ENV !== 'production') {
        app.use((req, res, next) => {
            req.csrfToken = () => {};
            next();
        });
    } else {
        app.use(csrf({ cookie: true }));
        app.use((req, res, next) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            next();
        });
    }
};

module.exports = setupSecurity;