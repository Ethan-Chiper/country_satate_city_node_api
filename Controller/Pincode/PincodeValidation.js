/* eslint-disable no-undef */
const { check } = require('express-validator');

function validation() {
    this.pincodeValidation = () => {
        return [
            check('country', 'countryfiled is empty').notEmpty(),
            check('state.state_id', 'state_id is empty').notEmpty(),
            check('state.state_name', 'state_name is empty').custom(value => {
                if (value[0].toUpperCase() === value[0]) {
                    return true;
                } throw new Error('First letter is not uppercase');
            }),
            check('city.city_id', 'city_id is empty').notEmpty(),
            check('city.city_name', 'cityName is empty').custom(value => {
                if (value[0].toUpperCase() === value[0]) {
                    return true;
                } throw new Error('First letter is not uppercase');
            }),
            check('pincode', 'pincode is empty').notEmpty()
        ];
    };
}

module.exports = new validation();
