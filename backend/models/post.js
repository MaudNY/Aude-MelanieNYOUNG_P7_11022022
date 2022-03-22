const { Sequelize, DataTypes } = require('sequelize');

function PostModelCreation(sequelize) {
  const Post = sequelize.define('Post', {
        
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }

  });

  return Post;
};

module.exports = PostModelCreation;