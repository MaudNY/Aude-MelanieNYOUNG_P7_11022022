const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  likesCount: {
    type: DataTypes.INTEGER
  },
  commentsCount: {
    type: DataTypes.INTEGER
  },
  usersWhoPutIntoFavorites: {
    type: [DataTypes.STRING]
  }
});

module.exports = { Sequelize }.model('Post', Post);
