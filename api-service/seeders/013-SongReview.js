'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongReviews', [{
      review: 'Great song!',
      likes: 10,
      dislikes: 2,
      userId: 2,
      songId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      review: 'Not my taste, but well produced.',
      likes: 5,
      dislikes: 4,
      userId: 2,
      songId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongReviews', null, {});
  }
};
