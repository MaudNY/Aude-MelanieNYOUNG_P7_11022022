const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');


// CREER son profil
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

// SE CONNECTER à son profil
exports.login = (req, res) => {

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

// AFFICHER un profil
exports.getOneProfile = (req, res) => {
  sequelize.models.User.findOne({ where: { id: req.params.id } })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })
};

// METTRE A JOUR son profil
exports.updateProfile = (req, res) => {
  console.log("req.params.id", req.params.id);

  if (req.params.id !== req.auth) {
    
    return res.status(403).json({ message: "Requête non autorisée" });
  }
  
  const userObject = { ...req.body };
  console.log(userObject);

  sequelize.models.User.findOne({ where: { id: req.params.id } })
    .then(user => {
    
      return user.update({ ...userObject }, { where: { id: req.params.id } });
    })
    .then(user => {

      return user.save();
    })
    .then(() => {
      
      return res.status(200).json({ message: "Votre profil a bien été mis à jour" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })
};

// METTRE A JOUR sa photo de profil

exports.updateProfilePicture = (req, res) => {
  console.log("req.params.id", req.params.id);

  if (req.params.id !== req.auth) {
    
    return res.status(403).json({ message: "Requête non autorisée" });
  }

  sequelize.models.User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (user.profileImageUrl != null) {
        const picToBeDeleted = user.profileImageUrl.split('/images')[1];
        
        user.update({ profileImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, { where: { id: req.params.id } })
          .then(() => {
            fs.unlink(`images/${picToBeDeleted}`, (err) => {
              if (err) {
                  console.error(err);
              }
            })
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Oh oh" })
          })

        return user;

      } else {

        return user.update({ profileImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, { where: { id: req.params.id } });
      }
    })
    .then(() => {
      
      return res.status(200).json({ message: "Votre nouvelle photo de profil a bien été sauvegardée" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })

};

// METTRE A JOUR son mot de passe
exports.updatePassword = (req, res) => {
  console.log("req.params.id", req.params.id);

  if (req.params.id !== req.auth) {
    
    return res.status(403).json({ message: "Requête non autorisée" });
  }

  bcrypt.hash(req.body.currentPassword, 10)
    .then(hashCurrentPassword => {
      console.log("Mot de passe actuel (currentPassword) :", req.body.currentPassword)
      
      return hashCurrentPassword;
    })
    .then(currentPassword => {
      sequelize.models.User.findOne({ where: { id: req.params.id } })
        .then(user => {
          console.log("Hash currentPassword :", currentPassword);
          console.log("Hash mot de passe actuel (user.password) :", user.password);

          return bcrypt.compare(currentPassword, user.password);
        })
        .then(valid => {
          if (!valid) {
            console.log(valid);

            return res.status(401).json({ message: "Le mot de passe renseigné est incorrect" })
          }

          return res.status(200).json({ message: "Mot de passe OK" });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: "Oh oh - problème hash currentPassword 2" });
        })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Oh oh - problème hash currentPassword 1" });
    })

};

// SUPPRIMER son profil
exports.deleteAccount = (req, res) => {
  console.log("req.body.id", req.body.id);
  console.log("req.params.id", req.params.id);


  if (req.body.id !== req.params.id || req.body.id !== req.auth) {

    return res.status(403).json({message: "Requête non autorisée"});
  }

  sequelize.models.User.destroy({ where: { 
    id: req.body.id,
    email: req.body.email 
    } 
  })
    .then(() => {
      res.status(200).json({ message : "Votre compte a bien été supprimé" })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })

};