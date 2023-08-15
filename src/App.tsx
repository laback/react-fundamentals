import React from 'react';
import { Header } from './components/Header/Header';
import './App.css';
import { Container } from './components/Container/Container';
import { mockedAuthorsList, mockedCoursesList } from './constants';

function App() {
	return (
		<>
			<Header />
			<Container courses={mockedCoursesList} authors={mockedAuthorsList} />
		</>
	);
}

export default App;
