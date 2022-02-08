const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', verifyPassword, userCtrl.signup); // New user
router.post('/login', userCtrl.login); // Checks the user and returns: userID from MongoDB and a signed JSON Web Token (with userID)

module.exports = router;
