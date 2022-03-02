const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// supprimer un post
// liker un post
// consulter tous les posts du plus récent au plus ancien

router.post('/createpost', auth, multer, postCtrl.createPost);
router.delete('/deletepost/:id', auth, postCtrl.deletePost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.post('/post/:id/like', auth, postCtrl.likePost);

module.exports = router;