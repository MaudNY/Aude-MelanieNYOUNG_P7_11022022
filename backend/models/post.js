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
    commentsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      get: function() {
        return this.getDataValue('createdAt')
          .toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function() {
        return this.getDataValue('updatedAt')
          .toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      }
    }

  });

  return Post;
};

module.exports = PostModelCreation;