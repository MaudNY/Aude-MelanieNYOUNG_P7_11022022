const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Departement = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  bannerImageUrl: {
    type: DataTypes.STRING
  },
  members: {
    type: [DataTypes.STRING]
  },
  topics: {
    type: [DataTypes.STRING]
  }
});

module.exports = { Sequelize }.model('Department', Departement);