import {
	ADD_PATIENTS,
	SET_PATIENT
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case ADD_PATIENTS:
			return { ...state, patients: action.patients };
		case SET_PATIENT:
			return { ...state, patient: action.patient };
	}

	return state;
}