import React, { Component } from 'react';

import Header from './header';
import Hero from './hero';
import FeedNav from './feed-nav';

export default class App extends Component {
  render() {
    return (
      <div id="root-container" className="wrapper">
      	<Header fullSPA={true} />
        <Hero />
      	<div className="container">
          <FeedNav />
      		{this.props.children}
      	</div>
    	</div>
    );
  }
}
