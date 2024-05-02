'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [{
      name: 'The Beatles',
      establishmentYear: 1960,
      description: 'English rock band',
      countryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'The Rolling Stones',
      establishmentYear: 1962,
      description: 'English rock band',
      countryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
