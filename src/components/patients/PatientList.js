import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index.js';

class PatientList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchFilter: ''
		};	
	}

	componentWillMount() {
		this.props.fetchPatients();
	}

	isSocialWorker() {
		return this.props.currentUser && this.props.currentUser.role === 'social_worker';
	}	

	filteredPatients() {
		if (this.props.currentUser.role === 'organization') {
			return this.props.patients.filter(patient => {
				return patient.verified && patient.verified === true
			});
		} else if (this.props.currentUser.role === 'social_worker') {
			return this.props.patients.filter(patient => {
				return patient.email.includes(this.state.searchFilter)
			});
		} else {
			return this.props.patients;
		}
	}

	filterForm() {
		if (this.isSocialWorker()) {
			return (
				<div>
					<label>Search patients:</label>
					<input value={this.state.searchFilter} onChange={this.changeFilter.bind(this)} />
				</div>
			);
		}
	}

	changeFilter(event) {
		this.setState({
			searchFilter: event.target.value
		})
	}

	renderPatients() {
		if (this.props.currentUser && this.props.patients) {
			return (
				<ul className="list-group">
				{
					this.filteredPatients().map(patient => {
						return (<li className="list-group-item"><Link to={`/patients/${patient._id}`} className="well" key={patient._id}>{patient.email}</Link></li>)
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

				{this.filterForm()}

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