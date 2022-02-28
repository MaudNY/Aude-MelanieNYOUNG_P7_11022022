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
        .then(() => res.status(201).json({ message: "Félicitations ! Votre compte a été créé." }))
        .catch(error => {
          console.error(error);
          res.status(400).json({ message: "Cette adresse mail est déjà utilisée." })
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
  console.log(newProfilePic)
  const userObject = req.file ?
  {
    ...JSON.parse(req.body),
    profileImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  console.log(userObject)

  sequelize.models.User.findOne({ where: { id: req.params.id } })
  .then(user => {
    if (newProfilePic) {
      const fileToBeDeleted = user.profileImageUrl.split('/images')[1];

      bcrypt.hash(req.body.password, 10)
          .then(hash =>{
            user.update({
              ...userObject,
              password: hash
            }, { where: { id: req.params.id } })
              .then(user => {
                user.save()
                .then(() => {
                  res.status(200).json({ message: "Votre profil a été mis à jour et sauvegardé" })
                  if (fileToBeDeleted) {
                    fs.unlink(`images/${fileToBeDeleted}`, (err) => {
                      if (err) {
                          console.error(err);
                      }
                  })

                  return;
                  }
                })
                .catch(error => {
                  console.error(error);
                  res.status(500).json({ message: "Erreur SERVEUR" })
                })
              })
              .catch(error => {
                console.error(error);
                res.status(500).json({ message: "Erreur SERVEUR" })
              })
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Erreur SERVEUR" })
          })

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
                .then(() => res.status(200).json({ message: "Votre profil a été mis à jour et sauvegardé" }))
                .catch(error => {
                  console.error(error);
                  res.status(500).json({ message: "Erreur SERVEUR" })
                })
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
  console.log("req.body.id", req.body.id);
  console.log("req.params.id", req.params.id);
  console.log("req.auth", req.auth);


  if (req.body.id !== req.params.id || req.body.id !== req.auth) {
    res.status(403).json({message: "Requête non autorisée"})

    return;
  }

  sequelize.models.User.destroy({ where: { 
    id: req.body.id,
    email: req.body.email } })
    .then(() => {
      res.status(200).json({ message : "Votre compte a bien été supprimé" })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })

};