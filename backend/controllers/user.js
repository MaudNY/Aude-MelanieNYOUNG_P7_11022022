const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  console.log(sequelize.models);

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = sequelize.models.User.build({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => {
          console.error(error);
          res.status(400).json({ message: 'Adresse mail déjà utilisée' })
        })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Erreur SERVEUR' })
    })
};

exports.login = (req, res) => {
  console.log(sequelize.models)

  sequelize.models.User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {

        return res.status(401).json({ message: "Utilisateur non trouvé" })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            
            return res.status(401).json({ message: "Mot de passe incorrect" })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Erreur SERVEUR' })
        })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Erreur SERVEUR' })
    })
};

exports.deleteAccount = (req, res) => {

};