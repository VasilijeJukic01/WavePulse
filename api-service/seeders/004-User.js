'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('test', 10);

    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      registrationDate: new Date(),
      countryId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user',
      firstname: 'user',
      lastname: 'user',
      email: 'user@example.com',
      password: hashedPassword,
      registrationDate: new Date(),
      countryId: 1,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
