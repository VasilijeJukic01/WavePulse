'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, Artist }) {
      Concert.belongsTo(Country, { foreignKey: 'countryId' });
      Concert.hasMany(Artist, { foreignKey: 'artistId' });
    }
  }
  Concert.init({
    name: DataTypes.STRING,
    concertDate: DataTypes.DATE,
    countryId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};