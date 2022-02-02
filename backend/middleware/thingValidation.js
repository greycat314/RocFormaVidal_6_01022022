const validate = require('mongoose-validator');

const regexValue = /^[a-z0-9À-ÖØ-öø-ÿ -]+$/i;
const messageValue = "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret, espace.";

module.exports.nameValidator = [   
    validate({
        validator: 'isLength',
        arguments: [3, 50], // Name: 3 to 50 characters
        message: 'Le nom de la Sauce doit contenir entre 3 and 50 caractères',
    }),

    validate({
        validator: 'matches',
        arguments: regexValue,
        message: messageValue,
    }), 
];

module.exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Le nom du fabricant doit contenir entre 3 et 40 caractères',
    }),

    validate({
        validator: 'matches',
        arguments: regexValue,
        message: messageValue,
    }),
];

module.exports.descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 200],
        message: 'La description de la sauce doit contenir entre 10 et 200 caractères',
    }),

    validate({
        validator: 'matches',
        arguments: regexValue,
        message: messageValue,
    }),
];

module.exports.pepperValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Le principal ingrédient doit contenir entre 3 et 30 caractères',
    }),

    validate({
        validator: 'isAlphanumeric', // Only alphanumeric characters
        message: "Ne peut contenir que des caractères alphanumériques entre 3 et 30 caractères",
    }),
];