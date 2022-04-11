const { Sequelize, DataTypes } = require('sequelize');

function CommentModelCreation(sequelize) {
  const Comment = sequelize.define('Comment', {
        
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      get: function() {
        return this.getDataValue('createdAt')
          .toLocaleString('fr-FR', { timeZone: 'UTC' });
      }
    },

  });

  return Comment;
};

module.exports = CommentModelCreation;