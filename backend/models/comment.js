const { Sequelize, DataTypes } = require('sequelize');

function CommentModelCreation(sequelize) {
  const Comment = sequelize.define('Comment', {
        
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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

  return Comment;
};

module.exports = CommentModelCreation;