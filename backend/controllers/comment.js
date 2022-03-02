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

// SUPPRIMER l'un de ses commentaires
exports.deleteComment = (req, res) => {
    console.log("Comment ID :", req.params.id);

    sequelize.models.Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(comment => {
            console.log(comment.userId);

            if (comment.userId != req.auth) {

                return res.status(403).json({ message: "Problème d'authentification, veuillez vous reconnecter" });
            }
            comment.destroy();

            return res.status(200).json({ message: "Votre commentaire a bien été supprimé" });

        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Problème lié aux données serveur, veuillez réessayer ultérieurement." });
        })
};