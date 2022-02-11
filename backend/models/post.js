const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.INTEGER
  },
  comments: {
    type: DataTypes.INTEGER
  },
  favorites: {
    type: [DataTypes.STRING]
  },
  reports: {
    type: [DataTypes.INTEGER]
  }
});

module.exports = { Sequelize }.model('Post', Post);