'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongTags', [{
      tagId: 2,
      songId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      tagId: 2,
      songId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongTags', null, {});
  }
};
