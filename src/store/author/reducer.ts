import { Author } from 'src/shared.types';
import { AuthorsAction } from './actions';
import { AuthorActionTypes } from './types';

const initAuthorsState = [] as Author[];

function authorsReducer(state = initAuthorsState, action: AuthorsAction) {
	switch (action.type) {
		case AuthorActionTypes.SAVE_AUTHORS:
			return action.payload;

		case AuthorActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
}

export { initAuthorsState, authorsReducer };
