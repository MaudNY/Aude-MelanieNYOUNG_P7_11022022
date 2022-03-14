const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId.toString();
    console.log("Id de l'utilisateur authentifié :", userId);
    req.token = decodedToken;
    req.auth = userId;

    next();

  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Erreur d'authentification, veuillez vous reconnecter" })
  }
};