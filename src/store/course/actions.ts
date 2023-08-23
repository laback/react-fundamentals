import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from 'src/shared.types.js';
import { getCourses } from '../services';

export const GetCourses = createAsyncThunk('courses/get', async () => {
	return await getCourses();
});

export const CreateCourse = createAction<Course>('courses/create');

export const DeleteCourse = createAction<string>('courses/delete');
