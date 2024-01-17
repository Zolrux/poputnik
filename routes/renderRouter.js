import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import { getUserTrips } from '../controllers/tripsController.js';
const renderRouter = express.Router();

renderRouter.get('/', checkAuth, (req, res) => {
  res.render('../views/index', {role: res.locals.userRole || ''});
});

renderRouter.get('/auth/register', (req, res) => {
  res.render('../views/register', {errors: [], fields: {}});
});

renderRouter.get('/auth/login', (req, res) => {
  res.render('../views/login', {errors: [], fields: {}});
});

renderRouter.get('/profile/trips', checkAuth, getUserTrips, (req, res) => {
  res.render('../views/user-trips', {
	role: res.locals.userRole || '',
	trips: res.locals.trips || [],
	orders: res.locals.orders || []
});
});

export default renderRouter;