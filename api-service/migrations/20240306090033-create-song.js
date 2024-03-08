'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.INTEGER,
        validate: {
          is: /^\d{4}$/
        }
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Album',
          key: 'id'
        }
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artist',
          key: 'id'
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
    await queryInterface.dropTable('Songs');
  }
};