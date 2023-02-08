/* eslint-disable no-undef */
const dbConnection = require('./Connection');
const worldDbConnection = dbConnection.getDbConnection();

function Schema() {
    const countryDataSchema = new worldDbConnection.Schema({
        'country_id': { type: String, unique: true },
        'country_Name': { type: String },
        'isoCode2': { type: String },
        'isoCode3': { type: String },
        'countryCodes': { type: String },
        'status': { type: String, enum: ['active', 'inactive', 'waiting'], default: 'waiting' }
    });

    const country = worldDbConnection.model('country', countryDataSchema);

    this.getCountryModel = function () {
        return country;
    };
}

module.exports = new Schema();

