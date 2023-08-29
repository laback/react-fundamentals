import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { TAuthor, TCourse, TUser } from './shared.types';

export const mockedState = {
	user: {
		value: {
			isAuth: true,
			name: 'Mocked name',
			token: 'token',
		},
		isLoaded: true,
	} as { value: TUser; isLoaded: boolean },
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

export const renderComponent = (elements: { element; path }[]) => {
	const routes = elements.map((element, index) => (
		<Route path={element.path} element={element.element} key={index} />
	));
	const elementToRender = (
		<Provider store={mockedStore as any}>
			<MemoryRouter>
				<Routes>{routes}</Routes>
			</MemoryRouter>
		</Provider>
	);
	return render(elementToRender);
};
