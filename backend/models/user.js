const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Unique email

const userSchema = mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Adresse email non correcte"]
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

