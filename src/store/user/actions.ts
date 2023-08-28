import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from 'src/shared.types.js';
import { getUser, loginUser, logoutUser } from '../services';

export const Login = createAsyncThunk<TUser | string[], object>(
	'user/login',
	async (userData, { rejectWithValue, fulfillWithValue }) => {
		const result = await loginUser(userData);
		if (Array.isArray(result)) {
			return rejectWithValue(result);
		}
		return fulfillWithValue(result);
	}
);

export const Logout = createAsyncThunk<void>('user/logout', async () => {
	return await logoutUser();
});

export const GetUser = createAsyncThunk<TUser>('user/get', async () => {
	return await getUser();
});
