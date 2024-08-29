'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('SongArtists', [
            {
                songId: 1,
                artistId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songId: 2,
                artistId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songId: 3,
                artistId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                songId: 4,
                artistId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('SongArtists', null, {});
    }
};
