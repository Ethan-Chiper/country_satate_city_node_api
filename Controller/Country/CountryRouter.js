const app = require('express')();
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());
const { validationResult } = require('express-validator');
const countryValidation = require('./CountryValidation');
const counrtycontroller = require('./CounrtyController').default;

app.post(
	'/countryCreate',
	countryValidation.countryValidation(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send(errors.errors[0].msg);
		}
		counrtycontroller.createCountry(res, req.body);
	}
);

app.get('/countryRead', (req, res) => {
	counrtycontroller.getCountry(res, req.body);
});

app.patch('/countryUpdate', (req, res) => {
	counrtycontroller.updateCountry(res, req.body);
});

app.patch('/countryUpdate2', (req, res) => {
	counrtycontroller.updateCountry2(res, req.body);
});

app.delete('/countryDelete', (req, res) => {
	counrtycontroller.deleteCountry(res, req.body);
});

app.get('/list', (req, res) => {
	counrtycontroller.listCountry(res, req.body);
});

module.exports = app;
