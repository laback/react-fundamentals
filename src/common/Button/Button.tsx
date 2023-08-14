import React from 'react';

const Button = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={`default-button ${props.button.buttonClass}`}
		>
			{props.button.buttonText}
		</button>
	);
};

export { Button };
