import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions';

class Header extends Component {

	componentWillMount() {
		this.props.checkAuth();
	}

	renderLinks() {
		if (this.props.authenticated) {
			return <Link className="nav-link" to="/signout">Sign Out</Link>
		}	else {
			return [
				<Link className="nav-link" to="/signin" key={1}>Sign in</Link>,
				<Link className="nav-link" to="/signup" key={2}>Sign up</Link>
			];
		}
	}

	renderUserInfo() {
		if (this.props.user) {
			return (
				<span className={this.props.user.role}>Signed in as {this.props.user.role}</span>
			)
		}
	}

	render() {
		return (
			<nav className="nav small-caps">
				<ul className="">
					<Link to="/" className="">Anddit Patient Support</Link>
					{this.renderUserInfo()}
				</ul>
				<Link to="/patients">Patients</Link>				
				<Link to="/social_workers">Social Workers</Link>
				<Link to="/organizations">Organizations</Link>
				{this.renderLinks()}				
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		user: state.auth.user
	};
}

export default connect(mapStateToProps, actions)(Header);