import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	ADD_PATIENTS,
	SET_PATIENT,
	ADD_SOCIAL_WORKERS,
	ADD_ORGS,
	UPDATE_USER
} from './types';

// const ROOT_URL = 'http://localhost:3090';

const ROOT_URL = 'https://anddit-patient-support.herokuapp.com';

// when a user visits the site, check if they already have
// a valid JWT
// If so, load the user data
export function checkAuth() {
	return function(dispatch) {
		if(localStorage.getItem('token')) {
			axios.get(`${ROOT_URL}/users/current?token=${localStorage.getItem('token')}`)
				.then(({data}) => {
					dispatch({ type: AUTH_USER, user: data.user});

					browserHistory.push(`/${data.user.role}s/${data.user._id}`);
				})
				.catch(() => dispatch(authError('Something went wrong')));
		} else {
			dispatch(authError('Not logged in'));
		}
	}
}

export function signinUser({email, password}) {
	// Normally, action creators return objects,
	// but with redux-thunk, can return a function
	// to get direct access to the Dispatch method
	// so that we can forward stuff to ALL the reducers
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(({data}) => {
				// If request is good...
				// - UPdate state to indicate user is authenticated
				dispatch({ type: AUTH_USER, user: data.user });

				// - Save the JWT
				localStorage.setItem('token', data.token);

				// - redirect to the user's profile page
				browserHistory.push(`/${data.user.role}s/${data.user._id}`);
			})
			.catch(() => {
				// If request is bad...
				// - show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	}
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				dispatch({type: AUTH_USER});
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/patients');
			})
			.catch(response => {
				dispatch(authError(response.response.data.error));
			});
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	}
}

export function fetchPatients() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/patients`)
			.then(({data}) => {
				dispatch({type: ADD_PATIENTS, patients: data.patients})
			})
			.catch(response => dispatch(authError(response.response.data.error)));
	}
}

export function fetchPatient(id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/patients/${id}`)
			.then(({data}) => {
				dispatch({type: SET_PATIENT, patient: data.patient})
			})
			.catch(response => dispatch(authError(response.response.data.error)));
	}
}

export function fetchSocialWorkers() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/social_workers`)
			.then(({data}) => {
				dispatch({type: ADD_SOCIAL_WORKERS, social_workers: data.social_workers})
			})
			.catch(response => dispatch(authError(response.response.data.error)));
	}
}

export function fetchOrganizations() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/organizations`)
			.then(({data}) => {
				dispatch({type: ADD_ORGS, organizations: data.organizations})
			})
			.catch(response => dispatch(authError(response.response.data.error)));			
	}
}

export function updateUser(userId, userData, userType='patient') {
	return function(dispatch) {
		// Submit email/password to the server
		axios.patch(`${ROOT_URL}/${userType}s/${userId}`, userData)
			.then(response => {
				browserHistory.push(`/${userType}s`);
			})
			.catch(() => {
				// If request is bad...
				// - show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	}
}