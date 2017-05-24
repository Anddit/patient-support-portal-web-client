import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import patientsReducer from './patients_reducer';
import socialWorkersReducer from './social_workers_reducer';
import orgsReducer from './organizations_reducer';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	patients: patientsReducer,
	social_workers: socialWorkersReducer,
	organizations: orgsReducer
});

export default rootReducer;
