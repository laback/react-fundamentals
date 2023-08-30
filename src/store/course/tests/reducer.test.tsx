import { formatCreationDate } from 'src/helper';
import { CreateCourse } from '../actions';
import { coursesReducer, initCoursesState } from '../reducer';
import { TCourse } from 'src/shared.types';

const request: TCourse = {
	title: 'title',
	description: 'description',
	authors: ['1', '2'],
	duration: 120,
	creationDate: '28/08/2023',
};
const response: TCourse = {
	...request,
	creationDate: formatCreationDate(request.creationDate),
};

describe('CourseReducer', () => {
	test('reducer should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual(
			initCoursesState
		);
	});

	test('reducer should handle CreateCourse and returns new state', async () => {
		const newState = coursesReducer(initCoursesState, {
			type: CreateCourse.fulfilled,
			payload: request,
		});
		expect(newState.value).toEqual([response]);
	});
});
