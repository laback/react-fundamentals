import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TAuthor, TCourse, TUser } from 'src/shared.types';
import Courses from 'src/components/Courses/Courses';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CourseForm } from '../components/CourseForm/CourseForm';

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
			{
				id: '2',
				title: 'title',
				description: 'description',
				duration: 120,
				authors: ['1', '3'],
				creationDate: '10/09/2023',
			},
			{
				id: '3',
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

describe('Course', () => {
	test('courses display course card for each course in array', () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<Provider store={mockedStore}>
								<Courses />
							</Provider>
						}
					/>
				</Routes>
			</BrowserRouter>
		);
		expect(screen.queryAllByTestId('course-card').length).toEqual(
			mockedState.courses.value.length
		);
	});

	test('show course form on button click', () => {
		const providerElement = (child) => {
			return <Provider store={mockedStore}>{child}</Provider>;
		};
		render(
			<BrowserRouter>
				<Routes>
					<Route path='/' element={providerElement(<Courses />)} />
					<Route
						path='/courses/add'
						element={providerElement(<CourseForm />)}
					/>
				</Routes>
			</BrowserRouter>
		);
		fireEvent.click(screen.queryByText('add new course'));
		expect(document.getElementsByClassName('edit-create-course')).toBeTruthy();
	});
});
