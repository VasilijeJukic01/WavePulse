const axios = require('axios');
const { authInstances, apiInstances, logInstances } = require('./serviceLocator');

const setupHealthCheck = (app) => {
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
        const logHealthChecks = await Promise.all(logInstances.map(checkServiceHealth));

        res.json({
            authServices: authHealthChecks,
            apiServices: apiHealthChecks,
            logServices: logHealthChecks
        });
    });
};

module.exports = setupHealthCheck;