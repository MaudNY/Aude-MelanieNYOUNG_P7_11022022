const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  likesCount: {
    type: DataTypes.INTEGER
  },
  commentsCount: {
    type: DataTypes.INTEGER
  },
  usersWhoPutIntoFavorites: {
    type: [DataTypes.STRING]
  },
  usersWhoReported: {
    type: [DataTypes.STRING]
  }
});

module.exports = { Sequelize }.model('Post', Post);