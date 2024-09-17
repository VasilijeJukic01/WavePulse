'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('SongArtists', [
            { songId: 1, artistId: 1,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 2, artistId: 1,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 3, artistId: 3,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 4, artistId: 4,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 5, artistId: 5,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 6, artistId: 6,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 7, artistId: 7,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 8, artistId: 8,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 9, artistId: 9,  createdAt: new Date(), updatedAt: new Date() },
            { songId: 10, artistId: 10, createdAt: new Date(), updatedAt: new Date() },
            { songId: 11, artistId: 11, createdAt: new Date(), updatedAt: new Date() },
            { songId: 12, artistId: 1,  createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('SongArtists', null, {});
    }
};