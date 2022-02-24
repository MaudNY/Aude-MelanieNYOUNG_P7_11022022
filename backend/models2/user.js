const { Sequelize, DataTypes } = require('sequelize');

function UserModelCreation(sequelize) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
      });

      return User;
};

module.exports = UserModelCreation;