'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'Artist',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
