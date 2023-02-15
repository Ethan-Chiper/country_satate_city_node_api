/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const stateModel = require('../../Database/StateSchema').getstateModel();
const utils = require('../../Helpers/Utils').default;
const responder = require('../../Helpers/Responder');

function controller() {
	this.createState = (res, data) => {
		let stateData = {
			state_name: data.state_name,
			state_id: utils.getNanoId(),
			country: {
				id: data.country.country.id,
				name: data.country.country.name
			}
		};
		stateModel
			.create(stateData)
			.then((data) => {
				responder.sendSuccessData(
					res,
					'create state successfully',
					data
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to create state',
					err
				);
			});
	};
	this.getState = (res, data) => {
		stateModel
			.findOne(data)
			.then((read) => {
				responder.sendSuccessData(res, 'find state successfully', read);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to find state', err);
			});
	};
	this.updateState = (res, data) => {
		stateModel.findOne({ state_id: data.state_id }).then((found_data) => {
			let update = {
				country: {
					country_id: data.country_id
						? data.country_id
						: found_data.country.country_id,
					country_name: data.country_name
						? data.country_name
						: found_data.country.country_Name
				},
				state_name: data.state_name
					? data.state_name
					: found_data.state.state_name
			};
			stateModel
				.findOneAndUpdate({ state_id: data.state_id }, update, {
					new: true
				})
				.then((data) => res.send(data))
				.catch((err) => res.send(err));
		});
	};
	this.deleteState = (res, data) => {
		stateModel
			.findOneAndRemove({ state_id: data.state_id })
			.then((deleted) => {
				if (deleted == null)
					return responder.sendFailureMessage(
						res,
						'Failed to found the country'
					);
				responder.sendSuccessData(
					res,
					'delete state successfully',
					deleted
				);
			})
			.catch((err) => {
				responder.sendFailureMessage(
					res,
					'Failed to delete state',
					err
				);
			});
	};
	this.listState = (res, data) => {
		stateModel
			.find()
			.then((data) => {
				responder.sendSuccessData(res, 'The states are ', data);
			})
			.catch((err) => {
				responder.sendFailureMessage(res, 'Failed to list state');
			});
	};
}

module.exports = new controller();
