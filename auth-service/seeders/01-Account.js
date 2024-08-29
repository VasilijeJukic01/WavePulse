'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const hashedPassword = await bcrypt.hash('testtest', 12);

    await queryInterface.bulkInsert('Accounts', [{
      username: 'admin',
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      registrationDate: new Date(),
      countryId: 1,
      lastLogin: null,
      loginAttempts: 0,
      accountStatus: 'ACTIVE',
      emailVerified: true,
      passwordResetToken: null,
      passwordResetExpires: null,
      twoFactorEnabled: false,
      twoFactorSecret: null,
      profileUpdated: null,
      role: 'Admin',
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
      lastLogin: null,
      loginAttempts: 0,
      accountStatus: 'ACTIVE',
      emailVerified: true,
      passwordResetToken: null,
      passwordResetExpires: null,
      twoFactorEnabled: false,
      twoFactorSecret: null,
      profileUpdated: null,
      role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
