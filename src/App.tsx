import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import './App.css';
import { DataContextType, LoggedInUserContextType } from 'shared.types';

import { Container } from './components/Container/Container';

import { mockedCoursesList, mockedAuthorsList } from './constants';

export const DataContext = React.createContext<DataContextType>(null);
export const LoggedInContext =
	React.createContext<LoggedInUserContextType>(null);

function App() {
	const [loggedInUser, setLoggedInUser] = useState(
		JSON.parse(localStorage.getItem('user'))
	);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	return (
		<DataContext.Provider value={{ courses, setCourses, authors, setAuthors }}>
			<LoggedInContext.Provider value={{ loggedInUser, setLoggedInUser }}>
				<Header />
				<Container />
			</LoggedInContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
