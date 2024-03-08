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
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Album',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AlbumReview',
  });
  return AlbumReview;
};