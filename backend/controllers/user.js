const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res) => {
  const encryptedEmail = cryptojs.SHA256(req.body.email, "SECRET_KEY").toString();
  console.log(encryptedEmail);

  bcrypt.hash(req.body.password, 20)
    .then(hash => {
      const user = User.build({
        email: encryptedEmail,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ message: 'Adresse mail déjà utilisée' }))
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur, réessayez votre inscription plus tard...' }))
};

/*exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: 'Mot de passe incorrect !' });
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
          .catch(error => res.status(500).json({ message: error }));
      })
      .catch(error => res.status(500).json({ message: error }));
  };
*/