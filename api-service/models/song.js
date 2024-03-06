'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Album, Artist, Playlist, PlaylistSong, SongRating, SongReview, Tag, Genre }) {
      Song.belongsTo(Album, { foreignKey: 'albumId' });
      Song.belongsTo(Artist, { foreignKey: 'artistId' });
      Song.hasMany(SongRating, { foreignKey: 'songId' });
      Song.hasMany(SongReview, { foreignKey: 'songId' });
      Song.belongsToMany(Tag, { through: 'SongTag', foreignKey: 'songId' });
      Song.belongsToMany(Playlist, { through: PlaylistSong, foreignKey: 'songId' });
      Song.belongsToMany(Genre, { through: 'SongGenre', foreignKey: 'songId' });
    }
  }
  Song.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};