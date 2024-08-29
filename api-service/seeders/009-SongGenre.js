'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongGenres', [{
      songId: 1,
      genreId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      songId: 2,
      genreId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      songId: 3,
      genreId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      songId: 3,
      genreId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      songId: 4,
      genreId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongGenres', null, {});
  }
};
