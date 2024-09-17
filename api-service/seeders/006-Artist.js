'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'The Beatles',
        establishmentYear: 1960,
        description: 'English rock band',
        countryId: 230,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Rolling Stones',
        establishmentYear: 1962,
        description: 'English rock band',
        countryId: 230,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'America',
        establishmentYear: 1970,
        description: 'American rock band',
        countryId: 231,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bryan Adams',
        establishmentYear: 1975,
        description: 'Canadian singer-songwriter',
        countryId: 39,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Queen',
        establishmentYear: 1970,
        description: 'British rock band',
        countryId: 230,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eagles',
        establishmentYear: 1971,
        description: 'American rock band',
        countryId: 231,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Led Zeppelin',
        establishmentYear: 1968,
        description: 'English rock band',
        countryId: 230,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Lennon',
        establishmentYear: 1970,
        description: 'English singer-songwriter',
        countryId: 230,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nirvana',
        establishmentYear: 1987,
        description: 'American rock band',
        countryId: 231,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Jackson',
        establishmentYear: 1964,
        description: 'American singer-songwriter',
        countryId: 231,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Dylan',
        establishmentYear: 1961,
        description: 'American singer-songwriter',
        countryId: 231,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};