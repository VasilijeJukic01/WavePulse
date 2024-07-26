'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Song, Genre }) {
      SongGenre.belongsTo(Song, { foreignKey: 'songId' });
      SongGenre.belongsTo(Genre, { foreignKey: 'genreId' });
    }
  }
  SongGenre.init({
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Song',
        key: 'id'
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'SongGenre',
  });
  return SongGenre;
};