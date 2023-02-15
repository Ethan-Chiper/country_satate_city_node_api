/* eslint-disable no-undef */
const dbConnection = require('./Connection');
const worldDbConnection = dbConnection.getDbConnection();

function Schema() {
	const pincodeDataSchema = new worldDbConnection.Schema({
		pincode_id: { type: String, unique: true },
		pincode: { type: Number },
		city: {
			city_name: { type: String },
			city_id: { type: String }
		},
		state: {
			state_id: { type: String },
			state_name: { type: String }
		},
		country: {
			country_id: { type: String },
			country_Name: { type: String }
		}
	});

	const pincode = worldDbConnection.model('pincode', pincodeDataSchema);

	this.getPincodeModel = function () {
		return pincode;
	};
}

module.exports = new Schema();
