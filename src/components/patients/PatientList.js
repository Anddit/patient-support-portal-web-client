import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatientList extends Componet {
	render() {
		return (
			<div>
				<h1>The Patient List Page</h1>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {

	}
}

export default connect(mapStateToProps)(PatientList);