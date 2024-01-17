import jwt from 'jsonwebtoken';

const checkRole = role => {
	return (req, res, next) => {
		if (!res.locals.auth) {
			return res.redirect('/auth/login');
		}

		try {
			
			const token = req.cookies.token;
			const validToken = jwt.verify(token, process.env.SECRET_KEY);
			
			if (!token || !validToken) {
				return res.redirect('/');
			}

			const {role: userRole} = jwt.decode(token);

			if (role !== userRole) {
				return res.redirect('/');
			}

			next();
			
		} catch (error) {
			return res.redirect('/');
		}

	}
}

export default checkRole;