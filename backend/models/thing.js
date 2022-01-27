const mongoose = require("mongoose");
const  sanitizerPlugin = require("mongoose-sanitizer");

const regexValue = "/^[a-z0-9À-ÖØ-öø-ÿ -]*$/i"
const regexMessage = "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret et espace."

const thingSchema = mongoose.Schema({
	_id: {
		type: String
	},

	userId: {
		type: String
	},

	name: {
		type: String,
		trim: true,
		// match: [regexValue, regexMessage],
		required: true
	},

	manufacturer: {
		type: String,
		trim: true,
		// match: [regexValue, regexMessage],
		required: true
	},

	description: {
		type: String,
		trim: true,
		// match: [regexValue, regexMessage],
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
		// match: [regexValue, regexMessage],
		required: true
	},
	
	mainPepper: {
		type: String,
		trim: true,
		// match: [regexValue, regexMessage],
		required: true
	},

	usersLiked: {
		type: [String]
	},

	usersDisliked: {
		type: [String]
	}
});

// Utilise le HTML Sanitizer de Google Caja pour effectuer la désinfection.
thingSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("Thing", thingSchema);

