'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 20]
        }
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 55]
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 55]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      registrationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      accountStatus: {
        type: Sequelize.ENUM('ACTIVE', 'LOCKED', 'PENDING', 'DISABLED'),
        defaultValue: 'PENDING'
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      passwordResetExpires: {
        type: Sequelize.DATE,
        allowNull: true
      },
      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      twoFactorSecret: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profileUpdated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('Admin', 'User', 'Artist'),
        defaultValue: 'User'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};