const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/createpost', auth, multer, postCtrl.createPost);
router.delete('/deletepost/:postId', auth, postCtrl.deletePost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/myposts', auth, postCtrl.getAllMyPosts);
router.post('/post/:postId/like', auth, postCtrl.likePost);

module.exports = router;