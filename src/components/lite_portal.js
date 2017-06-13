import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import * as actions from '../actions';

import Header from './header';
import Hero from './hero';

class LitePortal extends Component {
	render() {
		return (
      <div id="root-container" className="wrapper">
      	<Header fullSPA={false} />
        <Hero />
      	<div className="container">
      		<h2>Search Organizations</h2>
      	</div>
    	</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		orgs: state.organizations.organizations
	}
}

export default connect(mapStateToProps, actions)(LitePortal);