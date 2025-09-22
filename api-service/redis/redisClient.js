const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'redis',
        port: 6379,
    },
});

client.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = client;
