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
    static associate({ Album, Artist, Playlist, SongRating, SongReview, Tag, Genre, SongArtist, SongGenre }) {
      Song.belongsTo(Album, { foreignKey: 'albumId' });
      Song.hasMany(SongRating, { foreignKey: 'songId', onDelete: 'CASCADE' });
      Song.hasMany(SongReview, { foreignKey: 'songId', onDelete: 'CASCADE' });
      Song.belongsToMany(Tag, { through: 'SongTag', foreignKey: 'songId', onDelete: 'CASCADE' });
      Song.belongsToMany(Playlist, { through: 'PlaylistSong', foreignKey: 'songId', onDelete: 'CASCADE' });
      Song.belongsToMany(Artist, { through: 'SongArtist', foreignKey: 'songId', onDelete: 'CASCADE' })
      Song.belongsToMany(Genre, { through: 'SongGenre', foreignKey: 'songId', onDelete: 'CASCADE' });

      Song.hasMany(SongArtist, { as: 'songArtists', foreignKey: 'songId' , onDelete: 'CASCADE'});
      Song.hasMany(SongGenre, { as: 'songGenres', foreignKey: 'songId' , onDelete: 'CASCADE'});
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
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        is: /^\d{4}$/
      }
    },
    playCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true,
            min: 0
        }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Album',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};