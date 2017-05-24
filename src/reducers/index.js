import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import patientsReducer from './patients_reducer';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	patients: patientsReducer
});

export default rootReducer;
