const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const path = require('path');

/*
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
*/
/*
mongoose.connect('mongodb+srv://MaudNY:Piiquante1@cluster0.jrruo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
*/

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); /*Autoriser les requêtes provenant de n'importe quelle origine ??*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/sauces', sauceRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;