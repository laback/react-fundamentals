import React from 'react';

const Button = ({ onClick, className, text }) => {
	return (
		<button onClick={onClick} className={`default-button ${className}`}>
			{text}
		</button>
	);
};

export { Button };
