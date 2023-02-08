/* eslint-disable no-undef */
const cityModel = require('../../Database/CitySchema').getCityModel();
const utils = require('../../Helpers/Utils').default;
const responder = require('../../Helpers/Responder');

function controller() {
	this.createCity = (res, data) => {
		let createCity = {
			city_name: data.city_name,
			city_id: utils.getNanoId(),
			state: {
				state_id: data.state.state_id,
				state_name: data.state.state_name
			},
			country: {
				country_id: data.country.country_id,
				country_name: data.country.country_name
			}
		};
		cityModel
			.create(createCity)
			.then((created) => {
				responder.sendSuccessData(
					res,
					'create city successfully',
					created
				);
			})
			.catch(() => {
				responder.sendFailureMessage(res, 'Failed to create city');
			});
	};

	this.updateCity = (res, data) => {
		cityModel.findOne({ city_id: data.city_id }).then((found_data) => {
			let update = {
				country: {
					country_id: data.country_id
						? data.country_id
						: found_data.country.country_id,
					country_name: data.country_name
						? data.country_name
						: found_data.country.country_Name
				},
				state: {
					state_name: data.state_name
						? data.state_name
						: found_data.state.state_name,
					state_id: data.state_id
						? data.state_id
						: found_data.state.state_id
				},
				city_name: data.city_name
					? data.city_name
					: found_data.city_name
			};
			cityModel
				.findOneAndUpdate({ city_id: data.city_id }, update, {
					new: true
				})
				.then((data) => {
					responder.sendSuccessData(
						res,
						'city update successfully',
						data
					);
				})
				.catch((err) => {
					responder.sendFailureMessage(res, 'Failed to update city',err);
				});
		});
	};
	
	this.deleteCity = (res, data) => {
		cityModel
			.findOneAndRemove(data)
			.then((deleted) => {
				if (deleted == null)
					return responder.sendFailureMessage(
						res,
						'Failed to found the country'
					);
				responder.sendSuccessData(
					res,
					'delete city successfully',
					deleted
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to delete city',err);
			});
	};

	this.listCity = (res) => {
		cityModel
			.find()
			.then((data) => {
				responder.sendSuccessData(res, 'city list are', data);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to list city', err);
			});
	};
}

module.exports = new controller();
