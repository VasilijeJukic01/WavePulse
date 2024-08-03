const express = require('express');
const cors = require('cors');
const axios = require('axios');
const proxy = require('express-http-proxy');
const config = require('./config/config.json');
const rateLimit = require('express-rate-limit');
const schedule = require('node-schedule');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

let authInstances = [];
let apiInstances = [];
let authIndex = 0;
let apiIndex = 0;

const fetchServices = async () => {
    try {
        const res = await axios.get('http://localhost:8000/services');
        const services = res.data;

        authInstances = Object.keys(services)
            .filter(name => name.includes('authService'))
            .flatMap(name => services[name]);
        apiInstances = Object.keys(services)
            .filter(name => name.includes('apiService'))
            .flatMap(name => services[name]);
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

const getNextInstance = (instances, index) => {
    const instance = instances[index];
    index = (index + 1) % instances.length;
    return { instance, index };
};

const setupMiddleware = () => {
    // CORS
    app.use(cors());
    // Rate limiting
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
    }));
    // Logging
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.timestamp(),
                    winston.format.printf(({ timestamp, level, message, meta }) => {
                        const { method, url, headers } = meta.req;
                        const { statusCode } = meta.res;
                        const responseTime = meta.responseTime;
                        const targetInstance = headers['x-target-instance'];

                        let statusColor;
                        if (statusCode >= 500) {
                            statusColor = '\x1b[31m';
                        } else if (statusCode >= 400) {
                            statusColor = '\x1b[33m';
                        } else if (statusCode >= 300) {
                            statusColor = '\x1b[36m';
                        } else {
                            statusColor = '\x1b[32m';
                        }
                        const resetColor = '\x1b[0m';

                        return `${timestamp} [${level}] ${method} ${url} ${statusColor}${statusCode}${resetColor} ${responseTime}ms - Target: ${targetInstance}`;
                    })
                )
            })
        ],
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false,
        ignoreRoute: function (req, res) { return false; }
    }));
};

// Proxies
const setupProxies = () => {
    app.use('/auth', proxy(() => {
        const { instance, index } = getNextInstance(authInstances, authIndex);
        authIndex = index;
        return instance;
    }, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const instance = authInstances[authIndex];
            srcReq.headers['x-target-instance'] = instance;
            proxyReqOpts.headers['x-target-instance'] = instance;
            return proxyReqOpts;
        }
    }));

    app.use('/api', proxy(() => {
        const { instance, index } = getNextInstance(apiInstances, apiIndex);
        apiIndex = index;
        return instance;
    }, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const instance = apiInstances[apiIndex];
            srcReq.headers['x-target-instance'] = instance;
            proxyReqOpts.headers['x-target-instance'] = instance;
            return proxyReqOpts;
        }
    }));
};

// Health check
const setupHealthCheck = () => {
    app.get('/health', async (req, res) => {
        const checkServiceHealth = async (instance) => {
            try {
                const response = await axios.get(`${instance}/health`);
                return { instance, status: response.status === 200 ? 'healthy' : 'unhealthy' };
            } catch (error) {
                return { instance, status: 'unhealthy' };
            }
        };

        const authHealthChecks = await Promise.all(authInstances.map(checkServiceHealth));
        const apiHealthChecks = await Promise.all(apiInstances.map(checkServiceHealth));

        res.json({
            authServices: authHealthChecks,
            apiServices: apiHealthChecks,
        });
    });
};

// Error handler
const setupErrorHandler = () => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};

const startServer = () => {
    app.listen(config.port, () => {
        console.log(`API Gateway is running on port ${config.port}`);
    });
};

const initialize = () => {
    fetchServices().then(() => {});
    schedule.scheduleJob('*/10 * * * * *', fetchServices);
    setupMiddleware();
    setupProxies();
    setupHealthCheck();
    setupErrorHandler();
    startServer();
};

initialize();