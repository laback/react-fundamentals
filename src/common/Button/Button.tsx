import React from 'react';

const Button = ({ onClick, className, text, type }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`default-button ${className}`}
		>
			{text}
		</button>
	);
};

export { Button };
