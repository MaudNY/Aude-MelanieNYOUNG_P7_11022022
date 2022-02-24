const { Sequelize, DataTypes } = require('sequelize');

function PostModelCreation(sequelize) {
  const Post = sequelize.define('Post', {
        
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    }

  });

  return Post;
};

module.exports = PostModelCreation;