'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AlbumReviews', [{
      review: 'Great album!',
      likes: 10,
      dislikes: 2,
      userId: 1,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      review: 'Hhahah Joke...',
      likes: 2,
      dislikes: 11,
      userId: 2,
      albumId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumReviews', null, {});
  }
};
