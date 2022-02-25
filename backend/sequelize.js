const { Sequelize } = require('sequelize');
const PostModelCreation = require('./models/post');
const UserModelCreation = require('./models/user');
const CommentModelCreation = require('./models/comment');

const sequelize = new Sequelize('inbetween', 'root', 'Louandreassalome1', {
  host: 'localhost',
  dialect: 'mysql'
});

async function connectDatabase () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully to MySQL Database.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    const User = UserModelCreation(sequelize);
    const Post = PostModelCreation(sequelize);
    const Comment = CommentModelCreation(sequelize);

    User.hasMany(Post, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    }); 
    Post.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    Comment.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    Comment.belongsTo(Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });

    await sequelize.sync();

};

connectDatabase();

module.exports = sequelize;