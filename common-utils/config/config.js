const dotenv = require('dotenv');
dotenv.config({ path: '../common-utils/.env' });

module.exports = {
    tokenSecretServiceRegistry: process.env.TOKEN_SECRET_SERVICE_REGISTRY || 'SECRET_TOKEN',
    tokenSecretApiGateway: process.env.TOKEN_SECRET_API_GATEWAY || 'SECRET_TOKEN',
    tokenSecretAuthService: process.env.TOKEN_SECRET_AUTH_SERVICE || 'SECRET_TOKEN',
    tokenSecretApiService: process.env.TOKEN_SECRET_API_SERVICE || 'SECRET_TOKEN',
    tokenSecretLogService: process.env.TOKEN_SECRET_LOG_SERVICE || 'SECRET_TOKEN'
};