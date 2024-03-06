'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Song, User }) {
      SongRating.belongsTo(Song, { foreignKey: 'songId' });
      SongRating.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  SongRating.init({
    rate: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SongRating',
  });
  return SongRating;
};