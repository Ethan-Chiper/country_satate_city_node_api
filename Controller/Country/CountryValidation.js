/* eslint-disable no-undef */
const { check } = require('express-validator');
function validation() {
	this.countryValidation = () => {
		return [check('countryName', 'countryName is empty').notEmpty()];
	};
}

module.exports = new validation();
