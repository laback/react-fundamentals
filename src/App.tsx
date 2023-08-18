import React from 'react';
import { Header } from './components/Header/Header';
import './App.css';

import { Container } from './components/Container/Container';

import {
	mockedCoursesList,
	mockedAuthorsList,
	loggedInUsers,
} from './constants';

export const DataContext = React.createContext(null);
export const LoggedInContext = React.createContext(null);

function App() {
	console.log(loggedInUsers);
	return (
		<DataContext.Provider
			value={{ courses: mockedCoursesList, authors: mockedAuthorsList }}
		>
			<LoggedInContext.Provider value={{ loggedInUsers: loggedInUsers }}>
				<Header />
				<Container />
			</LoggedInContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
