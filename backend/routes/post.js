const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/createpost', auth, multer, postCtrl.createPost);
router.delete('/deletepost/:id', auth, postCtrl.deletePost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/myposts', auth, postCtrl.getAllMyPosts);
router.post('/post/:id/like', auth, postCtrl.likePost);

module.exports = router;