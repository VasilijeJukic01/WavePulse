const express = require('express');
const schedule = require('node-schedule');
const config = require('./config/config');
const { fetchServices } = require('./modules/serviceLocator');
const setupLogger = require('./modules/serviceLogger');
const setupProxies = require('./modules/serviceProxies');
const setupHealthCheck = require('./modules/serviceHealthCheck');
const setupErrorHandler = require('./modules/serviceErrorHandler');
const setupSecurity = require('./modules/serviceSecurity');

const app = express();

const initialize = () => {
    fetchServices().then(() => {});
    schedule.scheduleJob('*/10 * * * * *', fetchServices);
    setupSecurity(app);
    setupLogger(app);
    setupProxies(app);
    setupHealthCheck(app);
    setupErrorHandler(app);
    app.listen(config.port, () => {
        console.log(`API Gateway is running on port ${config.port}`);
    });
};

initialize();