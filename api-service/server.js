const app = require('./app.js');
const { sequelize } = require("./models");
const axios = require('axios');
const { generateToken } = require('./modules/serviceToken');

const ports = [8082, 8092, 8102];

ports.forEach(port => {
    app.listen(port, async () => {
        await sequelize.sync({ force: false });
        console.log(`API Service Instance started on localhost:${port}`);

        // Service Registry
        const token = generateToken('serviceRegistry');
        axios.post('http://service-registry:8000/register', {
            name: `apiService:${port}`,
            url: `http://localhost:${port}`
        }, {
            headers: { 'Authorization': token }
        }).then(() => {
            console.log(`API Service Instance on port ${port} registered successfully`)
        }).catch(err => {
            console.error(`Error registering API service on port ${port}:`, err.message)
        });
    });
});