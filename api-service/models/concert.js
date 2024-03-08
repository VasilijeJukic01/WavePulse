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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    concertDate: DataTypes.DATE,
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Country',
        key: 'id'
      }
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};