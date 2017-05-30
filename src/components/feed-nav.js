import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FeedNav extends Component {
	render() {
		return (
			<nav className="feed-filter">
				<ul className="small-caps">
					<li><Link to="/patients">Patients</Link></li>
					<li><Link to="/social_workers">Social Workers</Link></li>
					<li><Link to="/organizations">Organizations</Link></li>
				</ul>
			</nav>
		);
	}
}

export default FeedNav;