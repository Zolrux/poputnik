import sequelize from './connect.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('Users', {
	id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: DataTypes.STRING(50), allowNull: false},
	surname: {type: DataTypes.STRING(75), allowNull: false},
	age: {type: DataTypes.INTEGER(3), allowNull: false},
	email: {type: DataTypes.STRING, unique: true, allowNull: false},
	password: {type: DataTypes.STRING, allowNull: false},
	role: {type: DataTypes.ENUM('client', 'driver'), defaultValue: 'client'}
});

const Trips = sequelize.define('Trips', {
	id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
	from: {type: DataTypes.STRING(75), allowNull: false},
	to: {type: DataTypes.STRING(75), allowNull: false},
	date_arrival: {type: DataTypes.DATEONLY, allowNull: false},
	time_arrival: {type: DataTypes.TIME, allowNull: false},
	car: {type: DataTypes.STRING(100), allowNull: false},
	price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
	max_places: {type: DataTypes.INTEGER(3), allowNull: false},
	places_left: {type: DataTypes.INTEGER(3), allowNull: false}
})

const Orders = sequelize.define('Orders', {
	id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
	price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
	places: {type: DataTypes.INTEGER(3), allowNull: false},
})

Trips.belongsTo(User, {foreignKey: 'driver_id'});
Orders.belongsTo(Trips, {foreignKey: 'trip_id'});
Orders.belongsTo(User, {foreignKey: 'client_id'});

export {User, Trips, Orders};