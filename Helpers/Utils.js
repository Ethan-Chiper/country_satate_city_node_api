/* eslint-disable no-undef */
const { nanoid } = require('nanoid');

function utils() {
	this.getNanoId = () => {
		let NanoId = nanoid();
		return NanoId;
	};
}

module.exports = new utils();
