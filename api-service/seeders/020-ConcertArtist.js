'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ConcertArtists', [
      {
        concertId: 1,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        concertId: 2,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ConcertArtists', null, {});
  }
};
