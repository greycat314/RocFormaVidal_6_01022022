const multer = require('multer');

// Dictionary of MIME types to define the format of images. Adds the correct extension to the created objer.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // fullName : original name --> Insert underscores instead of spaces.
    // const name = file.originalname.split(' ').join('_');
    const fullName = file.originalname.split(' ').join('_');
    const name = fullName.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    // Full file name : name + underscore + unique number Date.now() + . + extension
    callback(null, name + "_" + Date.now() + "." + extension);
  }
});

// We pass the storage object, the single method (single file) and we specify that it is an image
module.exports = multer({storage: storage}).single('image');