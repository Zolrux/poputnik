import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/roleMiddleware.js';
import { createTrip, findTrips, createOfferTrip } from '../controllers/tripsController.js';
const tripsRouter = express.Router();

tripsRouter.get('/trips', checkAuth, findTrips);
tripsRouter.post('/create-trip', checkAuth, checkRole('driver'), createTrip);
tripsRouter.put('/offer/create', checkAuth, createOfferTrip);

export default tripsRouter;