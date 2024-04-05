'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = [
    require(path.join(__dirname, 'role'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'genre'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'country'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'user'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'usersettings'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'artist'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'album'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'song'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'songgenre'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'playlist'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'playlistsong'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'songrating'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'songreview'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'tag'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'songtag'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'albumrating'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'albumreview'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'follow'))(sequelize, Sequelize.DataTypes),
    require(path.join(__dirname, 'concert'))(sequelize, Sequelize.DataTypes),
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