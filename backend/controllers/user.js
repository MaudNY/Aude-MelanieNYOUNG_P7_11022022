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
            message: "Connexion réussie",
            userId: user.id,
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

/*exports.deleteAccount2 = (req, res) => {
  sequelize.models.User.findOne({ id: req.params.id })
    .then(user => {
      // Vérifier que l'id du user voulant supprimer le compte est le même que l'id dans l'URL
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non reconnu' });

        return;
      }/* else if (user.id !== req.auth.userId) {
        res.status(403).json({ message: 'Requête non autorisée !' });

        return;
      }
      console.log(user)

      sequelize.models.Comment.destroy({ userId: req.params.id })
        .then(
          console.log({ message: "Tous les commentaires ont été supprimés" }),
          sequelize.models.Post.destroy({ userId: req.params.id })
            .then(
              console.log({ message: "Tous les posts et commentaires ont été supprimés" }),
              sequelize.models.User.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
                .catch(error => {
                  console.error(error),
                  res.status(500).json({ message: "Erreur SERVEUR" })
                })
            )
            .catch(error => {
              console.error(error),
              res.status(500).json({ message: "Erreur SERVEUR" })
            })
        )
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: "Erreur SERVEUR" })
        })
    )
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur SERVEUR" })
    })
  // Vérifier que le token d'authentification est le même que celui du user qui veut supprimer le compte
};*/

exports.deleteAccount = (req, res) => {
  sequelize.models.User.findOne({ id: req.params.id })
    .then(user => {
      // Vérifier que l'id du user voulant supprimer le compte est le même que l'id dans l'URL
      if (!user) {
        res.status(404).json({ message: "Utilisateur non reconnu" });

        return;
      }
      // Vérifier que le token d'authentification est le même que celui du user qui veut supprimer le compte

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