import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/index.js';

class PatientForm extends Component {

	handleFormSubmit({email, name, indication}) {
		// Need to do something to log user in
		this.props.updateUser(
			this.props._id, 
			{ email, name, indication },
			'patient'
		);
	}


	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}


	render() {
		const { handleSubmit, fields: { email,  name, indication }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="input request-input">
					<label>Email:</label>
					<input {...email} type="text" />
				</fieldset>

				<fieldset className="input request-input">
					<label>Name:</label>
					<input {...name} type="text" />
				</fieldset>

				<fieldset>
					<label>Indication: cancer</label>
					<input {...indication} type="checkbox" />
				</fieldset>

				<fieldset>
					<label>Indication: blood disorder</label>
					<input {...indication} type="checkbox" />
				</fieldset>

				<fieldset>
					<label>Indication: illness</label>
					<input {...indication} type="checkbox" />
				</fieldset>				
												
				{this.renderAlert()}
				<button action="submit" className="btn mint">Save</button>
			</form>
		);
	}

}

function mapStateToProps(state) {
	return { 
		errorMessage: state.patients.error,
		currentUser: state.auth.user
	 };
}

export default reduxForm({
	form: 'patient',
	fields: ['email', 'name', 'indication']
}, mapStateToProps, actions)(PatientForm);