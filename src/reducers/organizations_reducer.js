import { ADD_ORGS } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case ADD_ORGS:
			return { ...state, organizations: action.organizations };
	}

	return state;
}