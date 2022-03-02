const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// créer un post (avec image si besoin)
// supprimer un post
// liker un post
// consulter tous les posts du plus récent au plus ancien

router.post('/createpost', auth, multer, postCtrl.createPost);
//router.delete('/deletepost/:id', auth, postCtrl.deletePost);
//router.get('/recentposts', auth, postCtrl.getAllRecentPosts);
//router.post('/post/:id/like', auth, postCtrl.getAllRecentPosts);9

module.exports = router;