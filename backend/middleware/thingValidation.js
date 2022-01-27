const validate = require('../mongoose-validator'); // Appel du plugin mongoose-validator

const regexValue = "/^[a-z0-9À-ÖØ-öø-ÿ -]+$/i"
const messageValue = "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret. Les espaces successifs seront remplacé par un seul espace."
exports.nameValidator = [   
    validate({
        validator: 'isLength',
        arguments: [3, 60], // Name: 3 to 50 characters
        message: 'Le nom de la Sauce doit contenir entre 3 and 60 caractères',
    }),

    validate({
        validator: 'matches',
        arguments: regexValue,
        message: messageValue,
    }),
];

exports.manufacturerValidator = [
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

exports.descriptionValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 150],
        message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
    }),

    validate({
        validator: 'matches',
        arguments: regexValue,
        message: messageValue,
    }),
];

exports.pepperValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Le principal ingrédient doit contenir entre 3 et 20 caractères',
    }),

    validate({
        validator: 'isAlphanumeric', // Only alphanumeric characters
        message: "Ne peut contenir que des caractères alphanumériques entre 3 et 20 caractères",
    }),
];