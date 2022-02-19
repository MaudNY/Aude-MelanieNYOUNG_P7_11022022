'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });

      models.User.hasMany(models.Comment, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING(25),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING,
    password: DataTypes.STRING(64),
    profileImageUrl: DataTypes.STRING,
    department: DataTypes.STRING,
    job: DataTypes.STRING,
    bio: DataTypes.TEXT,
    roles: [DataTypes.STRING]
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};