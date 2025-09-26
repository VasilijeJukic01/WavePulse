'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      {
        name: 'Abbey Road',
        year: 1969,
        songNumber: 17,
        score: 9.3,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Let It Be',
        year: 1970,
        songNumber: 12,
        score: 8.5,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'America',
        year: 1971,
        songNumber: 11,
        score: 7.5,
        artistId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reckless',
        year: 1984,
        songNumber: 10,
        score: 8.0,
        artistId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A Night at the Opera',
        year: 1975,
        songNumber: 12,
        score: 9.0,
        artistId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hotel California',
        year: 1976,
        songNumber: 9,
        score: 8.6,
        artistId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Led Zeppelin IV',
        year: 1971,
        songNumber: 8,
        score: 9.5,
        artistId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imagine',
        year: 1971,
        songNumber: 10,
        score: 8.9,
        artistId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nevermind',
        year: 1991,
        songNumber: 12,
        score: 9.2,
        artistId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Thriller',
        year: 1982,
        songNumber: 9,
        score: 9.7,
        artistId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Highway 61 Revisited',
        year: 1965,
        songNumber: 9,
        score: 8.8,
        artistId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Beatles',
        year: 1968,
        songNumber: 30,
        score: 9.1,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};