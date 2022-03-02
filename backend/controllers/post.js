const sequelize = require('../sequelize');

// CREER un post
exports.createPost = (req, res) => {
        
    if (req.file) {
        const content = req.body;

        sequelize.models.Post.create({
            ...content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            userId : req.token.userId,
            likesCount: 0
        })
            .then(post => {

                return res.status(201).json(post);
            })
            .catch(error => {
                console.error(error);

                return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
            })
        
    } else {
        sequelize.models.Post.create({
            content: req.body.content,
            userId : req.token.userId,
            likesCount : 0
        })
            .then(post => {

                return res.status(201).json(post);
            })
            .catch(error => {
                console.error(error);

                return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
            })
    }
    
};

// SUPPRIMER un post
exports.deletePost = (req, res) => {
    console.log("Post ID :", req.params.id);
    console.log("User ID de la personne voulant supprimer :", req.auth);

    sequelize.models.Post.findOne({
        where: {
            id: req.params.id,
            userId: req.auth
        }
    })
        .then(post => {

            if (!post) {
                console.log("La personne voulant supprimer n'est pas l'auteur")

                return res.status(403).json({ message: "Requête non autorisée" });
            } else {
                const postUserId = post.userId;
                console.log("User ID de l'auteur (via infos post) :", postUserId);

                post.destroy();

                return res.status(200).json({ message: "Votre publication a bien été supprimée" });
            }

        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
        })


};

// AFFICHER tous ses propres posts
exports.getAllMyPosts = (req, res) => {
    sequelize.models.Post.findAll({ where: {
        userId: req.auth
    }, order: [["createdAt", "DESC"]]
    })
        .then(posts => {

            return res.status(200).json(posts);
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
        })
};

// AFFICHER tous les posts (du plus récent au plus ancien)
exports.getAllPosts = (req, res) => {
    sequelize.models.Post.findAll({
        order: [["createdAt", "DESC"]]
    })
        .then(posts => {

            return res.status(200).json(posts);
        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
        })
};

// LIKER un post
exports.likePost = (req, res) => {
    sequelize.models.Post.findOne({ 
        where: { id: req.params.id } 
    })
        .then(post => {

            if (!post) {
                
                return res.status(404).json({ message: "Cette publication est introuvable" });
            } else if (req.body.like == 1) {
                post.increment({ likesCount: 1 }, { where: { id: req.params.id } });
                
                return res.status(200).json({ message: "Publication likée" });
            } else if (req.body.like == -1) {
                post.increment({ likesCount: -1 }, { where: { id: req.params.id } });
                
                return res.status(200).json({ message: "Like annulé" });
            }

        })
        .catch(error => {
            console.error(error);

            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." });
        })
};