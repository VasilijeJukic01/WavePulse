'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', [
      {
        name: 'Come Together',
        duration: 260,
        year: 1969,
        imageUUID: 'a641778b-c2b1-4dd3-a8d9-bb3b0156e2f3',
        albumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Let It Be',
        duration: 243,
        year: 1970,
        imageUUID: '53c4809d-ce9f-4956-b382-fc13695dcbd2',
        albumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A Horse with No Name',
        duration: 252,
        year: 1971,
        imageUUID: '6ce93a6b-8d56-4e42-a770-18a3010811a7',
        albumId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Run to You',
        duration: 226,
        year: 1984,
        imageUUID: 'c82f004c-ac2e-4340-b9eb-12fc529e49f4',
        albumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bohemian Rhapsody',
        duration: 354,
        year: 1975,
        imageUUID: '323666fb-8b43-4a5e-b4d2-dac736d44e86',
        albumId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hotel California',
        duration: 390,
        year: 1976,
        imageUUID: '729b654c-ac84-4449-b266-41238008ffff',
        albumId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stairway to Heaven',
        duration: 482,
        year: 1971,
        imageUUID: '08a55658-ac4a-4988-91a6-a504f2ad82ef',
        albumId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imagine',
        duration: 183,
        year: 1971,
        imageUUID: 'ec563350-296c-4a9b-8f0d-08cd0323f470',
        albumId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smells Like Teen Spirit',
        duration: 301,
        year: 1991,
        imageUUID: '70269076-986e-4284-bf29-3601d8c60b8a',
        albumId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billie Jean',
        duration: 294,
        year: 1982,
        imageUUID: '1a96d5b1-173f-4ef3-8db8-c9c745601f7e',
        albumId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Like a Rolling Stone',
        duration: 369,
        year: 1965,
        imageUUID: 'c1956f3f-ec84-4843-acdd-ccea10166654',
        albumId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hey Jude',
        duration: 431,
        year: 1968,
        imageUUID: '5c30e0da-69cc-40c3-83ee-f1fa68b67811',
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