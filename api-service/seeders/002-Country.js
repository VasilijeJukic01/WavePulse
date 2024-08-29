'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = fs.readFileSync(path.join(__dirname, '../res/countries.txt'), 'utf8');
    const countries = JSON.parse(data);

    const formattedCountries = countries.map(country => ({
      name: country.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert all the countries into the 'Countries' table
    await queryInterface.bulkInsert('Countries', formattedCountries, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
