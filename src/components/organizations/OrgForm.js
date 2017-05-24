import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/index.js';

class OrgForm extends Component {

	handleFormSubmit({email, name, indication}) {
		// Need to do something to log user in
		this.props.updateUser(
			this.props._id, 
			{ email, name, contact, website, description, indications_served, services },
			'organization'
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
		const { handleSubmit, fields: { email, name, contact, website, description, indications_served, services }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Name:</label>
					<input {...name} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Name:</label>
					<input {...contact} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Name:</label>
					<input {...website} className="form-control" />
				</fieldset>							

				<fieldset className="form-group">
					<label>Description:</label>
					<textarea {...description} className="form-control"></textarea>
				</fieldset>

				<fieldset className="form-group">
					<label>Indications Served:</label>
					<textarea {...indications_served} className="form-control"></textarea>
				</fieldset>

				<fieldset className="form-group">
					<label>Indications Served:</label>
					<textarea {...services} className="form-control"></textarea>
				</fieldset>				
												
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
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
	form: 'organization',
	fields: ['email', 'name', 'contact', 'website', 'description', 'indications_served', 'services']
}, mapStateToProps, actions)(OrgForm);