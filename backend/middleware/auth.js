const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId.toString();
    console.log(userId);
    req.token = decodedToken;
    req.auth = userId;
    console.log(req.auth);

    if (req.body.id && req.body.id !== userId) {
      console.log(req.body.id);
      console.log(userId);
      res.status(401).json({ message: "Requête invalide !" })
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: "Requête invalide !" })
  }
};