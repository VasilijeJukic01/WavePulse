'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Follows', [{
      userId: 2,
      artistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      artistId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Follows', null, {});
  }
};
