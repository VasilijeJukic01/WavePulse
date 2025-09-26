const mongoose = require('mongoose');
const app = require('./app.js');
const axios = require('axios');
const { generateToken } = require('./modules/serviceToken');
const config = require('./config/config.js');

const ports = [8084];

ports.forEach(port => {
    app.listen(port, async () => {
        console.log(`Log Service Instance started on localhost:${port}`);

        // Service Registry
        const token = generateToken('serviceRegistry');
        axios.post('http://localhost:8000/register', {
            name: `logService:${port}`,
            url: `http://localhost:${port}`
        }, {
            headers: { 'Authorization': token }
        }).then(() => {
            console.log(`Log Service Instance on port ${port} registered successfully`)
        }).catch(err => {
            console.error(`Error registering Log service on port ${port}:`, err.message)
        });

        try {
            await mongoose.connect(config.development.uri, {
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000
            });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
    });
});