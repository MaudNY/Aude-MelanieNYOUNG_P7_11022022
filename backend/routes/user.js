const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneProfile);
router.put('/updateprofile/:id', auth, userCtrl.updateProfile);
//router.put('/updateprofilepic/:id', auth, multer, userCtrl.updateProfile);
//router.put('/updatepassword/:id', auth, userCtrl.updateProfile);
router.delete('/deleteaccount/:id', auth, userCtrl.deleteAccount);

module.exports = router;