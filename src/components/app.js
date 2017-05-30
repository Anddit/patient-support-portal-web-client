import React, { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div id="root-container" class="wrapper">
      	<Header />
      	<div>
      		{this.props.children}
      	</div>
    	</div>
    );
  }
}
