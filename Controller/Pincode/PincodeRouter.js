/* eslint-disable no-undef */
const app = require('express')();
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());
const { validationResult } = require('express-validator');
const pincodeValidation = require('./pincodeValidation');
const pincodeController = require('./PincodeController');

app.post(
	'/pincodeCreate',
	pincodeValidation.pincodeValidation(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send(errors.errors[0].msg);
		}
		pincodeController.createPincode(res, req.body);
	}
);

app.patch('/pincodeUpdate', (req, res) => {
	pincodeController.updatePincode(res, req.body);
});

app.delete('/pincodeDelete', (req, res) => {
	pincodeController.deletePincode(res, req.body);
});

app.get('/pincodeList', (req, res) => {
	pincodeController.listPincode(res, req.body);
});

module.exports = app;
