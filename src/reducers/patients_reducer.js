import {
	ADD_PATIENTS
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case ADD_PATIENTS:
			return { ...state, patients: action.patients };
	}

	return state;
}