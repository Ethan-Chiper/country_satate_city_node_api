/* eslint-disable no-undef */
const dbConnection = require('./Connection');
const worldDbConnection = dbConnection.getDbConnection();

function Schema() {
    const stateDataSchema = new worldDbConnection.Schema({
        'state_name': { type: String },
        'state_id': { type: String, unique: true },
        'country': {
            'id': { type: String },
            'name': { type: String }
        }
    });

    const state = worldDbConnection.model('state', stateDataSchema);

    this.getstateModel = function () {
        return state;
    };
}


module.exports = new Schema();
