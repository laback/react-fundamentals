import React from 'react';

const Input = (props) => {
	const input = props.input;
	return (
		<input
			type={input.type}
			placeholder={input.placeholder}
			className={input.inputClass}
		/>
	);
};

export { Input };
