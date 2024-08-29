'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('LogCategories', [{
            name: 'INFO',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'WARNING',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'ERROR',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('LogCategories', null, {});
    }
};
