import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Courses from 'src/components/Courses/Courses';
import { CourseForm } from '../components/CourseForm/CourseForm';
import { mockedState, renderComponent } from 'src/test-utils';

describe('Course', () => {
	test('courses display course card for each course in array', () => {
		renderComponent([{ element: <Courses />, path: '/' }]);
		expect(screen.queryAllByTestId('course-card').length).toEqual(
			mockedState.courses.value.length
		);
	});

	test('show course form on button click', () => {
		const elements = [
			{ element: <Courses />, path: '/' },
			{ element: <CourseForm />, path: '/courses/add' },
		];
		renderComponent(elements);
		fireEvent.click(screen.queryByText('add new course'));
		expect(screen.queryByText('Course Edit/Create Page')).toBeInTheDocument();
	});
});
