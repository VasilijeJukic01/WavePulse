'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, PlaylistSong, Song }) {
      Playlist.belongsTo(User, { foreignKey: 'userId' });
      Playlist.belongsToMany(Song, { through: PlaylistSong, foreignKey: 'playlistId' });
    }
  }
  Playlist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};