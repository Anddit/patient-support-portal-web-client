import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
	renderLinks() {
		if (this.props.authenticated) {
			return <li className="nav-item">
				<Link className="nav-link" to="/signout">Sign Out</Link>
			</li>	
		}	else {
			return [
				<li className="nav-item" key={1}>
					<Link className="nav-link" to="/signin">Sign in</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link className="nav-link" to="/signup">Sign up</Link>
				</li>
			];
		}
	}

	renderUserInfo() {
		if (this.props.user) {
			return (
				<li className="nav-item">
					<span className={this.props.user.role}>Signed in as {this.props.user.role}</span>
				</li>
			);
		}
	}

	render() {
		return (
			<nav className="navbar navbar-right">
				<ul className="nav navbar-nav">
					<Link to="/" className="navbar-brand">Anddit Patient Support</Link>
					{this.renderUserInfo()}
					<li className="nav-item"><Link to="/social_workers">Social Workers</Link></li>
					<li className="nav-item"><Link to="/organizations">organizations</Link></li>
					{this.renderLinks()}
				</ul>
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

export default connect(mapStateToProps)(Header);