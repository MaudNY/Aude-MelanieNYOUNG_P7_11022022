const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId.toString();
    console.log("UserId", userId);
    req.token = decodedToken;
    req.auth = userId;
    console.log("req.auth", req.auth);
    console.log("req.body.id", req.body.id);
    console.log("req.params.id", req.params.id);

    next();

  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Requête invalide !" })
  }
};