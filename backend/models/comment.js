const { Sequelize, DataTypes } = require('sequelize');

function CommentModelCreation(sequelize) {
  const Comment = sequelize.define('Comment', {
        
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });

  return Comment;
};

module.exports = CommentModelCreation;