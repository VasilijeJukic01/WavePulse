'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Concerts', [{
      name: 'Concert 1',
      concertDate: new Date(),
      countryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Concert 2',
      concertDate: new Date(),
      countryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Concerts', null, {});
  }
};
