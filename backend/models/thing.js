const mongoose = require("mongoose");
const  sanitizerPlugin = require("mongoose-sanitizer");

// Model Validation (middleware)
// const thingValidation = require('../middleware/thingValidation');

const regex = /^[a-z0-9À-ÖØ-öø-ÿ -]{3,15}$/i;
const message = "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret et espace. Nombre : 3 à 15.";
const regexManufacturer = /^[a-z0-9À-ÖØ-öø-ÿ -]{3,50}$/i;
const messageManufacturer = "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret et espace. Nombre : 3 à 50.";
const regexDescription = /^.{3,200}$/is;
const messageDescription = "Caractères autorisées : tous plus espace et saut de ligne. Nombre : 3 à 200.";
const regexMainPepper = /^[a-z0-9À-ÖØ-öø-ÿ ,'-]{3,50}$/i;
const messageMainPepper = "Caractères autorisées : lettres, lettres accentuées, chiffres, virgule, apostrophe, tiret et espace. Nombre : 3 à 50.";

const thingSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true
	},

	name: {
		type: String,
		trim: true,
		match: [regex, "name - " + message],
		required: true
	},

	manufacturer: {
		type: String,
		trim: true,
		match: [regexManufacturer, "manufacturer - " + messageManufacturer],
		required: true
	},

	description: {
		type: String,
		trim: true,
		match: [regexDescription, "description - " + messageDescription],
		required: true
	},

	heat: {
		type: Number,
	},

	likes: {
		type: Number
	},

	dislikes: {
		type: Number
	},

	imageUrl: {
		type: String,
		trim: true,
		required: true
	},
	
	mainPepper: {
		type: String,
		trim: true,
		match: [regexMainPepper, "mainPepper - " + messageMainPepper],
		required: true
	},

	usersLiked: {
		type: [String]
	},

	usersDisliked: {
		type: [String]
	}
});

// Uses Google Caja's HTML Sanitizer to perform disinfection
thingSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("Thing", thingSchema);