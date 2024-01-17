import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		res.locals.auth = false;
		return next();
	}
	const validToken = jwt.verify(token, process.env.SECRET_KEY);
	if (!validToken) {
		res.locals.auth = false;
		return next();
	}

	const {role} = jwt.decode(token);

	res.locals.auth = true;
	res.locals.userRole = role;
	next();
}

export default checkAuth;