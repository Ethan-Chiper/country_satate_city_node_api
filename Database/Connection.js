/* eslint-disable no-console */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Config = require('../Helpers/Config');

function dbConnection() {
    this.createConnection = () => {
        mongoose.connect(Config.DB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(() => console.log('DB Connected'))
            .catch(error => console.log(error.message));
    };

    this.getDbConnection = () => {
        return mongoose;
    };
}

module.exports = new dbConnection();