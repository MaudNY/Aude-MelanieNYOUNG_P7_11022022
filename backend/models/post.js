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
      get: function() { // or use get(){ }
        return this.getDataValue('createdAt')
          .toLocaleString('fr-FR', { timeZone: 'UTC' });
      }
    }

  });

  return Post;
};

module.exports = PostModelCreation;