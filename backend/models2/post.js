const { Sequelize, DataTypes } = require('sequelize');

function PostModelCreation(sequelize) {
    const Post = sequelize.define('Post', {
        // Model attributes are defined here
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
      });

      return Post;
};

module.exports = PostModelCreation;