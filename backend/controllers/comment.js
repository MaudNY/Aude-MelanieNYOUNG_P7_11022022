const sequelize = require('../sequelize');

// CREER un commentaire
exports.createComment = (req, res) => {
    sequelize.models.Comment.create({
        content: req.body.content,
        userId: req.token.userId,
        postId: req.params.id
    })
        .then(comment => {
            console.log(comment);

            return res.status(201).json(comment);
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Problème lié aux données serveur, veuillez réessayer ultérieurement." });
        })
};