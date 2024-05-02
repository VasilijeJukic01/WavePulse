const app = require('./app.js');
const { sequelize } = require("./models");

app.listen(8000, async () => {
    console.log('Server started on localhost:8000');
    await sequelize.sync({ force: false });
    console.log('DB synced');
});