/* eslint-disable no-undef */
const Exprect = require('chai').expect;

describe('sample test', function () {
	it('sample test for skip', function (done) {
		let data = 'hai';
		Exprect(data).to.be.equal('hai');
		done();
	});
});
