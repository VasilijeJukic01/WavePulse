const express = require('express');
const { sequelize } = require('./models');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/account');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('Missing ACCESS_TOKEN_SECRET environment variable');
}

const corsOptions = {
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    optionsSuccessStatus: 200
};

const app = express();

// Middleware
app.use(express.json());
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

app.use('/api', routes);

app.listen(8001, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected and server running on port 8001');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
