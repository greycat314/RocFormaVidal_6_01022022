const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        // return res.status(400,"8 caratères minimun").send({message: 'Mot de passe pas assez fort ! ' + passwordSchema.validate(req.body.password, {list:true})});
        res.writeHead(400, '{"message":"Mot de passe  : 8 caractères, 1 Majuscule, 1 minuscule, au minimun. Pas d\'espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect');
    } else {
        next();
    }
};