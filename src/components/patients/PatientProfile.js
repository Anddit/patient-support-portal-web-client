import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index.js';

import PatientForm from './PatientForm.js';

class PatientProfile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editing: false,
		}
	}

	componentWillMount() {
		this.props.fetchPatients();

		this.props.fetchPatient(this.props.params.id);

	}

	getPatient() {
		if (this.props.patient) {
			return this.props.patient;
		}
	}

	isOrg() {
		return this.props.currentUser && this.props.currentUser.role === 'organization';
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

	offerServiceButton() {
		if (this.isOrg()) {
			return (
				<button className="btn mint">
					Offer Services
				</button>
			);
		}
	}

	editButton() {
		if (this.props.currentUser) {
			if (this.getPatient() && this.getPatient()._id === this.props.currentUser._id) {
				return (
					<button className="btn mint" onClick={this.toggleEdit.bind(this)}>
						Edit Profile
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

	servicesHistory() {
		if (this.getPatient() && this.getPatient().name === "Prateek Vasireddy") {
			return (
				<div>
					<h3>This patient has been offered services by these organizations:</h3>

					<ul>
						<li className="alert alert-success">KBI Biopharma: Accepted!</li>
						<li>Anddit: Pending</li>
					</ul>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h1>Patient Profile For:</h1>

				{this.getPatient() && this.getPatient().email}

				<br />

				<p>Name: {this.getPatient() && this.getPatient().name}</p>

				{this.editButton()} {this.verifyButton()}

				{this.servicesHistory()}

				{this.showForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patients: state.patients.patients,
		patient: state.patients.patient,
		currentUser: state.auth.user
	}
}


export default connect(mapStateToProps, actions)(PatientProfile);