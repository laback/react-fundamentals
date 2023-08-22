import { UsersActionTypes } from './types.js';
import { User } from 'src/shared.types.js';

interface Login {
	type: UsersActionTypes.LOGIN;
	payload: User;
}

interface Logout {
	type: UsersActionTypes.LOGOUT;
	payload: User;
}

export type UsersAction = Login | Logout;
