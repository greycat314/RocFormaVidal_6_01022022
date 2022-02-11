const passwordSchema = require('../models/password');

// Verifies that the password matches the validation scheme
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Mot de passe  : 8 caractères, 1 Majuscule, 1 minuscule, au minimun. Pas d\'espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Bad password');
    } else {
        next();
    }
};
