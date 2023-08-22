import { User } from 'src/shared.types';
import { UsersAction } from './actions';
import { UsersActionTypes } from './types';

const initUsersState = {} as User;

function usersReducer(state = initUsersState, action: UsersAction) {
	switch (action.type) {
		case UsersActionTypes.LOGIN:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return action.payload;
		case UsersActionTypes.LOGOUT:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return action.payload;
		default:
			return state;
	}
}

export { initUsersState, usersReducer };
