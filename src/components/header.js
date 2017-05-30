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
			return <Link className="btn mint sm" to="/signout">Sign Out</Link>
		}	else {
			return [
				<Link className="btn mint sm" to="/signin" key={1}>Sign in</Link>,
				<Link className="btn mint sm" to="/signup" key={2}>Sign up</Link>
			];
		}
	}

	renderUserInfo() {
		if (this.props.user) {
			return (
				<li className={this.props.user.role}>Signed in as {this.props.user.role}</li>
			)
		}
	}

	render() {
		return (
			<header className="header">
				<p className="logo">
					<Link to="/" id="logoBtn">Anddit Patient Support</Link>
				</p>
				<nav className="nav small-caps">
					<ul className="center">
						{this.renderUserInfo()}
					</ul>			
				</nav>
				<div className="right">
					{this.renderLinks()}
				</div>
			</header>
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