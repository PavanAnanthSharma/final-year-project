const jwt = require('jsonwebtoken');

function verify_token(req, res, next) {
	const auth_header = req.get('authorization');

	if (auth_header) {
		const token = auth_header.split(' ')[1];
		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
				if (error) console.error(error);
				req.user = user;
				next();
			});
		}
		else {
			next();
		}
	}
	else {
		next();
	}
}

function verify_login_status(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		const error = new Error("You are unauthorized to visit this page");
		res.status(401);
		next(error);
	}
}

module.exports = {
	verify_token,
	verify_login_status
};