import React from 'react';
import { screen, render } from '@testing-library/react';
import { Header } from '../Header';
import { Provider } from 'react-redux';

import { TAuthor, TCourse, TUser } from 'src/shared.types';

const mockedState = {
	user: {
		value: {
			isAuth: true,
			name: 'Mocked name',
		},
		isLoaded: true,
	} as { value: TUser; isLoaded: boolean },
	courses: {
		value: [],
		isLoaded: true,
	} as { value: TCourse[]; isLoaded: boolean },
	authors: {
		value: [],
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

describe('Header', () => {
	test('render header with logo and user name', () => {
		render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		expect(screen.queryByText(mockedState.user.value.name)).toBeInTheDocument();
		expect(document.querySelector('img')).toBeInTheDocument();
	});
});
