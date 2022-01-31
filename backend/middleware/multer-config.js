const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

// Dictionary of MIME types to define the format of images. Adds the correct extension to the created objet.
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
    
    // const name = file.originalname.split(' ').join('_');
    // name : original name --> Insert underscores instead of spaces.
    const name = file.originalname.split(' ').join('_');
    const newName = name.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    // uuid : Universally unique identifier
    callback(null, newName + "_" + uuidv4() + "." + extension);
  }
});

// We pass the storage object, the single method (single file) and we specify that it is an image
module.exports = multer({storage: storage}).single('image');