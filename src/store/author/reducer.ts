import { Author } from 'src/shared.types';
import { createReducer, createSlice } from '@reduxjs/toolkit';
import { CreateAuthor, GetAuthors } from './actions';

const initAuthorsState = {
	value: [],
	isLoadingStarted: false,
} as { value: Author[]; isLoadingStarted: boolean };

// const authorsReducer = createReducer(initAuthorsState, (builder) => {
// 	builder.addCase(CreateAuthor, (state, action) => {
// 		state.value = [...state.value, action.payload];
// 	});
// });

const asyncAuthorsReducer = createSlice({
	name: 'authors',
	initialState: initAuthorsState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(GetAuthors.pending, (state: typeof initAuthorsState) => {
				state.isLoadingStarted = true;
			})
			.addCase(
				GetAuthors.fulfilled,
				(state: typeof initAuthorsState, action) => {
					state.value = action.payload;
				}
			)
			.addCase(CreateAuthor, (state, action) => {
				state.value = [...state.value, action.payload];
			});
	},
}).reducer;

export { asyncAuthorsReducer };
