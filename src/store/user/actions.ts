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

export const Logout = createAsyncThunk<void, string>(
	'user/logout',
	async (token: string) => {
		return await logoutUser(token);
	}
);

export const GetUser = createAsyncThunk<TUser, string>(
	'user/get',
	async (token) => {
		return await getUser(token);
	}
);
