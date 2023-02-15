/* eslint-disable no-undef */
const { check } = require('express-validator');

function validation() {
	this.stateValidation = () => {
		return [
			check('country', 'countryfield is empty').notEmpty(),
			check('state_name', 'state_name is empty').custom((value) => {
				if (value[0].toUpperCase() === value[0]) {
					return true;
				}
				throw new Error('First letter is not uppercase');
			})
		];
	};
}

module.exports = new validation();
