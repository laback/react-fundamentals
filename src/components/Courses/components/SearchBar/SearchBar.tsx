import React from 'react';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';

const handleSearch = () => {
	alert('You are trying to search');
};

const input = {
	type: 'text',
	placeholder: 'Input text',
	inputClass: 'search-bar-input',
};
const button = {
	buttonText: 'search',
	onClick: handleSearch,
	buttonClass: 'search-bar-button',
};

const SearchBar = () => {
	return (
		<div className='search-bar'>
			<Input input={input} />
			<Button button={button} />
		</div>
	);
};

export { SearchBar };
