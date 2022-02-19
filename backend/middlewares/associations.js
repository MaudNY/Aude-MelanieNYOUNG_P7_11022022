const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

// USER ASSOCIATIONS
User.hasMany(Post, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
});
Post.belongsTo(User);

User.hasMany(Comment, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
});
Comment.belongsTo(User);


// POST ASSOCIATIONS
Post.hasOne(User, {
    foreignKey: 'userId'
});


// COMMENT ASSOCIATIONS
Comment.hasOne(User, {
    foreignKey: 'myFooId'
  });
Bar.belongsTo(Foo);

module.exports = User, Post, Comment;