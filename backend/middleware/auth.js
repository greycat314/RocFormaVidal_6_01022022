const jwt = require('jsonwebtoken');

// We check that the TOKEN of the user corresponds to his id in the request. If yes, he will be authorized to change the corresponding data.
// Middleware to secure all routes
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		req.auth  = {userId};
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID';
		}
		else {
			next();
		}
	} 
	catch {
		res.status(401).json({
			error: new Error('Invalid request!')
		});
	}
};
