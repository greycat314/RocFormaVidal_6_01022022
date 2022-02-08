const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

// Dictionary of MIME types to define the format of images. Adds the correct extension to the created objet.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Save the name of the uploaded image into an array. If his validation failed, she will be deleted
// If the validation succeeds, empty the array. See controllers/stuffCtrl.js file
const uploadedImg = [];

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },  
  filename: (req, file, callback) => {
    
    // const name = file.originalname.split(' ').join('_');
    // name : original name --> Insert underscores instead of spaces.
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const newName = name.split('.')[0] + "_" + uuidv4() + "." + extension;

    uploadedImg.unshift(newName);

  // Remove second image from array
  fs.unlink("images/" + uploadedImg[1], (err => {
    if (err) console.log(err);
    else {
      console.log("\nImage deleted");
    }
  }));
    callback(null, newName);
  }
});

// We pass the storage object, the single method (single file) and we specify that it is an image
module.exports = multer({storage: storage}).single('image');
