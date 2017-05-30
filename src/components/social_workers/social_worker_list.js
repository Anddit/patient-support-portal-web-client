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
				<section className="feed">
				{
					this.props.social_workers.map((social_worker, index) => {
						return (<div className="card"><Link to={`/social_workers/${social_worker._id}`} key={index}>{social_worker.email}</Link></div>)
					})
				}
				</section>
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