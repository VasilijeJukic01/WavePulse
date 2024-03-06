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
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    songNumber: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};