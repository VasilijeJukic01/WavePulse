'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserSettings', [{
      userId: 1,
      language: 'EN',
      theme: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      language: 'EN',
      theme: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserSettings', null, {});
  }
};
