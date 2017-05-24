import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index.js';

class PatientProfile extends Component {
	componentDidMount() {
		this.props.fetchPatients();
		console.log(this.props.params.id);
	}

	getPatient() {
		if (this.props.patients) {
			return this.props.patients.find(patient => {
				return parseInt(patient._id) == parseInt(this.props.params.id)
			})
		}
	}

	render() {
		return (
			<div>
				<h1>Patient Profile For:</h1>

				{this.getPatient() && this.getPatient().email}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patients: state.patients.patients
	}
}


export default connect(mapStateToProps, actions)(PatientProfile);