'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongRatings', [{
      rate: 5,
      userId: 2,
      songId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      rate: 4,
      userId: 2,
      songId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongRatings', null, {});
  }
};
