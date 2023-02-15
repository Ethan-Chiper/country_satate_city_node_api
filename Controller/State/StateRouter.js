/* eslint-disable no-undef */
const app = require('express')();
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());
const { validationResult } = require('express-validator');
const stateValidation = require('./stateValidation');
const stateController = require('./StateController');

app.post('/stateCreate', stateValidation.stateValidation(), (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.send(errors.errors[0].msg);
	}
	stateController.createState(res, req.body);
});

app.get('/stateRead', (req, res) => {
	stateController.getState(res, req.body);
});

app.patch('/stateUpdate', (req, res) => {
	stateController.updateState(res, req.body);
});

app.delete('/stateDelete', (req, res) => {
	stateController.deleteState(res, req.body);
});

app.get('/stateList', (req, res) => {
	stateController.listState(res, req.body);
});

module.exports = app;
