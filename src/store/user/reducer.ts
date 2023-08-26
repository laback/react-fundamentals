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
} as { value: TUser | string[]; isLoaded: boolean };

const usersReducer = createReducer(initUsersState, (builder) => {
	builder
		.addCase(Login.fulfilled, (state, action) => {
			const user = { ...action.payload, isAuth: true };
			localStorage.setItem('token', (action.payload as TUser).token);
			state.value = user;
		})
		.addCase(Logout.fulfilled, (state) => {
			localStorage.removeItem('token');
			state.value = { ...initUsersState.value };
			state.isLoaded = false;
		})
		.addCase(GetUser.fulfilled, (state: typeof initUsersState, payload) => {
			state.isLoaded = true;
			state.value = {
				...payload.payload,
				token: localStorage.getItem('token'),
			};
		});
});

export { initUsersState, usersReducer };
