const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/updateprofile/:id', multer, userCtrl.updateProfile);
//router.delete('/deleteaccount/:id', auth, userCtrl.deleteAccount);
router.delete('/deleteaccount2/:id', auth, userCtrl.deleteAccount2);

module.exports = router;