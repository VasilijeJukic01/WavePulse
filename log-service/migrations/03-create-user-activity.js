'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserActivities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      timestamp: {
        type: Sequelize.DATE
      },
      context: {
        type: Sequelize.JSON,
        validate: {
          isJSON: true
        }
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
    await queryInterface.dropTable('UserActivities');
  }
};