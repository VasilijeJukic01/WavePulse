'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PlaylistSongs', [{
      songId: 1,
      playlistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      songId: 2,
      playlistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
