/* eslint-disable no-undef */
const { check } = require('express-validator');

function validation() {
    this.cityValidation = () => {
        return [
            check('country.country_id', 'country_id is empty'),
            check('state.state_id', 'state_id is empty').notEmpty(),
            check('state.state_name', 'stateName is empty').custom(value => {
                if (value[0].toUpperCase() === value[0]) {
                    return true;
                } throw new Error('First letter is not uppercase');
            }),
            check('city_name', 'city_name is wrong').custom(value => {
                if (value[0].toUpperCase() === value[0]) {
                    return true;
                } throw new Error('First letter is not uppercase');
            })
        ];
    };
}

module.exports = new validation();
