'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, Album, Song, Concert, User }) {
      Artist.belongsTo(Country, { foreignKey: 'countryId' });
      Artist.belongsTo(User, { foreignKey: 'userId' });

      Artist.hasMany(Album, { foreignKey: 'artistId', onDelete: 'CASCADE' });

      Artist.belongsToMany(Concert, { through: "ConcertArtists", foreignKey: 'artistId', onDelete: 'CASCADE' });
      Artist.belongsToMany(Song, { through: 'SongArtist', foreignKey: 'artistId', onDelete: 'CASCADE' })
      Artist.belongsToMany(User, { through: 'Follow', foreignKey: 'artistId', onDelete: 'CASCADE' });
    }
  }
  Artist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    establishmentYear: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        is: /^\d{4}$/
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Country',
        key: 'id'
      }
    },
  },  {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};