'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, Album, Song, Follow, Concert }) {
      Artist.belongsTo(Country, { foreignKey: 'countryId' });
      Artist.belongsTo(Concert, { foreignKey: 'artistId' });
      Artist.hasMany(Album, { foreignKey: 'artistId' });
      Artist.hasMany(Song, { foreignKey: 'artistId' });
      Artist.belongsToMany(Follow, { through: 'Follow', foreignKey: 'artistId' });
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    establishmentYear: DataTypes.INTEGER,
    description: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};