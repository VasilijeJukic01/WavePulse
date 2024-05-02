'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConcertArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  ConcertArtist.init({
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'id'
      }
    },
    concertId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Concert',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ConcertArtist',
  });
  return ConcertArtist;
};