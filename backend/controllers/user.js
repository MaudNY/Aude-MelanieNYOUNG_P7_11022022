const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res) => {
  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = sequelize.models.User.build({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      user.save()
        .then(() => res.status(201).json({ message: "Félicitations ! Votre compte utilisateur a été créé." }))
        .catch(error => {
          console.error(error);
          res.status(400).json({ message: "Cette adresse mail est déjà utilisée, veuillez en saisir une autre." })
        })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })

};

exports.login = (req, res) => {

  const targetedEmail = req.body.email;
  console.log(targetedEmail);
  
  sequelize.models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {

        return res.status(401).json({ message: "Cet utilisateur n'a pas été trouvé" })
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
          res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
        })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })
};

exports.updateProfile = (req, res) => {
  const newProfilePic = req.file;
  const userObject = req.file ?
  {
    ...JSON.parse(req.body.user),
    ...JSON.parse(req.body),
    profileImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  console.log("userObject");
  console.log(userObject);

  sequelize.models.User.findOne({ where: { id: req.params.id } })
  .then(user => {
    if (newProfilePic) {
      const fileToBeDeleted = user.profileImageUrl.split('/images')[1];
      user.update({ ...userObject }, { where: { id: req.params.id } })
        .then(() => {
          res.status(200).json({ message: "Profil mis à jour" })
          fs.unlink(`images/${fileToBeDeleted}`, (err) => {
              if (err) {
                  console.error(err);
              }
          })
        })
        .catch(error => res.status(400).json({ message: error }))

      return;
    } else {
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          user.update({ 
            ...userObject,
            password: hash
          }, { where: { id: req.params.id } })
            .then(user => {
              user.save()
                .then(() => res.status(200).json({ message: "Profil mis à jour et sauvegardé" }))
                .catch()
            })
            .catch(error => {
              console.error(error);
              res.status(500).json({ message: "Erreur SERVEUR" })
            });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: "Erreur SERVEUR" })
        })
      
      return;
    }

  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: "Erreur SERVEUR" })
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