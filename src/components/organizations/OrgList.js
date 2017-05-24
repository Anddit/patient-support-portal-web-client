import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index.js';

class OrganizationList extends Component {
	componentDidMount() {
		this.props.fetchOrganizations();
	}

	renderOrganizations() {
		if (this.props.organizations) {
			return (
				<ul>
				{
					this.props.organizations.map((organization, index) => {
						return (<li><Link to={`/organizations/${organization._id}`} className="well" key={index}>{organization.email}</Link></li>)
					})
				}
				</ul>
			);
		}
	}

	render() {
		return (
			<div>
				<h1>The Organization List Page</h1>

				{this.renderOrganizations()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		organizations: state.organizations.organizations
	}
}

export default connect(mapStateToProps, actions)(OrganizationList);