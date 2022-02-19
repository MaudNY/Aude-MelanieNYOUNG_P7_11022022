const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
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
  tags: {
    type: [DataTypes.STRING]
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { Sequelize }.model('User', User);