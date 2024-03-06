'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      UserSettings.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  UserSettings.init({
    userId: DataTypes.INTEGER,
    language: DataTypes.STRING,
    theme: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSettings',
  });
  return UserSettings;
};