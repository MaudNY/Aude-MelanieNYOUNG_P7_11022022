const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

router.post('/comment/:postId', auth, commentCtrl.createComment);
router.delete('/deletecomment/:id', auth, commentCtrl.deleteComment);

module.exports = router;