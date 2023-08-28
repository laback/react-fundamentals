import { TUser } from 'src/shared.types';
import { GetUser, Login, Logout } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const initUsersState = {
	value: {
		email: '',
		name: '',
		token: '',
		role: '',
		isAuth: false,
	},
	isLoaded: false,
	isLoggedIn: false,
} as { value: TUser | string[]; isLoaded: boolean; isLoggedIn: boolean };

const usersReducer = createReducer(initUsersState, (builder) => {
	builder
		.addCase(Login.fulfilled, (state, action) => {
			localStorage.setItem('token', (action.payload as TUser).token);
			state = {
				value: { ...action.payload, isAuth: true },
				isLoggedIn: true,
				isLoaded: false,
			};
			return state;
		})
		.addCase(Logout.fulfilled, (state: typeof initUsersState) => {
			localStorage.removeItem('token');
			state = {
				value: { ...initUsersState.value },
				isLoaded: false,
				isLoggedIn: false,
			};
			return state;
		})
		.addCase(GetUser.fulfilled, (state: typeof initUsersState, payload) => {
			state = {
				value: { ...state.value, ...payload.payload },
				isLoaded: true,
				isLoggedIn: true,
			};
			return state;
		});
});

export { initUsersState, usersReducer };
