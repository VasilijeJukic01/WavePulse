const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 8080,
    serviceRegistryUrl: process.env.SERVICE_REGISTRY_URL || 'http://localhost:8000',
};