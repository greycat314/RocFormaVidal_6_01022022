const Thing = require("../models/thing");
// Node 'file system' module. Create and manage files to store or read information
const fs = require('fs');

// ==================== Create a new thing ====================
exports.createThing = (req, res, next) => {
	const thingObject = JSON.parse(req.body.sauce);
	// console.log(thingObject);
	const thing = new Thing({
		...thingObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // Dynamic image url
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: []
	})

	thing.save()
		.then(() => res.status(201).json({ message: "Object saved." }))
		.catch(error => {
			// Function to show form input errors in console
			const formInputErrors = require("../modules/formInputErrors");
			// console.log(thing);
			formInputErrors.getErrors(error);
			res.status(400).json({ error });
		});
};

// ==================== Find all things ====================
exports.getAllThings = (req, res, next) => {
	Thing.find()
		.then(things => res.status(200).json(things))
		.catch(error => res.status(400).json({error}));
};

// ==================== Find one thing ====================
exports.getOneThing = (req, res, next) => {
	Thing.findOne({_id: req.params.id})
		.then(thing => res.status(200).json(thing))
		.catch(error => res.status(404).json({error}));
};

// ==================== Modificate a thing ====================
exports.modifyThing = (req, res, next) => {
	const thingObject = req.file ? {
		...JSON.parse(req.body.thing),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

	Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Object modified.'}))
		.catch(error => res.status(400).json({ error }));
};

// ==================== Delete a thing ====================
exports.deleteThing = (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
    .then(thing => {
		const filename = thing.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			Thing.deleteOne({ _id: req.params.id })
				.then(() => res.status(200).json({ message: 'Object deleted.'}))
				.catch(error => res.status(400).json({ error }));
		});
    })
    .catch(error => res.status(500).json({ error }));
};

// ==================== Like or Dislike a thing ====================
exports.likeDislike = (req, res, next) => {
	let like = req.body.like // Like in the body
	let userId = req.body.userId
	let thingId = req.params.id

	if (like === 1) {
		Thing.updateOne(
			{_id: thingId},
			{	// Push the user and increment the counter by 1
				$push: { usersLiked: userId },
				$inc: { likes: +1 },
			}
		)
		.then(() => res.status(200).json({ message: 'I like added' }))
		.catch((error) => res.status(400).json({ error }))
	}

	if (like === -1) { // For a dislike
		Thing.updateOne(
			{ _id: thingId },
			{
				$push: { usersDisliked: userId },
				$inc: { dislikes: +1 },
			}
		)
		.then(() => res.status(200).json({ message: 'I dislike added' }))
		.catch((error) => res.status(400).json({ error }))
	}

	if (like === 0) { // Delete a like or dislike
		Thing.findOne({ _id: thingId })
		.then((thing) => {
			// Delete a like
			if (thing.usersLiked.includes(userId)) {
				Thing.updateOne(
					{ _id: thingId },
					{
						$pull: { usersLiked: userId },
						$inc: { likes: -1 },
					}
				)
				.then(() => res.status(200).json({ message: 'I like removed' }))
				.catch((error) => res.status(400).json({ error }))
			}
			// Delete a dislike
			if (thing.usersDisliked.includes(userId)) {
				Thing.updateOne(
					{ _id: thingId },
					{
						$pull: { usersDisliked: userId },
						$inc: { dislikes: -1 },
					}
				)
				.then(() => res.status(200).json({ message: 'I dislike removed' }))
				.catch((error) => res.status(400).json({ error }))
			}
		})
		.catch((error) => res.status(404).json({ error }))
	}
}