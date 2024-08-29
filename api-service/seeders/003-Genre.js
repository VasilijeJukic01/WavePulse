'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [{
      name: 'Rock',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Pop',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Country',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Blues',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jazz',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Classical',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Hip Hop',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'R&B',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        name: 'Rap',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
      name: 'Reggae',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Electronic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Folk',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Latin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Punk',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gospel',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Soul',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Funk',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Disco',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Techno',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'House',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Trance',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dance',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Reggaeton',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Salsa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Merengue',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bachata',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cumbia',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Vallenato',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Tango',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Samba',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bossa Nova',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Flamenco',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mariachi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ranchera',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Banda',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Norteña',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ranchera',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Corrido',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'K-Pop',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Afrobeat',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ska',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Grunge',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Alternative',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Indie',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dubstep',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Trap',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lo-fi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Synthwave',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Chillwave',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ambient',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'New Age',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'World',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Klezmer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Polka',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Zydeco',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cajun',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bluegrass',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Swing',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Big Band',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Baroque',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Opera',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Choral',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gregorian Chant',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Medieval',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Renaissance',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Romantic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Contemporary Classical',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Minimalism',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Avant-Garde',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Experimental',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Noise',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Drone',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Industrial',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Post-Rock',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Post-Punk',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Shoegaze',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dream Pop',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Math Rock',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Emo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Screamo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Hardcore',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Post-Hardcore',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Crust Punk',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Grindcore',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sludge Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Doom Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Black Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Death Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Thrash Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Power Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Symphonic Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gothic Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Progressive Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Nu Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Alternative Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Rap Metal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Rap Rock',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Turbofolk',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
