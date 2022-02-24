const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const path = require('path');

// DATABASE CONFIGURATION
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

    await sequelize.sync({ alter: true });

};

connectDatabase();

// APPLICATION = EXPRESS
const app = express();

// HEADERS Definition
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); /*Autoriser les requêtes provenant de n'importe quelle origine ??*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// CONVERT ALL JS OBJECTS TO JSON OBJECTS
app.use(bodyParser.json());

// IMAGES PATH Definition
app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTES Definition
/*
const userRoutes = require('./routes/user');
const postRoutes = require('.:routes/post');
const commentRoutes = require('./routes/comment');
*/

// ENDPOINTS Definition
//app.use('/api/sauces', sauceRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;