const sequelize = require('../sequelize');
const jwt = require('jsonwebtoken');

// CREER un post
exports.createPost = (req, res) => {
    const postObject = req.body;
    console.log("postObject :", req.body.postObject);
    
    if (req.body.file) {
        
    } else {
        sequelize.models.Post.create({
            content: req.body.content,
            userId : req.token.userId,
            likesCount : 0
        })
            .then(post => {

                return res.status(200).json(post);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: "Erreur serveur, veuillez réessayer dans quelques minutes." })
              })
    }
    
};