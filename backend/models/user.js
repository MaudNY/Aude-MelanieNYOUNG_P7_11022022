const { Sequelize, DataTypes } = require('sequelize');

function UserModelCreation(sequelize) {
  const User = sequelize.define('User', {
      
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^[0-9a-f]{64}$/i
      }
    },
    profileImageUrl: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    job: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.TEXT
    },
    roles: {
      type: [DataTypes.STRING],
      allowNull: false,
    }

  });

  return User;
};

module.exports = UserModelCreation;