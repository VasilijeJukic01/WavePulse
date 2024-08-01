'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [{
      name: 'Abbey Road',
      year: 1969,
      songNumber: 17,
      score: 9.3,
      artistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Let It Be',
      year: 1970,
      songNumber: 12,
      score: 8.5,
      artistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'America',
      year: 1971,
      songNumber: 11,
      score: 7.5,
      artistId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Reckless',
      year: 1984,
      songNumber: 10,
      score: 8.0,
      artistId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
