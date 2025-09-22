const app = require('./app.js');
const { sequelize } = require("./models");
const axios = require('axios');
const { generateToken } = require('./modules/serviceToken');

const ports = [8081, 8091, 8101];
const serviceHost = process.env.SERVICE_HOST || 'localhost';

ports.forEach(port => {
    app.listen(port, async () => {
        try {
            await sequelize.authenticate()
            console.log(`Auth Service Instance started on ${serviceHost}:${port}`);

            // Service Registry
            const token = generateToken('serviceRegistry');
            axios.post('http://service-registry:8000/register',{
                name: `authService:${port}`,
                url: `http://${serviceHost}:${port}`
            }, {
                headers: { 'Authorization': token }
            }).then(() => {
                console.log(`Auth Service Instance on port ${port} registered successfully`)
            }).catch(err => {
                console.error(`Error registering auth service on port ${port}:`, err.message)
            })
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
});