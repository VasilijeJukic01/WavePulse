'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [{
      name: 'The Beatles',
      establishmentYear: 1960,
      description: 'English rock band',
      countryId: 230,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'The Rolling Stones',
      establishmentYear: 1962,
      description: 'English rock band',
      countryId: 230,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'America',
      establishmentYear: 1970,
      description: 'American rock band',
      countryId: 231,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bryan Adams',
      establishmentYear: 1975,
      description: 'Canadian singer-songwriter',
      countryId: 39,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
