import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCourse } from 'src/shared.types.js';
import {
	createCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../services';

export const GetCourses = createAsyncThunk<TCourse[]>(
	'courses/get',
	async () => {
		return await getCourses();
	}
);

export const CreateCourse = createAsyncThunk<
	TCourse,
	{ course: TCourse; token: string }
>('courses/create', async (input) => {
	return await createCourse(input);
});

export const UpdateCourse = createAsyncThunk<
	TCourse,
	{ course: TCourse; token: string }
>('courses/update', async (input) => {
	return await updateCourse(input);
});

export const DeleteCourse = createAsyncThunk<
	string,
	{ courseId: string; token: string }
>('courses/delete', async (input) => {
	return await deleteCourse(input);
});
