const expressWinston = require('express-winston');
const winston = require('winston');

const setupLogger = (app) => {
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
                        const targetInstance = headers['x-target-instance'] || 'API_GATEWAY';
                        let serviceName = headers['x-service-name'] || 'API_GATEWAY';

                        if (url.includes('redis')) {
                            serviceName = `REDIS_${serviceName}`;
                        }

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

                        const serviceColor = serviceName.startsWith('REDIS_') ? '\x1b[31m' :
                            serviceName === 'AUTH_SERVICE' ? '\x1b[35m' :
                                serviceName === 'API_SERVICE' ? '\x1b[34m' :
                                    serviceName === 'LOG_SERVICE' ? '\x1b[32m' :
                                        '\x1b[36m';

                        return `[${serviceColor}${serviceName}${resetColor}] ${timestamp} [${level}] ${method} ${url} ${statusColor}${statusCode}${resetColor} ${responseTime}ms - Target: ${targetInstance}`;
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

module.exports = setupLogger;