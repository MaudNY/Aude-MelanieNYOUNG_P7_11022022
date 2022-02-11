const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Topic = sequelize.define('Topic', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posts: {
    type: [DataTypes.STRING]
  },
  members: {
    type: DataTypes.INTEGER
  }
});

module.exports = { Sequelize }.model('Topic', Topic);