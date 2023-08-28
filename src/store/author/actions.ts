import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAuthor, getAuthors } from '../services';
import { TAuthor } from 'src/shared.types';

export const GetAuthors = createAsyncThunk<TAuthor[]>(
	'authors/get',
	async () => {
		return await getAuthors();
	}
);

export const CreateAuthor = createAsyncThunk<TAuthor, TAuthor>(
	'authors/create',
	async (author) => {
		return await createAuthor(author);
	}
);
