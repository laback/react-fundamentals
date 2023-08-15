import React from 'react';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';

const type = 'text';
const placeholder = 'Input text';
const inputClass = 'search-bar-input';

const buttonText = 'search';
const buttonClass = 'search-bar-button';

const SearchBar = () => {
	return (
		<div className='search-bar'>
			<Input placeholder={placeholder} type={type} className={inputClass} />
			<Button className={buttonClass} text={buttonText} />
		</div>
	);
};

export { SearchBar };
