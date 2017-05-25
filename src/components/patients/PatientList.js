import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index.js';

class PatientList extends Component {
	componentDidMount() {
		this.props.fetchPatients();
	}

	filteredPatients() {
		if (this.props.currentUser.role === 'organization') {
			return this.props.patients.filter(patient => {
				return patient.verified && patient.verified === true
			});
		} else if (this.props.currentUser.role === 'social_worker') {
			return this.props.patients;
		} else {
			return this.props.patients;
		}
	}

	renderPatients() {
		if (this.props.currentUser && this.props.patients) {
			return (
				<ul>
				{
					this.filteredPatients().map((patient, index) => {
						return (<li><Link to={`/patients/${patient._id}`} className="well" key={index}>{patient.email}</Link></li>)
					})
				}
				</ul>
			);
		} else {
			return <h1>You are not authorized to see this page</h1>
		}
	}

	render() {
		return (
			<div>
				<h1>The Patient List Page</h1>

				{this.renderPatients()}
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

export default connect(mapStateToProps, actions)(PatientList);