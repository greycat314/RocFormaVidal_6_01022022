const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // Unique email

const sanitizerPlugin = require('mongoose-sanitizer');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Adresse email non correcte"]
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"],
    match: [/[0-9]{6,}/, "6 chiffres minimum"]
  },
});

userSchema.plugin(uniqueValidator);

// Purifies the model fields before saving them in the MongoDB database.
// We use the HTML Sanitizer from Google Caja
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("User", userSchema);
