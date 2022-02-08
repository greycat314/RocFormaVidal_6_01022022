const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // Unique email

const sanitizerPlugin = require('mongoose-sanitizer');

const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i;
const messageEmail = "Adresse email incorrecte";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true, // One email for one person 
    required: [true, "Veuillez entrer votre adresse email"],  
    match: [regexEmail, "email - " + messageEmail]
  },

  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"],
  },
});

// mongoose-unique-validator is a plugin that checks that the email is unique
userSchema.plugin(uniqueValidator);

// Purifies the model fields before saving them in the MongoDB database.
// We use the HTML Sanitizer from Google Caja
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("User", userSchema);
