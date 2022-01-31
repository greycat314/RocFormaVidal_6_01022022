const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;