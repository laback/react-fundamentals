import { TAuthor } from 'src/shared.types';
import { createSlice } from '@reduxjs/toolkit';
import { CreateAuthor, GetAuthors } from './actions';

const initAuthorsState = {
	value: [],
	isLoaded: false,
	isLoading: false,
} as { value: TAuthor[]; isLoaded: boolean; isLoading: boolean };

const asyncAuthorsReducer = createSlice({
	name: 'authors',
	initialState: initAuthorsState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(GetAuthors.pending, (state: typeof initAuthorsState) => {
				state.isLoading = true;
			})
			.addCase(
				GetAuthors.fulfilled,
				(state: typeof initAuthorsState, action) => {
					state.isLoaded = true;
					state.isLoading = false;
					state.value = action.payload;
				}
			)
			.addCase(CreateAuthor, (state, action) => {
				state.value = [...state.value, action.payload];
			});
	},
}).reducer;

export { asyncAuthorsReducer };
