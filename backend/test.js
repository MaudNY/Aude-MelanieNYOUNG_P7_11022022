const { Sequelize } = require('sequelize');
const CommentModelCreation = require('./models/comment');
const PostModelCreation = require('./models2/post');
const UserModelCreation = require('./models2/user');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('inbetween', 'root', 'Louandreassalome1', {
  host: 'localhost',
  dialect: 'mysql'
});

async function run () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
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

    await sequelize.sync({ force: true });

    const firstUser = User.build({ firstName: 'Maud', lastName: 'NYOUNG' });
    console.log(firstUser instanceof User);
    console.log(firstUser.toJSON());

    await firstUser.save();
    console.log(firstUser.toJSON());

    //server.listen(port);
};

run();