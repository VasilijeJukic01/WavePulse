const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const services = {};

// Routes
app.post('/register', (req, res) => {
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

app.delete('/register', (req, res) => {
    try {
        const { name, url } = req.body;

        if (!name || !url) return res.status(400).json({ error: 'Invalid input' });
        if (services[name]) services[name] = services[name].filter(serviceUrl => serviceUrl !== url);

        res.json({ message: `Service ${name} deregistered from ${url}` });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/services', (req, res) => {
    try {
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Core
app.listen(8000, () => {
    console.log('Service Registry is running on port 8000');
});