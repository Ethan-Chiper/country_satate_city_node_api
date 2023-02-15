/* eslint-disable no-undef */
const countryCodes = require('country-codes-list');
const countryIsoCode = countryCodes.customList(
	'countryNameEn',
	'{countryCode}'
);
const countryCallingCode = countryCodes.customList(
	'countryNameEn',
	'{countryCallingCode}'
);
const getCountryISO3 = require('country-iso-2-to-3');
const countryModel = require('../../Database/CountrySchema').getCountryModel();
const utils = require('../../Helpers/Utils').default;
const responder = require('../../Helpers/Responder');

function controller() {
	this.createCountry = (res, data) => {
		let countryCreate = {};
		countryCreate['country_id'] = utils.getNanoId();
		countryCreate['country_Name'] = data.countryName;
		countryCreate['isoCode2'] = countryIsoCode[data.countryName];
		countryCreate['isoCode3'] = getCountryISO3(countryCreate.isoCode2);
		countryCreate['countryCodes'] = countryCallingCode[data.countryName];
		countryModel
			.create(countryCreate)
			.then((data) => {
				responder.sendSuccessData(
					res,
					'create country successfully',
					data
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					err?.message || 'Failed to create country'
				);
			});
	};

	this.getCountry = (res, data) => {
		countryModel
			.findOne(data)
			.then((read) => {
				responder.sendSuccessData(
					res,
					'find country successfully',
					read
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to find country',
					err
				);
			});
	};

	this.updateCountry = (res, data) => {
		countryModel
			.findOneAndUpdate(
				{ country_Name: data.country_Name },
				{ status: data.status },
				{ new: true }
			)
			.then((data) => {
				responder.sendSuccessData(
					res,
					'country update successfully',
					data
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to update country',
					err
				);
			});
	};
	this.updateCountry2 = (_res, data) => {
		countryModel.findOne({ country_Name: data.country_Name }, () => {
			document['status'] = deactivated;
			if (data.status !== activated) {
				document['status'] = activated;
				document.save();
			}
		});
	};

	this.deleteCountry = (res, data) => {
		countryModel
			.findOneAndRemove({ country_Name: data.countryName })
			.then((deleted) => {
				if (deleted == null)
					return Responder.sendFailureMessage(
						res,
						'Failed to found the country'
					);
				responder.sendSuccessData(
					res,
					'Delete country successfully',
					deleted
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to delete country',
					err
				);
			});
	};
	this.listCountry = (res) => {
		countryModel
			.find()
			.then((data) => {
				responder.sendSuccessData(res, 'the country list are', data);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to list country',
					err
				);
			});
	};
}

module.exports = new controller();
