const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/createpost', auth, multer, postCtrl.createPost);
router.delete('/deletepost/:postId', auth, postCtrl.deletePost);
router.get('/post/:postId', auth, postCtrl.getOnePost);
router.get('/home', auth, postCtrl.getAllPosts);
router.get('/myposts', auth, postCtrl.getAllMyPosts);

module.exports = router;