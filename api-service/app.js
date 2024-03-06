const express = require('express');
const { sequelize } = require("./models");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const routes = {

};

Object.entries(routes).forEach(([path, route]) => {
    app.use(path, route);
});

app.listen(8000, async () => {
    console.log('Server started on localhost:8000');
    await sequelize.sync({ force: false });
    console.log('DB synced');
});