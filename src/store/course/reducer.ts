import { TCourse } from 'src/shared.types';
import { createReducer } from '@reduxjs/toolkit';
import {
	CreateCourse,
	DeleteCourse,
	GetCourses,
	UpdateCourse,
} from './actions';
import { formatCreationDate } from 'src/helper';

const initCoursesState = {
	value: [],
	isLoaded: false,
} as { value: TCourse[]; isLoaded: boolean };

const coursesReducer = createReducer(initCoursesState, (builder) => {
	builder
		.addCase(GetCourses.fulfilled, (state: typeof initCoursesState, action) => {
			state.isLoaded = true;
			state.value = action.payload.map((course) => {
				return {
					...course,
					creationDate: formatCreationDate(course.creationDate),
				};
			});
		})
		.addCase(CreateCourse.fulfilled, (state, action) => {
			state.value = [
				...state.value,
				{
					...action.payload,
					creationDate: formatCreationDate(action.payload.creationDate),
				},
			];
		})
		.addCase(UpdateCourse.fulfilled, (state, payload) => {
			const copiedState = [...state.value];
			const updateIndex = copiedState.indexOf(
				copiedState.find((course) => course.id === payload.payload.id)
			);
			copiedState[updateIndex] = payload.payload;
			state.value = copiedState;
		})
		.addCase(DeleteCourse.fulfilled, (state, action) => {
			state.value = state.value.filter((course) => course.id != action.payload);
		});
});

export { coursesReducer };
