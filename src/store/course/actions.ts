import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TCourse } from 'src/shared.types.js';
import { getCourses } from '../services';

export const GetCourses = createAsyncThunk<TCourse[]>(
	'courses/get',
	async () => {
		return await getCourses();
	}
);

export const CreateCourse = createAction<TCourse>('courses/create');

export const DeleteCourse = createAction<string>('courses/delete');
