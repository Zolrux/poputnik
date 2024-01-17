import express from 'express';
const authRouter = express.Router();
import { login, register } from '../controllers/authController.js';
import { body } from 'express-validator';

authRouter.post('/auth/register', [
	body('name').notEmpty().withMessage('Ім\'я не може бути пустим'),
	body('surname').notEmpty().withMessage('Прізвище не може бути пустим'),
	body('age').notEmpty().withMessage('Введіть коректний вік').isInt({min: 1, max: 100}).withMessage('Мінімальний вік 1, максимальний 100'),
	body('email').isEmail().withMessage('Введіть коректну електронну пошту'),
	body('password').notEmpty().withMessage('Пароль не може бути пустим').isLength({min: 6}).withMessage('Мінімальна довжина паролю 6 символів'),
], register);

authRouter.post('/auth/login', login);

export default authRouter;