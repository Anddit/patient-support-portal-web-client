import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/index.js';

class SocialWorkerForm extends Component {

	handleFormSubmit({email, name, indication}) {
		// Need to do something to log user in
		this.props.updateUser(
			this.props._id, 
			{ email, name, contact, organization },
			'social_worker'
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
		const { handleSubmit, fields: { email, name, contact, organization }} = this.props;

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
					<label>Contact Info:</label>
					<input {...contact} className="form-control" />
				</fieldset>

				<fieldset className="form-group">
					<label>Affiliated With:</label>
					<input {...organization} className="form-control" />
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
	form: 'organization',
	fields: ['email', 'name', 'contact', 'organization']
}, mapStateToProps, actions)(SocialWorkerForm);