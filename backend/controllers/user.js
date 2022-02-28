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
  console.log("req.params.id", req.params.id);
  console.log("req.auth", req.auth);

  if (req.params.id !== req.auth) {
    res.status(403).json({message: "Requête non autorisée"})

    return;
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
      res.status(200).json({ message: "Votre profil a bien été mis à jour" })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
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