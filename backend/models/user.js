const { Sequelize, DataTypes } = require('sequelize');

function UserModelCreation(sequelize) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
          allowNull: false
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
        }
      }, {
        // Other model options go here
      });

      return User;
};

module.exports = UserModelCreation;