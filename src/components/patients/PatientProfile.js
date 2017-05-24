import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index.js';

import PatientForm from './PatientForm.js';

class PatientProfile extends Component {
	componentDidMount() {
		this.props.fetchPatients();
		console.log(this.props.params.id);
		this.setState({editing: false});
	}

	getPatient() {
		if (this.props.patients) {
			return this.props.patients.find(patient => {
				return parseInt(patient._id) == parseInt(this.props.params.id)
			})
		}
	}

	isSocialWorker() {
		return this.props.currentUser && this.props.currentUser.role === 'social_worker'
	}

	verifyButton() {
		if (this.isSocialWorker()) {
			return (
				<button className="btn btn-primary" onClick={this.verify.bind(this)}>
					Verify this patient
				</button>
			)
		}
	}

	verify() {
		this.props.updateUser(
			this.getPatient()._id,
			{verified: true},
			'patient'
		);
	}

	editButton() {
		if (this.props.currentUser) {
			if (this.getPatient() && this.getPatient()._id === this.props.currentUser._id) {
				return (
					<button className="btn btn-primary" onClick={this.toggleEdit.bind(this)}>
						Edit
					</button>
				);
			}
		}
	}

	toggleEdit() {
		let oldEditing = this.state.editing;

		this.setState({
			editing: !oldEditing
		});
	}

	showForm() {
		if (this.isSocialWorker() ||
				(this.state && this.state.editing)) 
		{
			return <PatientForm _id={this.getPatient() && this.getPatient()._id} />
		}
	}


	render() {
		return (
			<div>
				<h1>Patient Profile For:</h1>

				{this.getPatient() && this.getPatient().email}

				{this.editButton()} {this.verifyButton()}

				{this.showForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patients: state.patients.patients,
		currentUser: state.auth.user
	}
}


export default connect(mapStateToProps, actions)(PatientProfile);