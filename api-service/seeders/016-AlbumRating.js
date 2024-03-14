'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AlbumRatings', [{
      rate: 5,
      userId: 2,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      rate: 4,
      userId: 2,
      albumId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumRatings', null, {});
  }
};
