const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');
//const role = require('../middleware/role');

router.post('/comment/:id', auth, commentCtrl.createComment);
router.delete('/deletecomment/:id', auth, /*role(["admin", "moderator"]),*/ commentCtrl.deleteComment);

module.exports = router;