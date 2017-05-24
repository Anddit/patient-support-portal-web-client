import {
	ADD_SOCIAL_WORKERS
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case ADD_SOCIAL_WORKERS:
			return { ...state, social_workers: action.social_workers };
	}

	return state;
}