'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Artist, Song, AlbumRating, AlbumReview }) {
      Album.belongsTo(Artist, { foreignKey: 'artistId' });
      Album.hasMany(Song, { foreignKey: 'albumId' });
      Album.hasMany(AlbumRating, { foreignKey: 'albumId' });
      Album.hasMany(AlbumReview, { foreignKey: 'albumId' });
    }
  }
  Album.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        is: /^\d{4}$/
      }
    },
    songNumber: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artist',
        key: 'id'
      }
    }
  },{
    sequelize,
    modelName: 'Album',
  });
  return Album;
};