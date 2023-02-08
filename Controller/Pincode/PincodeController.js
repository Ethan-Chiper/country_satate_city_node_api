/* eslint-disable no-console */
/* eslint-disable no-undef */
const pincodeModel = require('../../Database/PincodeSchema').getPincodeModel();
const utils = require('../../Helpers/Utils').default;
const responder = require('../../Helpers/Responder');

function controller() {
	this.createPincode = (res, data) => {
		let pincodeCreate = {
			pincode_id: utils.getNanoId(),
			pincode: data.pincode,
			city: {
				city_id: data.city.city_id,
				city_name: data.city.city_name
			},
			state: {
				state_id: data.state.state_id,
				state_name: data.state.state_name
			},
			country: {
				country_id: data.country.country_id,
				country_Name: data.country.country_Name
			}
		};
		pincodeModel
			.create(pincodeCreate)
			.then((created) => {
				responder.sendSuccessData(
					res,
					'create pincode successfully',
					created
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to create pincode',
					err
				);
			});
	};
	this.getPincode = (res, data) => {
		pincodeModel
			.findOne(data)
			.then((data) => {
				responder.sendSuccessData(
					res,
					'find pincode successfully',
					data
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to update pincode', err);
			});
	};
	this.updatePincode = (res, data) => {
		pincodeModel
			.findOne({ pincode_id: data.pincode_id })
			.then((found_data) => {
				let update = {
					country_Name: data.country_name
						? data.country_name
						: found_data.country.country_Name,
					state: {
						state_id: data.state_id
							? data.state_id
							: found_data.state.state_id,
						state_name: data.state_name
							? data.state_name
							: found_data.state.state_name
					},
					city: {
						city_id: data.city_id
							? data.city_id
							: found_data.city.city_id,
						city_name: data.city_name
							? data.city_name
							: found_data.city.city_id
					},
					pincode: data.pincode ? data.pincode : found_data.pincode
				};
				pincodeModel
					.findOneAndUpdate({ pincode_id: data.pincode_id }, update, {
						new: true
					})
					.then((updated) => {
						responder.sendSuccessData(
							res,
							'update pincode successfully',
							updated
						);
					})
					.catch((err) => {
						responder.sendFailureMessage(
							res,
							'Failed to update pincode',err
						);
					});
			});
	};

	this.deletePincode = (res, data) => {
		pincodeModel
			.findOneAndRemove(data)
			.then((deleted) => {
				if (deleted == null)
					return Responder.sendFailureMessage(
						res,
						'Failed to found the state'
					);
				responder.sendSuccessData(
					res,
					'delete pincode successfully',
					deleted
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to delete pincode', err);
			});
	};
	this.listPincode = (res) => {
		pincodeModel
			.find()
			.then((data) => {
				responder.sendSuccessData(res, 'pincode list are', data);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to get pincode lsit',err);
			});
	};
}
module.exports = new controller();
