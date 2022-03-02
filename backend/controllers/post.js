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
                res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
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
                res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
              })
    }
    
};