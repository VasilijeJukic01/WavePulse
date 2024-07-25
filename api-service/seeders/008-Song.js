'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', [{
      name: 'Come Together',
      duration: 260,
      year: 1969,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Let It Be',
      duration: 243,
      year: 1970,
      albumId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};