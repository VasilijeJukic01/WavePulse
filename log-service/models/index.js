'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

const db = {};

let sequelize;
if (process.env[config.use_env_variable]) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = [
    require(path.join(__dirname, 'logcategory'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'logentry'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'useractivity'))(sequelize, Sequelize.DataTypes),
];

models.forEach(model => {
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;