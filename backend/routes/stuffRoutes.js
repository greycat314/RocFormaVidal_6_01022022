const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require("../controllers/stuffCtrl");
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;

