const express = require('express');
const bodyParser = require('body-parser');
require('./sequelize');

const path = require('path');

// APPLICATION = EXPRESS
const app = express();

// HEADERS Definition
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// CONVERT ALL JS OBJECTS TO JSON OBJECTS
app.use(bodyParser.json());

// IMAGES PATH Definition
app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTES Definition

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// ENDPOINTS Definition
app.use('/api/auth', userRoutes);
app.use('/api/auth', postRoutes);
app.use('/api/auth', commentRoutes);

module.exports = app;