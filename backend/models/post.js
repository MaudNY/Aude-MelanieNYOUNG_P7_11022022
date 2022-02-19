'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });

      models.Post.hasMany(models.Comment, {
        foreignKey: {
          name: 'postId',
          allowNull: false
        }
      })
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    likesCount: DataTypes.INTEGER,
    commentsCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};