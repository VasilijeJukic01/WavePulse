'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Album, User }) {
      AlbumRating.belongsTo(Album, { foreignKey: 'albumId' });
      AlbumRating.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  AlbumRating.init({
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
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
  },{
    sequelize,
    modelName: 'AlbumRating',
  });
  return AlbumRating;
};