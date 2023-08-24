import { TUser } from 'src/shared.types';
import { Login, Logout } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const initUsersState = {
	value: JSON.parse(localStorage.getItem('user')),
} as { value: TUser };

const usersReducer = createReducer(initUsersState, (builder) => {
	builder
		.addCase(Login, (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload));
			state.value = action.payload;
		})
		.addCase(Logout, (state) => {
			const logoutUser: TUser = {
				email: '',
				name: '',
				token: '',
				isAuth: false,
			};
			localStorage.removeItem('user');
			state.value = logoutUser;
		});
});

export { initUsersState, usersReducer };
