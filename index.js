const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());

const winston = require('winston');
const logger = winston.createLogger({
	transports: [new winston.transports.Console()]
});

require('./Database/Connection').createConnection();

app.use('/api/country', require('./Controller/Country/CountryRouter'));
app.use('/api/state', require('./Controller/State/StateRouter'));
app.use('/api/city', require('./Controller/City/CityRouter'));
app.use('/api/Pincode', require('./Controller/Pincode/PincodeRouter'));

let server = app.listen(4055, () => {
	logger.info('Server is running on: ' + server.address().port);
});

module.exports = app;
