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
    static associate({ Album, Artist, Playlist, SongRating, SongReview, Tag, Genre }) {
      Song.belongsTo(Album, { foreignKey: 'albumId' });
      Song.hasMany(SongRating, { foreignKey: 'songId' });
      Song.hasMany(SongReview, { foreignKey: 'songId' });
      Song.belongsToMany(Tag, { through: 'SongTag', foreignKey: 'songId' });
      Song.belongsToMany(Playlist, { through: 'PlaylistSong', foreignKey: 'songId' });
      Song.belongsToMany(Artist, { through: 'SongArtists', foreignKey: 'songId' })
      Song.belongsToMany(Genre, { through: 'SongGenre', foreignKey: 'songId' });
    }
  }
  Song.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        is: /^\d{4}$/
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Album',
        key: 'id'
      }
    },
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artist',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};