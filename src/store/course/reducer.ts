import { Course } from 'src/shared.types';
import { createSlice } from '@reduxjs/toolkit';
import { CreateCourse, DeleteCourse, GetCourses } from './actions';

const initCoursesState = {
	value: [],
	isLoadingStarted: false,
} as { value: Course[]; isLoadingStarted: boolean };

const asyncCoursesReducer = createSlice({
	name: 'courses',
	initialState: initCoursesState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(GetCourses.pending, (state: typeof initCoursesState) => {
				state.isLoadingStarted = true;
			})
			.addCase(
				GetCourses.fulfilled,
				(state: typeof initCoursesState, action) => {
					state.isLoadingStarted = true;
					state.value = action.payload;
				}
			)
			.addCase(CreateCourse, (state, action) => {
				state.value = [...state.value, action.payload];
			})
			.addCase(DeleteCourse, (state, action) => {
				console.log(state.value, action.payload);
				const courseToDelete = state.value.find((course) => {
					course.id === action.payload;
				});
				const copiedState = [...state.value];
				state.value = copiedState.slice(copiedState.indexOf(courseToDelete));
			});
	},
}).reducer;

export { asyncCoursesReducer };
