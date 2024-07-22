const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const proxy = require('express-http-proxy');
const config = require('./config/config.json');
const circuitBreaker = require('opossum');
const rateLimit = require('express-rate-limit');

const app = express();

const services = config.services;

const authInstances = services.authServiceInstances;
const apiInstances = services.apiServiceInstances;

app.use(cors());

// Logging
app.use((req, res, next) => {
    const { instance } = getNextInstance(authInstances, authIndex);
    req.instance = instance;
    next();
});

morgan.token('instance', function (req, res) { return req.instance });
app.use(morgan(':method :url | Status: :status - Response-Time: :response-time ms - Instance: :instance'));

// Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});
app.use(limiter);

// Circuit Breaker
const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000,
};

const createBreaker = (instances) => new circuitBreaker(async () => {
    const instance = instances[currentIndex];
    const response = await axios.get(`${instance}/health`);
    return response.data;
}, options);

const authBreaker = createBreaker(authInstances);
const apiBreaker = createBreaker(apiInstances);

// Load Balancing
let authIndex = 0;
let apiIndex = 0;

const getNextInstance = (instances, index) => {
    const instance = instances[index];
    index = (index + 1) % instances.length;
    return { instance, index };
};

// Routing
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

// Health Check
app.get('/health', async (req, res) => {
    try {
        const authHealth = await authBreaker.fire();
        const apiHealth = await apiBreaker.fire();

        res.status(200).json({
            gateway: 'Healthy',
            services: {
                authService: authHealth,
                apiService: apiHealth,
            },
        });
    } catch (error) {
        res.status(500).json({ gateway: 'Healthy', error: error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
    console.log(`API Gateway is running on port ${config.port}`);
});
