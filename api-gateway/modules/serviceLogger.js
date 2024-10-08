const expressWinston = require('express-winston');
const winston = require('winston');
const loggerConfig = require('../config/loggerConfig.json');

const setupLogger = (app) => {
    const consoleTransportConfig = loggerConfig.transports.find(t => t.type === 'Console');

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    consoleTransportConfig.format.colorize.all ? winston.format.colorize({ all: true }) : winston.format.uncolorize(),
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

                        const statusColors = consoleTransportConfig.format.statusColors;
                        let statusColor = statusColors['200'];

                        if (statusCode >= 500) {
                            statusColor = statusColors['500'];
                        } else if (statusCode >= 400) {
                            statusColor = statusColors['400'];
                        } else if (statusCode >= 300) {
                            statusColor = statusColors['300'];
                        }

                        const serviceColors = consoleTransportConfig.format.serviceColors;
                        const serviceColor = serviceName.startsWith('REDIS_')
                            ? serviceColors['REDIS_']
                            : serviceColors[serviceName] || serviceColors['DEFAULT'];
                        const resetColor = consoleTransportConfig.format.resetColor;

                        return `[${serviceColor}${serviceName}${resetColor}] ${timestamp} [${level}] ${method} ${url} ${statusColor}${statusCode}${resetColor} ${responseTime}ms - Target: ${targetInstance}`;
                    })
                )
            })
        ],
        meta: loggerConfig.meta,
        msg: loggerConfig.msg,
        expressFormat: loggerConfig.expressFormat,
        colorize: loggerConfig.colorize,
        ignoreRoute: new Function('req', 'res', loggerConfig.ignoreRoute)
    }));
};

module.exports = setupLogger;
