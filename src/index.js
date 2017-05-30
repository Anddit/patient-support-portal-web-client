import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import PatientList from './components/patients/PatientList';
import PatientProfile from './components/patients/PatientProfile';
import SocialWorkerList from './components/social_workers/social_worker_list.js';
import SocialWorkerProfile from './components/social_workers/SocialWorkerProfile';
import OrgList from './components/organizations/OrgList';
import OrgProfile from './components/organizations/OrgProfile';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

require('../style/application.scss');

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<Route path="/signin" component={Signin} />
  			<Route path="/signup" component={Signup} />  			
  			<Route path="/signout" component={Signout} />
        <Route path="/patients" component={PatientList} />
        <Route path="/patients/:id" component={PatientProfile} />
        <Route path="/social_workers" component={SocialWorkerList} />
        <Route path="/social_workers/:id" component={SocialWorkerProfile} />        
        <Route path="/organizations" component={OrgList} />
        <Route path="/organizations/:id" component={OrgProfile} />                      
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
