const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Comment = sequelize.define('Comment', {
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = { Sequelize }.model('Comment', Comment);