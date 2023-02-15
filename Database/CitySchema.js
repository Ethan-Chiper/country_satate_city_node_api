/* eslint-disable no-undef */
const dbConnection = require('./Connection');
const worldDbConnection = dbConnection.getDbConnection();

function Schema() {
	const cityDataSchema = new worldDbConnection.Schema({
		city_name: { type: String },
		city_id: { type: String, unique: true },
		state: {
			state_id: { type: String },
			state_name: { type: String }
		},
		country: {
			country_id: { type: String },
			country_name: { type: String }
		}
	});

	const city = worldDbConnection.model('city', cityDataSchema);

	this.getCityModel = function () {
		return city;
	};
}

module.exports = new Schema();
