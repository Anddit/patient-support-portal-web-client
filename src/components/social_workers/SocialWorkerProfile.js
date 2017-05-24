import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index.js';

import SocialWorkerForm from './SocialWorkerForm.js';

class SocialWorkerProfile extends Component {
	componentDidMount() {
		this.props.fetchSocialWorkers();
		console.log(this.props.params.id);
		this.setState({editing: false});
	}

	getSocialWorker() {
		if (this.props.social_workers) {
			return this.props.social_workers.find(social_worker => {
				return parseInt(social_worker._id) === parseInt(this.props.params.id)
			})
		}
	}

	isOwnSocialWorker() {
		if (this.props.currentUser) {
			return this.getSocialWorker() && (this.getSocialWorker()._id === this.props.currentUser._id);
		}
	}

	editButton() {
		if (this.isOwnSocialWorker()) {
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
			return <SocialWorkerForm _id={this.getSocialWorker() && this.getSocialWorker()._id} />
		}
	}


	render() {
		return (
			<div>
				<h1>Social Worker Profile For:</h1>

				{this.getSocialWorker() && this.getSocialWorker().email}

				{this.editButton()}

				{this.showForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		social_workers: state.social_workers.social_workers,
		currentUser: state.auth.user
	}
}


export default connect(mapStateToProps, actions)(SocialWorkerProfile);