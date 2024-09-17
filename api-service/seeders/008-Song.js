'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', [
      {
        name: 'Come Together',
        duration: 260,
        year: 1969,
        albumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Let It Be',
        duration: 243,
        year: 1970,
        albumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A Horse with No Name',
        duration: 252,
        year: 1971,
        albumId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Run to You',
        duration: 226,
        year: 1984,
        albumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bohemian Rhapsody',
        duration: 354,
        year: 1975,
        albumId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hotel California',
        duration: 390,
        year: 1976,
        albumId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stairway to Heaven',
        duration: 482,
        year: 1971,
        albumId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imagine',
        duration: 183,
        year: 1971,
        albumId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smells Like Teen Spirit',
        duration: 301,
        year: 1991,
        albumId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billie Jean',
        duration: 294,
        year: 1982,
        albumId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Like a Rolling Stone',
        duration: 369,
        year: 1965,
        albumId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hey Jude',
        duration: 431,
        year: 1968,
        albumId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};