'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ LogEntry }) {
      LogCategory.hasMany(LogEntry, { foreignKey: 'categoryId', as: 'logEntries' });
    }
  }
  LogCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'name cannot be empty' },
      }
    }
  }, {
    sequelize,
    modelName: 'LogCategory',
  });
  return LogCategory;
};