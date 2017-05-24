import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index.js';

class SocialWorkerList extends Component {
	componentDidMount() {
		this.props.fetchSocialWorkers();
	}

	renderSocialWorkers() {
		if (this.props.social_workers) {
			return (
				<ul>
				{
					this.props.social_workers.map((social_worker, index) => {
						return (<li><Link to={`/social_workers/${social_worker._id}`} className="well" key={index}>{social_worker.email}</Link></li>)
					})
				}
				</ul>
			);
		}
	}

	render() {
		return (
			<div>
				<h1>The Social Worker List Page</h1>

				{this.renderSocialWorkers()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		social_workers: state.social_workers.social_workers
	}
}

export default connect(mapStateToProps, actions)(SocialWorkerList);