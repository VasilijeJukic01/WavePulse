const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const routes = {
    '/log-category': require('./routes/logcategory.js'),
    '/log-entry': require('./routes/logentry.js'),
    '/user-activity': require('./routes/useractivity.js'),
};

Object.entries(routes).forEach(([path, route]) => {
    app.use(path, route);
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Service is healthy');
});

module.exports = app;