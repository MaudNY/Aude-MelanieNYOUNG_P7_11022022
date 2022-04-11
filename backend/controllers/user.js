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
        lastName: req.body.lastName,
        role: "user"
      })
      user.save()
        .then(() => res.status(201).json({ message: "Félicitations ! Votre compte a été créé." }))
        .catch(error => {
          console.error(error);
          res.status(400).json(error);
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
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
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

      return res.status(200).json(user);
    })
    .catch(error => {
      console.error(error);

      return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
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
      if (user.profileImageUrl !== null) {
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
            res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
          })

        return user.profileImageUrl;

      } else {
        user.update({ profileImageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, { where: { id: req.params.id } });

        return user.profileImageUrl;
      }
    })
    .then(newProfilePic => {
      
      return res.status(200).json({ 
        message: "Votre nouvelle photo de profil a bien été sauvegardée",
        profileImageUrl: newProfilePic
     });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
    })

};

// SUPPRIMER son profil
exports.deleteAccount = (req, res) => {
  console.log("req.params.id", req.params.id);


  if (req.params.id !== req.auth) {

    return res.status(403).json({message: "Requête non autorisée"});
  }

  sequelize.models.User.findOne({ where: { id: req.auth } })
    .then(user => {

      if (user.profileImageUrl !== null) {
        const picToBeDeleted = user.profileImageUrl.split('/images')[1];

        fs.unlink(`images/${picToBeDeleted}`, (error) => {
          if (error) {
            console.error(error);
          }
        })
      }

      return sequelize.models.User.destroy({ where: { 
        email: req.body.email 
        } 
      });

    })
    .then(() => {
      res.status(200).json({ message : "Votre compte a bien été supprimé" })
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: "L'addresse email est incorrecte." })
    })
};

// OBTENIR LA LISTE DE TOUS LES UTILISATEURS
exports.getAllUsers = (req, res) => {
  sequelize.models.User.findAll()
    .then(users => {

      return res.status(200).json(users);
    })
    .catch(error => {
        console.error(error);

        return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
    })
};