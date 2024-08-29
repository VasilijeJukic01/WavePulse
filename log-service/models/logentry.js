'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ LogCategory }) {
      LogEntry.belongsTo(LogCategory, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  LogEntry.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    timestamp: DataTypes.DATE,
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'message cannot be empty' }
      }
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'service cannot be empty' },
      }
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'component cannot be empty' },
      }
    },
    context: {
      type: DataTypes.JSON,
      validate: {
        isObject(value) {
          if (typeof value !== 'object' || value === null) {
            throw new Error('context must be a valid JSON object');
          }
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'LogCategories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'LogEntry',
  });
  return LogEntry;
};