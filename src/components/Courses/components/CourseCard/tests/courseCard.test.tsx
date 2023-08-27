import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TAuthor, TCourse, TUser } from 'src/shared.types';
import { CourseCard } from '../CourseCard';
import { toHoursAndMinutes } from 'src/helper';
import dayjs from 'dayjs';
import { useCourseById } from 'src/hooks';

const mockedState = {
	user: { value: { token: 'token' } } as { value: TUser; isLoaded: boolean },
	courses: {
		value: [
			{
				id: '1',
				title: 'title',
				description: 'description',
				duration: 120,
				authors: ['1', '3'],
				creationDate: '10/09/2023',
			},
		],
		isLoaded: true,
	} as { value: TCourse[]; isLoaded: boolean },
	authors: {
		value: [
			{ id: '1', name: 'a1' },
			{ id: '2', name: 'a2' },
			{ id: '3', name: 'a3' },
		],
		isLoaded: true,
	} as { value: TAuthor[]; isLoaded: boolean },
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'testPath',
	}),
	useNavigate: () => mockedUsedNavigate,
}));

describe('CourseCard', () => {
	test('render course card', () => {
		render(
			<Provider store={mockedStore}>
				<CourseCard courseId={'1'} />
			</Provider>
		);
		const course = useCourseById(
			'1',
			mockedState.courses.value,
			mockedState.authors.value
		);
		expect(screen.queryByText(course.title)).toBeInTheDocument();
		expect(screen.queryByText(course.description)).toBeInTheDocument();
		expect(
			screen.queryByText(toHoursAndMinutes(course.duration))
		).toBeInTheDocument();
		expect(
			screen.queryByText(
				dayjs(new Date(course.creationDate)).format('MM.DD.YYYY')
			)
		).toBeInTheDocument();
		expect(screen.queryByText(course.authors.join(', '))).toBeInTheDocument();
	});
});
