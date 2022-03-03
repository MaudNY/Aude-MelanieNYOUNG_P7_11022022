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

// SUPPRIMER un commentaire
exports.deleteComment = (req, res) => {
    console.log("Comment ID :", req.params.id);

    sequelize.models.User.findOne({
        where: {
            id: req.auth
        }
    })
        .then(user => {
            console.log("Rôle du user authentifié :", user.role);

            if (user.role === "admin", "moderator" || user.id === req.auth) {
                sequelize.models.Comment.findOne({
                    where: { id: req.params.id }
                })
                    .then(comment => {
                        comment.destroy();

                        return res.status(200).json({ message: "Ce commentaire a bien été supprimé" });
                    })
                    .catch(error => {
                        console.error(error);
            
                        return res.status(404).json({ message: "Commentaire introuvable" });
                    })
            } else {
                console.log("La personne voulant supprimer n'est pas l'auteur du commentaire")

                return res.status(403).json({ message: "Requête non autorisée" });
            }
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
        })
        
};