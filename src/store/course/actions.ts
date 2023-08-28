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

export const CreateCourse = createAsyncThunk<TCourse, TCourse>(
	'courses/create',
	async (course) => {
		return await createCourse(course);
	}
);

export const UpdateCourse = createAsyncThunk<TCourse, TCourse>(
	'courses/update',
	async (course) => {
		return await updateCourse(course);
	}
);

export const DeleteCourse = createAsyncThunk<string, string>(
	'courses/delete',
	async (courseId) => {
		return await deleteCourse(courseId);
	}
);
