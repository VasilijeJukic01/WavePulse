'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Album, User }) {
      AlbumReview.belongsTo(Album, { foreignKey: 'albumId' });
      AlbumReview.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  AlbumReview.init({
    review: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AlbumReview',
  });
  return AlbumReview;
};