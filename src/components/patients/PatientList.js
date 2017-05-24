import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index.js';

class PatientList extends Component {
	componentDidMount() {
		this.props.fetchPatients();
	}

	renderPatients() {
		if (this.props.patients) {
			return (
				<ul>
				{
					this.props.patients.map((patient, index) => {
						return (<li><Link to={`/patients/${patient._id}`} className="well" key={index}>{patient.email}</Link></li>)
					})
				}
				</ul>
			);
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
		patients: state.patients.patients
	}
}

export default connect(mapStateToProps, actions)(PatientList);