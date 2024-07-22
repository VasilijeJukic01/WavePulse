const app = require('./app.js');
const { sequelize } = require("./models");
const axios = require('axios');

const ports = [8081, 8091, 8101];

ports.forEach(port => {
    app.listen(port, async () => {
        try {
            await sequelize.authenticate()
            console.log(`Auth Service Instance started on localhost:${port}`);

            // Service Registry
            axios.post('http://localhost:8000/register', {
                name: `authService:${port}`,
                url: `http://localhost:${port}`
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