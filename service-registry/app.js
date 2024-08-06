const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const { verifyToken } = require('./modules/serviceToken');
const setupSecurity = require('./modules/serviceSecurity');

const app = express();
app.use(bodyParser.json());

const services = {};

// Routes
app.post('/register', verifyToken('serviceRegistry'), (req, res) => {
    try {
        const { name, url } = req.body;

        if (!name || !url) return res.status(400).json({ error: 'Invalid input' });
        if (!services[name]) services[name] = [];
        if (!services[name].includes(url)) services[name].push(url);

        res.json({ message: `Service ${name} registered at ${url}` });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/register', verifyToken('serviceRegistry'), (req, res) => {
    try {
        const { name, url } = req.body;

        if (!name || !url) return res.status(400).json({ error: 'Invalid input' });
        if (services[name]) services[name] = services[name].filter(serviceUrl => serviceUrl !== url);

        res.json({ message: `Service ${name} deregistered from ${url}` });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/services', verifyToken('apiGateway'), (req, res) => {
    try {
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Core
const initialize = () => {
    setupSecurity(app);
    app.listen(config.port, () => {
        console.log(`Service Registry is running on port ${config.port}`);
    });
};

initialize();