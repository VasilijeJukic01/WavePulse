'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, AlbumReview, AlbumRating, Playlist, UserSettings, SongRating, SongReview, Artist, Follow }) {
      User.belongsTo(Country, { foreignKey: 'countryId' });
      User.hasMany(Playlist, { foreignKey: 'userId' });
      User.hasMany(SongReview, { foreignKey: 'userId' });
      User.hasMany(AlbumReview, { foreignKey: 'userId' });
      User.hasMany(UserSettings, { foreignKey: 'userId' });
      User.hasMany(SongRating, { foreignKey: 'userId' });
      User.hasMany(AlbumRating, { foreignKey: 'userId' });
      User.belongsToMany(Artist, { through: Follow, foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};