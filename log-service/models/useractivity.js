'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { }
  }
  UserActivity.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'action cannot be empty' }
      }
    },
    timestamp: DataTypes.DATE,
    context: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isObject(value) {
          if (typeof value !== 'object' || value === null) {
            throw new Error('context must be a valid JSON object');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserActivity',
  });
  return UserActivity;
};