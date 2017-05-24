import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/index.js';

class PatientForm extends Component {

	handleFormSubmit({email, password}) {
		// Need to do something to log user in
		this.props.updateUser({ email, password, name, indication });
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
		const { handleSubmit, fields: { email, password, name, indication }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Name:</label>
					<input {...name} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Indication:</label>
					<input {...indication} className="form-control" />
				</fieldset>
												
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}

}

function mapStateToProps(state) {
	return { errorMessage: state.patients.error };
}

export default reduxForm({
	form: 'patient',
	fields: ['email', 'password', 'name', 'indication']
}, mapStateToProps, actions)(PatientForm);