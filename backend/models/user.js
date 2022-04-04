const { Sequelize, DataTypes } = require('sequelize');

function UserModelCreation(sequelize) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          min: 2,
          allowNull: false,
          validate: {
            is: /^([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})$/
          }
        },
        lastName: {
          type: DataTypes.STRING,
          min: 2,
          allowNull: false,
          validate: {
            is: /^([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})?([-]{0,1}[\ \']*)?([A-ZÉÈÊËÎÏa-zéèëîïüßäö]{1,})$/
          }
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
          allowNull: false,
          validate: {
            is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/
          }
        },
        profileImageUrl: {
          type: DataTypes.STRING,
          allowNull: false
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
        role: {
          type: DataTypes.STRING,
          allowNull: false
        }
        
      });

      return User;
};

module.exports = UserModelCreation;