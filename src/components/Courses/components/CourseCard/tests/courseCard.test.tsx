import React from 'react';
import { screen } from '@testing-library/react';
import { TCourse } from 'src/shared.types';
import { CourseCard } from '../CourseCard';
import { toHoursAndMinutes } from 'src/helper';
import dayjs from 'dayjs';
import { mockedState, renderComponent } from 'src/test-utils';

const resultCourse: TCourse = {
	...mockedState.courses.value[0],
	authors: ['a1', 'a3'],
};

describe('CourseCard', () => {
	test('render course card', () => {
		renderComponent([{ element: <CourseCard courseId='1' />, path: '/' }]);
		expect(screen.queryByText(resultCourse.title)).toBeInTheDocument();
		expect(screen.queryByText(resultCourse.description)).toBeInTheDocument();
		expect(
			screen.queryByText(toHoursAndMinutes(resultCourse.duration))
		).toBeInTheDocument();
		expect(
			screen.queryByText(
				dayjs(new Date(resultCourse.creationDate)).format('MM.DD.YYYY')
			)
		).toBeInTheDocument();
		expect(
			screen.queryByText(resultCourse.authors.join(', '))
		).toBeInTheDocument();
	});
});
