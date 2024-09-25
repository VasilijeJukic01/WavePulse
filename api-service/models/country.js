'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Artist, Concert }) {
      Country.hasMany(User, { foreignKey: 'countryId', onDelete: 'CASCADE' });
      Country.hasMany(Artist, { foreignKey: 'countryId', onDelete: 'CASCADE' });
      Country.hasMany(Concert, { foreignKey: 'countryId', onDelete: 'CASCADE' });
    }
  }
  Country.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};