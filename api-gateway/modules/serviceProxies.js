const proxy = require('express-http-proxy');
const { getInstances } = require('./serviceLocator');

let authIndex = 0;
let apiIndex = 0;

const getNextInstance = (instances, index) => {
    const instance = instances[index];
    index = (index + 1) % instances.length;
    return { instance, index };
};

const setupProxies = (app) => {
    app.use('/auth', proxy(() => {
        const { authInstances } = getInstances();
        const { instance, index } = getNextInstance(authInstances, authIndex);
        authIndex = index;
        return instance;
    }, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const { authInstances } = getInstances();
            const instance = authInstances[authIndex];
            srcReq.headers['x-target-instance'] = instance;
            srcReq.headers['x-service-name'] = 'AUTH_SERVICE';
            proxyReqOpts.headers['x-target-instance'] = instance;
            proxyReqOpts.headers['x-service-name'] = 'AUTH_SERVICE';
            return proxyReqOpts;
        }
    }));

    app.use('/api', proxy(() => {
        const { apiInstances } = getInstances();
        const { instance, index } = getNextInstance(apiInstances, apiIndex);
        apiIndex = index;
        return instance;
    }, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const { apiInstances } = getInstances();
            const instance = apiInstances[apiIndex];
            srcReq.headers['x-target-instance'] = instance;
            srcReq.headers['x-service-name'] = 'API_SERVICE';
            proxyReqOpts.headers['x-target-instance'] = instance;
            proxyReqOpts.headers['x-service-name'] = 'API_SERVICE';
            return proxyReqOpts;
        }
    }));

    app.use('/log', proxy(() => {
        const { logInstances } = getInstances();
        return logInstances[0];
    }, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            const { logInstances } = getInstances();
            const instance = logInstances[0];
            srcReq.headers['x-target-instance'] = instance;
            srcReq.headers['x-service-name'] = 'LOG_SERVICE';
            proxyReqOpts.headers['x-target-instance'] = instance;
            proxyReqOpts.headers['x-service-name'] = 'LOG_SERVICE';
            return proxyReqOpts;
        }
    }));
};

module.exports = setupProxies;