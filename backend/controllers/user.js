const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');
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
            message: "Connexion réussie",
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
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
  console.log(req.auth);
  sequelize.models.User.findOne({ id: req.params.id })
    .then(user => {
      const userId = user.id;

      console.log("User ID");
      console.log(userId);
      // Vérifier que l'id du user voulant supprimer le compte est le même que l'id dans l'URL
      if (!user) {
        res.status(404).json({ message: "Utilisateur non reconnu" });

        return;
        // Vérifier que l'id du token est le même que celui du user qui veut supprimer le compte
      } /*else if (user.id != req.auth.userId) {
          res.status(403).json({ message: 'Requête non autorisée !' });

          return;
      }*/

      console.log(user)

      user.destroy({ id: req.params.id })
        .then(() => res.status(200).json({ message: "Le profil a été supprimé" }))
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: "Erreur SERVEUR" })
        })      
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur SERVEUR" })
    })
};