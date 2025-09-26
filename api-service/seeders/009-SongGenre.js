'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongGenres', [
      { songId: 1, genreId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 2, genreId: 2,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 3, genreId: 12, createdAt: new Date(), updatedAt: new Date() },
      { songId: 3, genreId: 3,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 4, genreId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 5, genreId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 6, genreId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 7, genreId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 8, genreId: 2,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 9, genreId: 3,  createdAt: new Date(), updatedAt: new Date() },
      { songId: 10, genreId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 11, genreId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 12, genreId: 6, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongGenres', null, {});
  }
};