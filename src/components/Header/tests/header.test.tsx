import React from 'react';
import { screen } from '@testing-library/react';
import { Header } from '../Header';

import { mockedState, renderComponent } from 'src/test-utils';

describe('Header', () => {
	test('render header with logo and user name', () => {
		renderComponent([{ element: <Header />, path: '/' }]);
		expect(screen.queryByText(mockedState.user.value.name)).toBeInTheDocument();
		expect(screen.queryByAltText('logo')).toBeInTheDocument();
	});
});
