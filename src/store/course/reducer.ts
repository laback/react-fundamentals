import { TCourse } from 'src/shared.types';
import { createSlice } from '@reduxjs/toolkit';
import { CreateCourse, DeleteCourse, GetCourses } from './actions';

const initCoursesState = {
	value: [],
	isLoaded: false,
	isLoading: false,
} as { value: TCourse[]; isLoaded: boolean; isLoading: boolean };

const asyncCoursesReducer = createSlice({
	name: 'courses',
	initialState: initCoursesState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(GetCourses.pending, (state: typeof initCoursesState) => {
				state.isLoading = true;
			})
			.addCase(
				GetCourses.fulfilled,
				(state: typeof initCoursesState, action) => {
					state.isLoaded = true;
					state.isLoading = false;
					state.value = action.payload;
				}
			)
			.addCase(CreateCourse, (state, action) => {
				state.value = [...state.value, action.payload];
			})
			.addCase(DeleteCourse, (state, action) => {
				state.value = state.value.filter(
					(course) => course.id != action.payload
				);
			});
	},
}).reducer;

export { asyncCoursesReducer };
