import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthors } from '../services';
import { TAuthor } from 'src/shared.types';

export const GetAuthors = createAsyncThunk<TAuthor[]>(
	'authors/get',
	async () => {
		return await getAuthors();
	}
);

export const CreateAuthor = createAction<TAuthor>('authors/create');
