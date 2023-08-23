import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthors } from '../services';
import { Author } from 'src/shared.types';

export const GetAuthors = createAsyncThunk('authors/get', async () => {
	return await getAuthors();
});

export const CreateAuthor = createAction<Author>('authors/create');
