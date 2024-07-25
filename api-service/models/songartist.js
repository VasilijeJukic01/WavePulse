'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SongArtist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    SongArtist.init({
        songId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Song',
                key: 'id'
            }
        },
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Artist',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'SongArtist',
    });
    return SongArtist;
};