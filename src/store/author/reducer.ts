import { TAuthor } from 'src/shared.types';
import { createReducer } from '@reduxjs/toolkit';
import { CreateAuthor, GetAuthors } from './actions';

const initAuthorsState = {
	value: [],
	isLoaded: false,
} as { value: TAuthor[]; isLoaded: boolean };

const authorsReducer = createReducer(initAuthorsState, (builder) => {
	builder
		.addCase(GetAuthors.fulfilled, (state: typeof initAuthorsState, action) => {
			state.isLoaded = true;
			state.value = action.payload;
		})
		.addCase(CreateAuthor.fulfilled, (state, action) => {
			state.value = [...state.value, action.payload];
		});
});

export { authorsReducer };
