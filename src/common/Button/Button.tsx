import React from 'react';

const Button = ({ onClick, className, text, type, form }) => {
	return (
		<button
			form={form}
			type={type}
			onClick={onClick}
			className={`default-button ${className}`}
		>
			{text}
		</button>
	);
};

export { Button };
