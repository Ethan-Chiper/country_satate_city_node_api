/* eslint-disable no-undef */
const app = require('express')();
let helmet = require('helmet');
app.use(helmet.hidePoweredBy());
const { validationResult } = require('express-validator');
const cityValidation = require('./cityValidation');
const cityController = require('./CityController');

app.post('/cityCreate', cityValidation.cityValidation(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors.errors[0].msg);
    }
    return cityController.createCity(res, req.body);
});

app.patch('/cityUpdate', (req, res) => {
    return cityController.updateCity(res, req.body);
});

app.delete('/cityDelete', (req, res) => {
    return cityController.deleteCity(res, req.body);
});

app.get('/cityList', (req, res) => {
    return cityController.listCity(res, req.body);
});

module.exports = app;
