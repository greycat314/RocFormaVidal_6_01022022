const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require("../controllers/stuffCtrl");
const multer = require('../middleware/multer-config');

router.post('/', auth, multer,stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Manage the like and the dislike
// Sets the "I like" status for a user ID. I like = 1: the user likes the sauce. I lke = 0: the user cancels the like or dislike. I lke = -1: the user does not like the sauce.
// A user can only like or dislike a sauce once. View usersLiked or usersDisliked keys in the Mongoose database
router.post('/:id/like', auth, stuffCtrl.likeDislike)

module.exports = router;
