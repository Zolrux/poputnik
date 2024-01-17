import { Trips, User, Orders } from '../database/models.js';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import sequelize from '../database/connect.js';

const formattedDate = date => {
	const dateSplit = date.split('-');
	return `${dateSplit[2]}.${dateSplit[1]}.${dateSplit[0]}`;
}

const formattedTime = time => {
	const timeSplit = time.split(':');
	return `${timeSplit[0]}:${timeSplit[1]}`;
}

const findTrips = async (req, res, next) => {

	for (const value of Object.values(req.query)) {
		if (!value) {
			return res.redirect('/');
		}
	}

	const {from, to, date, count} = req.query;

	const findedTrips = await Trips.findAll({
		where: {
			from,
			to,
			date_arrival: date,
			max_places: {
				[Op.between]: [count, sequelize.col('max_places')]
			}
		},
		include: {
			model: User,
			attributes: ['name', 'surname', 'age'],
		}
	})

	const trips = findedTrips.map(trip => trip.dataValues)
	.map(({date_arrival, time_arrival}, index, arr) => {
		const date = formattedDate(date_arrival);
		const time = formattedTime(time_arrival);
		return {...arr[index], date_arrival: date, time_arrival: time}
	});
	res.render('../views/trips', {trips, role: res.locals.userRole});
}

const createTrip = async (req, res, next) => {
	const {from, to, date, time, car, price, maxPassengers} = req.body;
	const token = req.cookies.token;
	const {id} = jwt.decode(token);

	await Trips.create({
		from,
		to,
		date_arrival: date,
		time_arrival: time,
		car,
		price,
		max_places: maxPassengers,
		places_left: maxPassengers,
		driver_id: id
	});

	res.redirect('/profile/trips');
}

const createOfferTrip = async (req, res, next) => {
	if (!res.locals.auth) {
		return res.redirect('/auth/login');
	}

	try {
		const token = req.cookies.token;
		const {id: userId, role} = jwt.decode(token);
		if (role !== 'client') {
			return res.json({notClient: true});
		}
		const {offerId, places, totalPrice, maxPlaces} = req.body;

		await Orders.create({price: totalPrice, places, trip_id: offerId, client_id: userId});
		await Trips.update({places_left: maxPlaces - places}, {where: {id: offerId}});
		
		return res.status(200).json({success: true});
	} catch (_) {
		return res.redirect('/auth/login');
	}
}

const getUserTrips = async (req, res, next) => {
	if (!res.locals.auth) {
		return res.redirect("/auth/login");
	}

	try {

		const token = req.cookies.token;
		const {id} = jwt.decode(token);

		if (res.locals.userRole === 'client') {
			let orders = await Orders.findAll({
				where: {client_id: id},
				include: {
					model: Trips,
					include: User
				}
			});

			orders = orders.map((order, index, arr) => {
				const {date_arrival, time_arrival} = order.dataValues.Trip.dataValues;
				const date = formattedDate(date_arrival);
				const time = formattedTime(time_arrival);
				return {...arr[index].dataValues, dateArrivalTrip: date, timeArrivalTrip: time}
			});

			res.locals.orders = orders;
		}
	
		if (res.locals.userRole === 'driver') {
			let trips = await Trips.findAll({
			where: {
				driver_id: id
			}
		});

			trips = trips.map(trip => trip.dataValues)
			.map(({date_arrival, time_arrival}, index, arr) => {
				const date = formattedDate(date_arrival);
				const time = formattedTime(time_arrival);
				return {...arr[index], date_arrival: date, time_arrival: time}
			});
			res.locals.trips = trips;
		}

		next();
		
	} catch (_) {
		return res.redirect('/auth/login');
	}
}


export {findTrips, createTrip, createOfferTrip, getUserTrips}