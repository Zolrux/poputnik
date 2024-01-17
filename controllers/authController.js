import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../database/models.js';
import { validationResult } from 'express-validator';

const generateJsonWebToken = payload => {
	return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'});
}

const generateCookie = (res, token) => {
	return res.cookie('token', token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24
	});
}

const register = async (req, res, next) => {

	const {name, surname, email, age, password, isDriver} = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorsMessages = errors.array().map(error => error.msg);
		return res.status(400).render('../views/register', { errors: errorsMessages, fields: {
			name,
			surname,
			email,
			password,
			isDriver: isDriver === "on" ? true : false
		}, role: res.locals.userRole })
	}

	const candidate = await User.findOne({where: {email}});
	
	if (candidate) {
		return res.status(400).render('../views/register', { errors: ['Користувач з таким email вже існує'], fields: {
			name,
			surname,
			email,
			password,
			isDriver: isDriver === "on" ? true : false
		}, role: res.locals.userRole })
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const userRole = isDriver === "on" ? 'driver' : 'client';

	const createdUser = await User.create({
		name, 
		surname, 
		age,
		email, 
		password: hashPassword,
		role: userRole
	});

	const token = generateJsonWebToken({id: createdUser.id, email, role: userRole});
	generateCookie(res, token);
	return res.redirect('/');
}

const login = async (req, res, next) => {
	const { email, password} = req.body;
	
	const candidate = await User.findOne({where: {email}});
	if (!candidate) {
		return res.status(400).render('../views/login', { errors: ['Користувача не знайдено'], fields: {
			email,
			password,
		}, role: res.locals.userRole })
	}

	const comparePassword = await bcrypt.compare(password, candidate.password);
	if (!comparePassword) {
		return res.status(400).render('../views/login', { errors: ['Пароль не вірний'], fields: {
			email
		}, role: res.locals.userRole })
	}

	const user = await User.findOne({where: {email}});

	const token = generateJsonWebToken({id: user.id, email: user.email, role: user.role});
	generateCookie(res, token);
	return res.redirect('/');
}

export {register, login}