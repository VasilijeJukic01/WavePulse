'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, Role, AlbumReview, AlbumRating, Playlist, UserSettings, SongRating, SongReview, Artist }) {
      User.belongsTo(Country, { foreignKey: 'countryId' });
      User.belongsTo(Role, { foreignKey: 'roleId' });

      User.hasMany(Playlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(SongReview, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(AlbumReview, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(UserSettings, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(SongRating, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(AlbumRating, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(Artist, { foreignKey: 'userId', onDelete: 'CASCADE' });

      User.belongsToMany(Artist, { through: 'Follow', foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    firstname: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Country',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id'
      }
    }
  },  {
    sequelize,
    modelName: 'User',
  });
  return User;
};