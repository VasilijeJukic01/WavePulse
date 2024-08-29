'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Account.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 20]
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 55]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 55]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, undefined]
      }
    },
    registrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    accountStatus: {
      type: DataTypes.ENUM('ACTIVE', 'LOCKED', 'PENDING', 'DISABLED'),
      defaultValue: 'PENDING'
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profileUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User', 'Artist'),
      defaultValue: 'User'
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};