const passwordValidator = require('password-validator');

// More secure password
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                    // 8 characters minimum
.has().uppercase()           // At least one capital letter
.has().lowercase()          // At least a lowercase
.has().digits()                 // At least one number
.has().not().spaces()      // No spaces
.is().not().oneOf(['01234567', 'abcdefgh']); // Blacklist

module.exports = passwordSchema;