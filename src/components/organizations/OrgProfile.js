import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index.js';

import OrgForm from './OrgForm.js';

class OrgProfile extends Component {
	componentDidMount() {
		this.props.fetchOrganizations();
		console.log(this.props.params.id);
		this.setState({editing: false});
	}

	getOrg() {
		if (this.props.organizations) {
			return this.props.organizations.find(organization => {
				return parseInt(organization._id) === parseInt(this.props.params.id)
			})
		}
	}

	isOwnOrg() {
		if (this.props.currentUser) {
			return this.getOrg() && (this.getOrg()._id === this.props.currentUser._id);
		}
	}

	editButton() {
		if (this.isOwnOrg()) {
			return (
				<button className="btn btn-primary" onClick={this.toggleEdit.bind(this)}>
					Edit
				</button>
			);
		}
	}

	toggleEdit() {
		let oldEditing = this.state.editing;

		this.setState({
			editing: !oldEditing
		});
	}

	showForm() {
		if (this.state && this.state.editing)
		{
			return <OrgForm _id={this.getOrg() && this.getOrg()._id} />
		}
	}


	render() {
		return (
			<div>
				<h1>Patient Profile For:</h1>

				{this.getOrg() && this.getOrg().email}

				{this.editButton()}

				{this.showForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patients: state.organizations.organizations,
		currentUser: state.auth.user
	}
}


export default connect(mapStateToProps, actions)(OrgProfile);