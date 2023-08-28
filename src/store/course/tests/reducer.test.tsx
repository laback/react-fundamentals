import { configureStore } from '@reduxjs/toolkit';
import { CreateCourse } from '../actions';
import { coursesReducer, initCoursesState } from '../reducer';
import { TCourse } from 'src/shared.types';
import { rootReducer } from 'src/store/rootReducer';
import { createCourse } from 'src/store/services';
import fetchMock from 'fetch-mock';

const store = configureStore({ reducer: coursesReducer });

const request: TCourse = {
	title: 'title',
	description: 'description',
	authors: ['1', '2'],
	duration: 120,
};
const response: TCourse = { ...request, id: '3' };

describe('CourseReducer', () => {
	test('reducer should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual(
			initCoursesState
		);
	});

	test('reducer should handle CreateCourse and returns new state', async () => {
		const newState = coursesReducer(initCoursesState, {
			type: CreateCourse.fulfilled,
			payload: response,
		});
		expect(newState.value).toEqual([response, []]);
	});
});
