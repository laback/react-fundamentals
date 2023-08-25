import React from 'react';
import { Header } from './components/Header/Header';
import './App.css';
import { Provider } from 'react-redux';

import { Container } from './components/Container/Container';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<Container />
		</Provider>
	);
}

export default App;
